import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Navbar = ({setToken, adminEmail}) => {
  const [profilePhoto, setProfilePhoto] = useState(null)
  const [showUploadMenu, setShowUploadMenu] = useState(false)
  const [loading, setLoading] = useState(false)
  const fileInputRef = React.useRef(null)

  // Fetch admin profile photo on mount
  useEffect(() => {
    if (adminEmail) {
      fetchAdminProfile()
    }
  }, [adminEmail])

  const fetchAdminProfile = async () => {
    try {
      const response = await axios.get(backendUrl + `/api/admin/profile/${adminEmail}`)
      if (response.data.success) {
        setProfilePhoto(response.data.data.profilePhoto)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handlePhotoUpload = async (e) => {
    try {
      const file = e.target.files[0]
      if (!file) return

      setLoading(true)
      const formData = new FormData()
      formData.append('profilePhoto', file)
      formData.append('email', adminEmail)
      formData.append('name', 'Admin')

      const response = await axios.post(
        backendUrl + '/api/admin/upload-photo',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )

      if (response.data.success) {
        setProfilePhoto(response.data.profilePhoto)
        setShowUploadMenu(false)
        toast.success('Profile photo updated successfully')
      } else {
        toast.error(response.data.message || 'Upload failed')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message || 'Upload failed')
    } finally {
      setLoading(false)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <div className='flex items-center gap-4'>
        {/* Profile Photo with Upload Option */}
        <div className='relative'>
          <div 
            className='w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-400 transition'
            onClick={() => setShowUploadMenu(!showUploadMenu)}
          >
            {profilePhoto ? (
              <img 
                src={profilePhoto} 
                alt="Profile" 
                className='w-full h-full rounded-full object-cover'
              />
            ) : (
              <span className='text-white text-xl font-bold'>A</span>
            )}
          </div>

          {/* Upload Menu */}
          {showUploadMenu && (
            <div className='absolute top-14 right-0 bg-white border border-gray-300 rounded shadow-lg p-2 z-10'>
              <button
                onClick={triggerFileInput}
                disabled={loading}
                className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded'
              >
                {loading ? 'Uploading...' : 'Change Photo'}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                hidden
              />
            </div>
          )}
        </div>

        <div>
          <p className='text-sm font-medium text-gray-700'>Admin</p>
          <p className='text-xs text-gray-500'>{adminEmail}</p>
        </div>
      </div>

      <button 
        onClick={()=>setToken('')} 
        className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-gray-700 transition'
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar