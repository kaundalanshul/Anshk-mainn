import express from 'express';
import upload from '../middleware/multer.js';
import { uploadAdminProfilePhoto, getAdminProfile, updateAdminProfile } from '../controllers/adminController.js';

const adminRouter = express.Router();

// Upload profile photo
adminRouter.post('/upload-photo', upload.single('profilePhoto'), uploadAdminProfilePhoto);

// Get admin profile
adminRouter.get('/profile/:email', getAdminProfile);

// Update admin profile
adminRouter.put('/profile/update', updateAdminProfile);

export default adminRouter;
