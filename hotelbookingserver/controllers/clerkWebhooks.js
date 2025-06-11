import User from '../models/User.js';
import { Webhook } from 'svix';

const clerkWebhooks = async (req, res, next) => {
  try {
    // Verify webhook signature
    const payload = req.body;
    const headers = {
      'svix-id': req.headers['svix-id'],
      'svix-timestamp': req.headers['svix-timestamp'],
      'svix-signature': req.headers['svix-signature']
    };

    if (!headers['svix-id'] || !headers['svix-signature']) {
      return res.status(400).json({ 
        error: 'Missing required webhook headers' 
      });
    }

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const event = wh.verify(JSON.stringify(payload), headers);

    const { data, type } = event;
    
    // Prepare user data
    const userData = {
      _id: data.id,
      email: data.email_addresses?.find(e => e.id === data.primary_email_address_id)?.email_address,
      username: data.username || `${data.first_name || ''} ${data.last_name || ''}`.trim(),
      image: data.image_url || data.profile_image_url || '',
      role: data.public_metadata?.role || 'user'
    };

    // Process event type
    switch (type) {
      case 'user.created':
        await User.create(userData);
        break;
      case 'user.updated':
        await User.findByIdAndUpdate(data.id, userData, { 
          upsert: true,
          new: true 
        });
        break;
      case 'user.deleted':
        await User.findByIdAndDelete(data.id);
        break;
      default:
        console.log(`Received unhandled event type: ${type}`);
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Webhook processing error:', error);
    next(error);
  }
};

export default clerkWebhooks;