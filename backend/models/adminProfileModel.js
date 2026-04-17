import mongoose from "mongoose";

const adminProfileSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    name: { type: String, default: "Admin" },
    profilePhoto: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const adminProfileModel = mongoose.models.adminProfile || mongoose.model('adminProfile', adminProfileSchema);

export default adminProfileModel;
