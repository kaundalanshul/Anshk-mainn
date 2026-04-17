import { v2 as cloudinary } from "cloudinary";
import adminProfileModel from "../models/adminProfileModel.js";
import fs from "fs";
import path from "path";

// Upload Admin Profile Photo
const uploadAdminProfilePhoto = async (req, res) => {
    try {
        const { email, name } = req.body;

        if (!email) {
            return res.json({ success: false, message: "Email is required" });
        }

        if (!req.file) {
            return res.json({ success: false, message: "No file uploaded" });
        }

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "image",
            folder: "Anshul_Kaundal_Admin_Profiles",
        });

        // Delete local file
        if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        // Update or create admin profile
        let adminProfile = await adminProfileModel.findOne({ email });

        if (adminProfile) {
            // Delete old photo from Cloudinary if exists
            if (adminProfile.profilePhoto) {
                const publicId = adminProfile.profilePhoto.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`Anshul_Kaundal_Admin_Profiles/${publicId}`);
            }
            adminProfile.profilePhoto = result.secure_url;
            adminProfile.updatedAt = new Date();
        } else {
            adminProfile = new adminProfileModel({
                email,
                name: name || "Admin",
                profilePhoto: result.secure_url,
            });
        }

        await adminProfile.save();

        res.json({
            success: true,
            message: "Profile photo uploaded successfully",
            profilePhoto: result.secure_url,
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Get Admin Profile
const getAdminProfile = async (req, res) => {
    try {
        const { email } = req.params;

        const adminProfile = await adminProfileModel.findOne({ email });

        if (!adminProfile) {
            return res.json({
                success: true,
                data: { email, name: "Admin", profilePhoto: null },
            });
        }

        res.json({ success: true, data: adminProfile });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Update Admin Profile
const updateAdminProfile = async (req, res) => {
    try {
        const { email, name } = req.body;

        if (!email) {
            return res.json({ success: false, message: "Email is required" });
        }

        let adminProfile = await adminProfileModel.findOne({ email });

        if (!adminProfile) {
            adminProfile = new adminProfileModel({ email, name: name || "Admin" });
        } else {
            if (name) adminProfile.name = name;
        }

        adminProfile.updatedAt = new Date();
        await adminProfile.save();

        res.json({ success: true, data: adminProfile });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { uploadAdminProfilePhoto, getAdminProfile, updateAdminProfile };
