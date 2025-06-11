import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: true }, // ✅ was "Image"
    role: { type: String, enum: ["user", "hotelOwner"], default: "user" },
    recentSearchCities: [{ type: String, required: false }] // ✅ optional
}, { timestamps: true }); // ✅ plural

const User = mongoose.model("User", userSchema);
export default User;
