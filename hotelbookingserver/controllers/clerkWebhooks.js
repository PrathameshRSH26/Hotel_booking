import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const event = wh.verify(req.body, headers);
    const { data, type } = event;

    const userData = {
      _id: data.id,
      username: `${data.first_name} ${data.last_name}`,
      email: data.email_addresses[0]?.email_address || "",
      image: data.image_url
    };

    if (type === "user.created") {
      await User.create(userData);
    } else if (type === "user.updated") {
      await User.findByIdAndUpdate(data.id, userData);
    } else if (type === "user.deleted") {
      await User.findByIdAndDelete(data.id);
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

export default clerkWebhooks;
