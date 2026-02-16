import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Phone } from 'lucide-react';

export const AdmissionPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [studentPhoto, setStudentPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    childName: '',
    dateOfBirth: '',
    sex: '',
    bloodGroup: '',
    contactNumber: '',
    contactType: '',
    fatherName: '',
    fatherNationality: '',
    fatherOccupation: '',
    fatherOfficeAddress: '',
    fatherDistance: '',
    fatherPermanentAddress: '',
    fatherIncome: '',
    motherName: '',
    motherNationality: '',
    motherOccupation: '',
    motherOfficeAddress: '',
    motherDistance: '',
    motherPermanentAddress: '',
    motherIncome: '',
    guardianName: '',
    guardianNationality: '',
    guardianOccupation: '',
    guardianOfficeAddress: '',
    guardianDistance: '',
    guardianPermanentAddress: '',
    guardianIncome: '',
    classAdmission: '',
    tcAttached: '',
    howKnow: ''
  });

  useEffect(() => {
    // Show popup after a short delay when component mounts
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Listen for global event to open the admission popup (e.g., from Hero 'Enroll Now' button)
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setShowForm(true);
    };

    window.addEventListener('openAdmission', handleOpen);
    return () => window.removeEventListener('openAdmission', handleOpen);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setShowForm(false);
    setShowThankYou(false);
  };

  const handleEnrollClick = () => {
    setShowForm(true);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Photo size must be less than 5MB');
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }
      
      setStudentPhoto(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value.toUpperCase()
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      
      // Add all form fields
      Object.keys(formData).forEach(key => {
        if (formData[key]) { // Only append if value exists
          formDataToSend.append(key, formData[key]);
        }
      });
      
      // Add photo file if available
      if (studentPhoto) {
        formDataToSend.append('photo', studentPhoto);
      }
      
      // Direct API URL - Update this with your backend server address
      const response = await fetch('http://localhost:5000/api/admission', {
        method: 'POST',
        body: formDataToSend,
      });
      
      let data = null;
      try {
        data = await response.json();
      } catch (parseError) {
        console.warn('Non-JSON response from /api/admission:', parseError);
      }

      if (response.ok) {
        console.log('Admission application sent successfully with photo and PDF!');
        setShowThankYou(true);
      } else {
        const message = data && data.error
          ? data.error
          : `Failed to submit form (status ${response.status}). Please try again.`;
        alert(message);
      }
    } catch (error) {
      console.error('Failed to send admission application:', error);
      alert('Failed to submit form. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearForm = () => {
    setFormData({
      childName: '',
      dateOfBirth: '',
      sex: '',
      bloodGroup: '',
      contactNumber: '',
      contactType: '',
      fatherName: '',
      fatherNationality: '',
      fatherOccupation: '',
      fatherOfficeAddress: '',
      fatherDistance: '',
      fatherPermanentAddress: '',
      fatherIncome: '',
      motherName: '',
      motherNationality: '',
      motherOccupation: '',
      motherOfficeAddress: '',
      motherDistance: '',
      motherPermanentAddress: '',
      motherIncome: '',
      guardianName: '',
      guardianNationality: '',
      guardianOccupation: '',
      guardianOfficeAddress: '',
      guardianDistance: '',
      guardianPermanentAddress: '',
      guardianIncome: '',
      classAdmission: '',
      tcAttached: '',
      howKnow: ''
    });
    setStudentPhoto(null);
    setPhotoPreview(null);
    setShowThankYou(false);
    setShowForm(false);
  };

  return (
    <AnimatePresence>
      {isOpen && !showForm && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            onClick={handleClose}
          />

          {/* Original Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-2 sm:p-4"
            onClick={(e) => e.target === e.currentTarget && handleClose()}
          >
            <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden max-h-[90vh] sm:max-h-[95vh] overflow-y-auto">
              {/* Admission Open Badge - Top Left */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="absolute top-2 left-2 sm:top-6 sm:left-6 z-10"
              >
                <span className="inline-flex items-center gap-1.5 sm:gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 sm:px-8 sm:py-4 rounded-full font-bold text-xs sm:text-xl md:text-2xl shadow-2xl">
                  🎓 ADMISSION OPEN
                </span>
              </motion.div>

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-[20] p-2 sm:p-2.5 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors duration-300 shadow-lg"
              >
                <X size={20} className="sm:w-6 sm:h-6" />
              </button>

              {/* Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Left Side - Image/Illustration */}
                <div className="bg-gradient-to-br from-blue-400 via-blue-300 to-cyan-300 p-4 sm:p-8 md:p-12 flex items-center justify-center relative overflow-hidden min-h-[220px] sm:min-h-[300px] md:min-h-[600px] pt-16 sm:pt-8">
                  <div className="relative z-10 text-center w-full h-full flex items-center justify-center">
                    {/* Happy Student Illustration */}
                    <motion.div
                      initial={{ scale: 0.8, y: 20, opacity: 0 }}
                      animate={{ 
                        scale: 1, 
                        y: 0, 
                        opacity: 1 
                      }}
                      transition={{ delay: 0.3, type: 'spring' }}
                      className="relative mt-4 sm:mt-0"
                    >
                      <motion.div 
                        className="relative inline-block"
                        animate={{ 
                          y: [0, -20, 0],
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 3,
                          ease: "easeInOut"
                        }}
                      >
                        {/* Colorful Happy Student Character */}
                        <div className="relative">
                          <div className="w-28 h-28 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-yellow-300 via-orange-300 to-pink-300 flex items-center justify-center shadow-2xl">
                            <div className="text-5xl sm:text-8xl md:text-9xl lg:text-[10rem]">🧑‍🎓</div>
                          </div>
                        </div>
                        {/* Quote below icon */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          className="mt-3 sm:mt-6"
                        >
                          <p className="text-white text-xs sm:text-base md:text-lg font-semibold text-center italic drop-shadow-lg px-2 sm:px-4">
                            "Education is the passport to the future"
                          </p>
                        </motion.div>
                      </motion.div>
                    </motion.div>

                    {/* Decorative elements - simplified */}
                    <motion.div
                      animate={{ 
                        rotate: [0, 360]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 3,
                        ease: "linear"
                      }}
                      className="absolute top-6 sm:top-10 right-6 sm:right-10 text-4xl sm:text-6xl"
                    >
                      ⭐
                    </motion.div>
                    <motion.div
                      animate={{ 
                        rotate: [0, 360]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 4,
                        ease: "linear"
                      }}
                      className="absolute bottom-10 sm:bottom-16 right-8 sm:right-12 text-3xl sm:text-5xl"
                    >
                      ⚽
                    </motion.div>
                  </div>
                </div>

                {/* Right Side - Content */}
                <div className="p-4 sm:p-6 md:p-10 flex flex-col justify-center bg-white">
                  {/* Logo */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, type: 'spring' }}
                    className="mb-2 sm:mb-3 mt-10 sm:mt-0"
                  >
                    <img 
                      src="/images/Logo.png" 
                      alt="Minervaa School Logo" 
                      className="h-10 sm:h-14 md:h-16 w-auto object-contain"
                    />
                  </motion.div>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-700 text-xs sm:text-base md:text-lg mb-3 sm:mb-4 font-medium leading-snug"
                  >
                    An International Standard Education for Your Child's Bright Future
                  </motion.p>

                  {/* Enroll Now - Clickable Button */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mb-3 sm:mb-4"
                  >
                    <button
                      onClick={handleEnrollClick}
                      className="block w-full"
                    >
                      <div className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 rounded-xl md:rounded-2xl p-2.5 sm:p-3 md:p-4 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                        <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white text-center tracking-wider drop-shadow-lg">
                          ENROLL NOW
                        </h3>
                      </div>
                    </button>
                  </motion.div>

                  {/* Contact Info */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl p-3 md:p-4 shadow-lg"
                  >
                    <div className="flex flex-col gap-1.5 md:gap-2 text-white text-xs sm:text-sm md:text-base">
                      <div className="flex items-start gap-2">
                        <MapPin size={16} className="flex-shrink-0 mt-1 sm:w-[18px] sm:h-[18px]" />
                        <span className="font-medium">A21, A22 D Colony, Pollachi, Tamil Nadu</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={16} className="flex-shrink-0 sm:w-[18px] sm:h-[18px]" />
                        <span className="font-medium">+91 98948 86733 / +91 99949 59484</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}

      {/* Admission Form Modal */}
      {showForm && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl z-10">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
                <div className="flex flex-col items-center">
                  <h2 className="text-3xl font-bold text-center mb-2">Minervaa Vidhya Mandhir School</h2>
                  <p className="text-xl text-center text-blue-100">Admission Enquiry</p>
                </div>
              </div>

              {/* Thank You Message */}
              {showThankYou ? (
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-6xl mb-4"
                  >
                    ✅
                  </motion.div>
                  <h3 className="text-2xl font-bold text-green-600 mb-4">
                    Thank you for your interest in our school. We will contact you soon!
                  </h3>
                  <button
                    onClick={handleClearForm}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {/* Student Photo Upload - At the Top */}
                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg border-2 border-blue-200">
                    <h3 className="text-xl font-bold text-blue-900 mb-4 text-center">Student Photo</h3>
                    
                    <div className="flex flex-col items-center">
                      {/* Photo Preview */}
                      <div className="mb-4">
                        {photoPreview ? (
                          <div className="relative">
                            <img 
                              src={photoPreview} 
                              alt="Student Preview" 
                              className="w-32 h-32 object-cover rounded-full border-4 border-blue-400 shadow-lg"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setStudentPhoto(null);
                                setPhotoPreview(null);
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <div className="w-32 h-32 bg-gray-200 rounded-full border-4 border-dashed border-gray-400 flex items-center justify-center">
                            <span className="text-4xl text-gray-400">👤</span>
                          </div>
                        )}
                      </div>

                      {/* Upload Button */}
                      <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-md">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="hidden"
                        />
                        {photoPreview ? 'Change Photo' : 'Upload Photo'}
                      </label>
                      <p className="text-xs text-gray-500 mt-2">Recommended: Passport size photo</p>
                    </div>
                  </div>

                  {/* Child Information */}
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-blue-900 mb-4">Child Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="admit-childName" className="block text-sm font-semibold text-gray-700 mb-2">
                          Name of the Child (Full Name in Capital Letters) *
                        </label>
                        <input
                          id="admit-childName"
                          type="text"
                          name="childName"
                          value={formData.childName}
                          onChange={handleInputChange}
                          required
                          autoComplete="name"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                          placeholder="ENTER CHILD'S FULL NAME"
                        />
                      </div>

                      <div>
                        <label htmlFor="admit-dateOfBirth" className="block text-sm font-semibold text-gray-700 mb-2">
                          Date of Birth *
                        </label>
                        <input
                          id="admit-dateOfBirth"
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          required
                          autoComplete="bday"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Sex *
                        </label>
                        <select
                          name="sex"
                          value={formData.sex}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select</option>
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Blood Group
                        </label>
                        <select
                          name="bloodGroup"
                          value={formData.bloodGroup}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select Blood Group</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="admit-contactType" className="block text-sm font-semibold text-gray-700 mb-2">
                          Contact Type *
                        </label>
                        <select
                          id="admit-contactType"
                          name="contactType"
                          value={formData.contactType}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select</option>
                          <option value="FATHER">Father</option>
                          <option value="MOTHER">Mother</option>
                          <option value="GUARDIAN">Guardian</option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="admit-contactNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                          Contact Number *
                        </label>
                        <input
                          id="admit-contactNumber"
                          type="tel"
                          name="contactNumber"
                          value={formData.contactNumber}
                          onChange={handleInputChange}
                          required
                          autoComplete="tel"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter contact number"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Parents/Guardian Details */}
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-purple-900 mb-4">Details of Parents/Guardian</h3>
                    
                    {/* Table Header */}
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-purple-200">
                            <th className="border border-gray-300 px-2 py-2 text-sm font-semibold"></th>
                            <th className="border border-gray-300 px-2 py-2 text-sm font-semibold">Father</th>
                            <th className="border border-gray-300 px-2 py-2 text-sm font-semibold">Mother</th>
                            <th className="border border-gray-300 px-2 py-2 text-sm font-semibold">Guardian</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Name Row */}
                          <tr>
                            <td className="border border-gray-300 px-2 py-2 font-semibold bg-purple-50">Name (Capital)</td>
                            <td className="border border-gray-300 px-2 py-2">
                              <input
                                type="text"
                                name="fatherName"
                                value={formData.fatherName}
                                onChange={handleInputChange}
                                className="w-full px-2 py-1 border border-gray-200 rounded uppercase text-sm"
                                placeholder="NAME"
                              />
                            </td>
                            <td className="border border-gray-300 px-2 py-2">
                              <input
                                type="text"
                                name="motherName"
                                value={formData.motherName}
                                onChange={handleInputChange}
                                className="w-full px-2 py-1 border border-gray-200 rounded uppercase text-sm"
                                placeholder="NAME"
                              />
                            </td>
                            <td className="border border-gray-300 px-2 py-2">
                              <input
                                type="text"
                                name="guardianName"
                                value={formData.guardianName}
                                onChange={handleInputChange}
                                className="w-full px-2 py-1 border border-gray-200 rounded uppercase text-sm"
                                placeholder="NAME"
                              />
                            </td>
                          </tr>

                          {/* Nationality Row */}
                          <tr>
                            <td className="border border-gray-300 px-2 py-2 font-semibold bg-purple-50">Nationality</td>
                            <td className="border border-gray-300 px-2 py-2">
                              <input
                                type="text"
                                name="fatherNationality"
                                value={formData.fatherNationality}
                                onChange={handleInputChange}
                                className="w-full px-2 py-1 border border-gray-200 rounded uppercase text-sm"
                              />
                            </td>
                            <td className="border border-gray-300 px-2 py-2">
                              <input
                                type="text"
                                name="motherNationality"
                                value={formData.motherNationality}
                                onChange={handleInputChange}
                                className="w-full px-2 py-1 border border-gray-200 rounded uppercase text-sm"
                              />
                            </td>
                            <td className="border border-gray-300 px-2 py-2">
                              <input
                                type="text"
                                name="guardianNationality"
                                value={formData.guardianNationality}
                                onChange={handleInputChange}
                                className="w-full px-2 py-1 border border-gray-200 rounded uppercase text-sm"
                              />
                            </td>
                          </tr>

                          {/* Occupation Row */}
                          <tr>
                            <td className="border border-gray-300 px-2 py-2 font-semibold bg-purple-50">Occupation</td>
                            <td className="border border-gray-300 px-2 py-2">
                              <input
                                type="text"
                                name="fatherOccupation"
                                value={formData.fatherOccupation}
                                onChange={handleInputChange}
                                className="w-full px-2 py-1 border border-gray-200 rounded uppercase text-sm"
                              />
                            </td>
                            <td className="border border-gray-300 px-2 py-2">
                              <input
                                type="text"
                                name="motherOccupation"
                                value={formData.motherOccupation}
                                onChange={handleInputChange}
                                className="w-full px-2 py-1 border border-gray-200 rounded uppercase text-sm"
                              />
                            </td>
                            <td className="border border-gray-300 px-2 py-2">
                              <input
                                type="text"
                                name="guardianOccupation"
                                value={formData.guardianOccupation}
                                onChange={handleInputChange}
                                className="w-full px-2 py-1 border border-gray-200 rounded uppercase text-sm"
                              />
                            </td>
                          </tr>

                          {/* Office Address Row */}
                          <tr>
                            <td className="border border-gray-300 px-2 py-2 font-semibold bg-purple-50">Office Address & Tel</td>
                            <td className="border border-gray-300 px-2 py-2">
                              <textarea
                                name="fatherOfficeAddress"
                                value={formData.fatherOfficeAddress}
                                onChange={handleInputChange}
                                rows="2"
                                className="w-full px-2 py-1 border border-gray-200 rounded uppercase text-sm"
                              />
                            </td>
                            <td className="border border-gray-300 px-2 py-2">
                              <textarea
                                name="motherOfficeAddress"
                                value={formData.motherOfficeAddress}
                                onChange={handleInputChange}
                                rows="2"
                                className="w-full px-2 py-1 border border-gray-200 rounded uppercase text-sm"
                              />
                            </td>
                            <td className="border border-gray-300 px-2 py-2">
                              <textarea
                                name="guardianOfficeAddress"
                                value={formData.guardianOfficeAddress}
                                onChange={handleInputChange}
                                rows="2"
                                className="w-full px-2 py-1 border border-gray-200 rounded uppercase text-sm"
                              />
                            </td>
                          </tr>

                          {/* Distance Row */}
                          <tr>
                            <td className="border border-gray-300 px-2 py-2 font-semibold bg-purple-50">Distance from School</td>
                            <td className="border border-gray-300 px-2 py-2">
                              <input
                                type="text"
                                name="fatherDistance"
                                value={formData.fatherDistance}
                                onChange={handleInputChange}
                                className="w-full px-2 py-1 border border-gray-200 rounded uppercase text-sm"
                              />
                            </td>
                            <td className="border border-gray-300 px-2 py-2">
                              <input
                                type="text"
                                name="motherDistance"
                                value={formData.motherDistance}
                                onChange={handleInputChange}
                                className="w-full px-2 py-1 border border-gray-200 rounded uppercase text-sm"
                              />
                            </td>
                            <td className="border border-gray-300 px-2 py-2">
                              <input
                                type="text"
                                name="guardianDistance"
                                value={formData.guardianDistance}
                                onChange={handleInputChange}
                                className="w-full px-2 py-1 border border-gray-200 rounded uppercase text-sm"
                              />
                            </td>
                          </tr>

                          {/* Permanent Address Row */}
                          <tr>
                            <td className="border border-gray-300 px-2 py-2 font-semibold bg-purple-50">Permanent Address</td>
                            <td className="border border-gray-300 px-2 py-2">
                              <textarea
                                name="fatherPermanentAddress"
                                value={formData.fatherPermanentAddress}
                                onChange={handleInputChange}
                                rows="2"
                                className="w-full px-2 py-1 border border-gray-200 rounded uppercase text-sm"
                              />
                            </td>
                            <td className="border border-gray-300 px-2 py-2">
                              <textarea
                                name="motherPermanentAddress"
                                value={formData.motherPermanentAddress}
                                onChange={handleInputChange}
                                rows="2"
                                className="w-full px-2 py-1 border border-gray-200 rounded uppercase text-sm"
                              />
                            </td>
                            <td className="border border-gray-300 px-2 py-2">
                              <textarea
                                name="guardianPermanentAddress"
                                value={formData.guardianPermanentAddress}
                                onChange={handleInputChange}
                                rows="2"
                                className="w-full px-2 py-1 border border-gray-200 rounded uppercase text-sm"
                              />
                            </td>
                          </tr>

                          {/* Monthly Income Row */}
                          <tr>
                            <td className="border border-gray-300 px-2 py-2 font-semibold bg-purple-50">Monthly Income</td>
                            <td className="border border-gray-300 px-2 py-2">
                              <input
                                type="text"
                                name="fatherIncome"
                                value={formData.fatherIncome}
                                onChange={handleInputChange}
                                className="w-full px-2 py-1 border border-gray-200 rounded uppercase text-sm"
                              />
                            </td>
                            <td className="border border-gray-300 px-2 py-2">
                              <input
                                type="text"
                                name="motherIncome"
                                value={formData.motherIncome}
                                onChange={handleInputChange}
                                className="w-full px-2 py-1 border border-gray-200 rounded uppercase text-sm"
                              />
                            </td>
                            <td className="border border-gray-300 px-2 py-2">
                              <input
                                type="text"
                                name="guardianIncome"
                                value={formData.guardianIncome}
                                onChange={handleInputChange}
                                className="w-full px-2 py-1 border border-gray-200 rounded uppercase text-sm"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Combined Academic & Transfer Information */}
                  <div className="bg-indigo-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-indigo-900 mb-4">Academic & Transfer Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Class to which Admission is Sought *
                        </label>
                        <select
                          name="classAdmission"
                          value={formData.classAdmission}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                          <option value="">Select Class</option>
                          <option value="NURSERY">Nursery</option>
                          <option value="LKG">LKG</option>
                          <option value="UKG">UKG</option>
                          <option value="CLASS 1">Class 1</option>
                          <option value="CLASS 2">Class 2</option>
                          <option value="CLASS 3">Class 3</option>
                          <option value="CLASS 4">Class 4</option>
                          <option value="CLASS 5">Class 5</option>
                          <option value="CLASS 6">Class 6</option>
                          <option value="CLASS 7">Class 7</option>
                          <option value="CLASS 8">Class 8</option>
                          <option value="CLASS 9">Class 9</option>
                          <option value="CLASS 10">Class 10</option>
                          <option value="CLASS 11">Class 11</option>
                          <option value="CLASS 12">Class 12</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Whether Transfer Certificate is Attached *
                        </label>
                        <select
                          name="tcAttached"
                          value={formData.tcAttached}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                          <option value="">Select</option>
                          <option value="YES">Yes</option>
                          <option value="NO">No</option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          How did you know about Minervaa Vidhya Mandhir School (MVM)? *
                        </label>
                        <textarea
                          name="howKnow"
                          value={formData.howKnow}
                          onChange={handleInputChange}
                          required
                          rows="3"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent uppercase"
                          placeholder="Please tell us how you came to know about our school"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 justify-end pt-4">
                    <button
                      type="button"
                      onClick={handleClearForm}
                      className="px-8 py-3 border-2 border-gray-400 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                      Clear Form
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-700 hover:to-purple-700'
                      }`}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};