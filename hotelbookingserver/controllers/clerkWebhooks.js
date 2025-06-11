import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res, next) => {
  try {
    if (!req.headers['svix-id'] || !req.headers['svix-signature']) {
      console.warn('⚠️ Missing Svix headers');
      return res.status(400).json({ error: 'Missing webhook headers' });
    }

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const payload = JSON.stringify(req.body);
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"]
    };

    const event = wh.verify(payload, headers);
    const { data, type } = event;

    const userData = {
      _id: data.id,
      email: data.email_addresses?.find(e => e.id === data.primary_email_address_id)?.email_address,
      username: data.username || `${data.first_name || ''} ${data.last_name || ''}`.trim(),
      image: data.image_url || data.profile_image_url
    };

    switch (type) {
      case "user.created":
        await User.create(userData);
        break;
      case "user.updated":
        await User.findByIdAndUpdate(data.id, userData, { upsert: true, new: true });
        break;
      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        break;
      default:
        console.log(`🔔 Unhandled event type: ${type}`);
    }

    res.status(200).json({ success: true });

  } catch (error) {
    console.error('⚠️ Webhook processing failed:', error);
    next(error);
  }
};

export default clerkWebhooks;