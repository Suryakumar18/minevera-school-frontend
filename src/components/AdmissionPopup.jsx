import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Phone, Loader, AlertCircle, CheckCircle } from 'lucide-react';

export const AdmissionPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [studentPhoto, setStudentPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitProgress, setSubmitProgress] = useState(0);
  const [submitError, setSubmitError] = useState(null);
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle, uploading, success, error
  
  // Ref to track if component is mounted
  const isMounted = useRef(true);
  
  // Abort controller for fetch requests
  const abortControllerRef = useRef(null);

  useEffect(() => {
    // Show popup after a short delay when component mounts
    const timer = setTimeout(() => {
      if (isMounted.current) {
        setIsOpen(true);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
      isMounted.current = false;
      // Abort any ongoing fetch requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Listen for global event to open the admission popup
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setShowForm(true);
      // Reset states when opening
      setSubmitError(null);
      setSubmitStatus('idle');
    };

    window.addEventListener('openAdmission', handleOpen);
    return () => window.removeEventListener('openAdmission', handleOpen);
  }, []);

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

  const handleClose = () => {
    setIsOpen(false);
    setShowForm(false);
    setShowThankYou(false);
    setSubmitError(null);
    setSubmitStatus('idle');
    // Abort any ongoing submission
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const handleEnrollClick = () => {
    setShowForm(true);
    setSubmitError(null);
    setSubmitStatus('idle');
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

  // Simulate upload progress
  const simulateProgress = () => {
    setSubmitProgress(0);
    const interval = setInterval(() => {
      setSubmitProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 500);
    return interval;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();
    
    setIsSubmitting(true);
    setSubmitStatus('uploading');
    setSubmitError(null);
    
    // Simulate progress for better UX
    const progressInterval = simulateProgress();
    
    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      
      // Add all form fields
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      // Add photo file if available
      if (studentPhoto) {
        formDataToSend.append('photo', studentPhoto);
      }
      
      // Log the data being sent (for debugging)
      console.log('Submitting form data for:', formData.childName);
      
      // Set timeout for fetch (30 seconds)
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout - please try again')), 30000);
      });
      
      // Your backend URL - make sure this is correct
      const API_URL = process.env.NODE_ENV === 'production' 
        ? 'https://minerva-backed-3.onrender.com'  // Your Render URL
        : 'http://localhost:5000';                   // Local development
      
      const fetchPromise = fetch(`${API_URL}/api/admission`, {
        method: 'POST',
        body: formDataToSend,
        signal: abortControllerRef.current.signal,
        headers: {
          // Don't set Content-Type header when sending FormData
          // The browser will set it automatically with the correct boundary
        }
      });
      
      // Race between fetch and timeout
      const response = await Promise.race([fetchPromise, timeoutPromise]);
      
      // Clear progress interval
      clearInterval(progressInterval);
      setSubmitProgress(100);
      
      let data = null;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        try {
          data = await response.json();
        } catch (parseError) {
          console.warn('Failed to parse JSON response:', parseError);
        }
      } else {
        const text = await response.text();
        console.warn('Non-JSON response:', text);
      }

      if (response.ok) {
        console.log('✅ Admission application sent successfully!');
        setSubmitStatus('success');
        
        // Small delay to show success state
        setTimeout(() => {
          if (isMounted.current) {
            setShowThankYou(true);
            setIsSubmitting(false);
          }
        }, 500);
      } else {
        const errorMessage = data?.error || data?.message || `Failed to submit form (status ${response.status})`;
        throw new Error(errorMessage);
      }
    } catch (error) {
      // Clear progress interval
      clearInterval(progressInterval);
      
      // Check if it's an abort error
      if (error.name === 'AbortError') {
        console.log('Request was aborted');
        setSubmitError('Submission cancelled');
      } else {
        console.error('❌ Failed to send admission application:', error);
        setSubmitError(error.message || 'Failed to submit form. Please try again.');
      }
      
      setSubmitStatus('error');
      setIsSubmitting(false);
      setSubmitProgress(0);
    } finally {
      // Clean up abort controller
      abortControllerRef.current = null;
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
    setSubmitError(null);
    setSubmitStatus('idle');
  };

  const handleRetry = () => {
    setSubmitError(null);
    setSubmitStatus('idle');
    // Resubmit the form
    handleSubmit(new Event('submit'));
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

          {/* Original Popup - Your existing popup code */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-2 sm:p-4"
            onClick={(e) => e.target === e.currentTarget && handleClose()}
          >
            {/* ... Your existing popup content ... */}
            <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden max-h-[90vh] sm:max-h-[95vh] overflow-y-auto">
              {/* Keep your existing popup content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* ... Your existing left and right content ... */}
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
                  disabled={isSubmitting}
                >
                  <X size={24} />
                </button>
                <div className="flex flex-col items-center">
                  <h2 className="text-3xl font-bold text-center mb-2">Minervaa Vidhya Mandhir School</h2>
                  <p className="text-xl text-center text-blue-100">Admission Enquiry</p>
                </div>
              </div>

              {/* Error Message */}
              {submitError && (
                <div className="mx-6 mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-red-700 font-medium">Submission Failed</p>
                      <p className="text-red-600 text-sm mt-1">{submitError}</p>
                      <button
                        onClick={handleRetry}
                        className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Thank You Message */}
              {showThankYou ? (
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex justify-center mb-4"
                  >
                    <CheckCircle className="w-20 h-20 text-green-500" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-green-600 mb-4">
                    Thank you for your interest!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Your admission enquiry has been submitted successfully. We will contact you soon!
                  </p>
                  <button
                    onClick={handleClearForm}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {/* Loading Overlay */}
                  {isSubmitting && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-20 flex items-center justify-center rounded-2xl">
                      <div className="text-center p-8 max-w-md">
                        <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          Submitting your enquiry...
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Please wait while we process your application.
                        </p>
                        
                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                          <div 
                            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2.5 rounded-full transition-all duration-300"
                            style={{ width: `${submitProgress}%` }}
                          />
                        </div>
                        
                        <p className="text-sm text-gray-500">
                          {submitProgress < 30 ? 'Uploading data...' : 
                           submitProgress < 60 ? 'Processing...' : 
                           submitProgress < 90 ? 'Almost done...' : 
                           'Finalizing...'}
                        </p>
                        
                        <button
                          type="button"
                          onClick={() => {
                            if (abortControllerRef.current) {
                              abortControllerRef.current.abort();
                              setIsSubmitting(false);
                              setSubmitStatus('idle');
                            }
                          }}
                          className="mt-4 text-sm text-red-600 hover:text-red-800 underline"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Student Photo Upload */}
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
                            {!isSubmitting && (
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
                            )}
                          </div>
                        ) : (
                          <div className="w-32 h-32 bg-gray-200 rounded-full border-4 border-dashed border-gray-400 flex items-center justify-center">
                            <span className="text-4xl text-gray-400">👤</span>
                          </div>
                        )}
                      </div>

                      {/* Upload Button */}
                      <label className={`cursor-pointer ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-md`}>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="hidden"
                          disabled={isSubmitting}
                        />
                        {photoPreview ? 'Change Photo' : 'Upload Photo'}
                      </label>
                      <p className="text-xs text-gray-500 mt-2">Recommended: Passport size photo (Max 5MB)</p>
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
                          disabled={isSubmitting}
                          autoComplete="name"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                          disabled={isSubmitting}
                          autoComplete="bday"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                          disabled={isSubmitting}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                          disabled={isSubmitting}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                          disabled={isSubmitting}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                          disabled={isSubmitting}
                          autoComplete="tel"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                                disabled={isSubmitting}
                                className="w-full px-2 py-1 border border-gray-200 rounded uppercase text-sm disabled:bg-gray-100"
                                placeholder="NAME"
                              />
                            </td>
                            <td className="border border-gray-300 px-2 py-2">
                              <input
                                type="text"
                                name="motherName"
                                value={formData.motherName}
                                onChange={handleInputChange}
                                disabled={isSubmitting}
                                className="w-full px-2 py-1 border border-gray-200 rounded uppercase text-sm disabled:bg-gray-100"
                                placeholder="NAME"
                              />
                            </td>
                            <td className="border border-gray-300 px-2 py-2">
                              <input
                                type="text"
                                name="guardianName"
                                value={formData.guardianName}
                                onChange={handleInputChange}
                                disabled={isSubmitting}
                                className="w-full px-2 py-1 border border-gray-200 rounded uppercase text-sm disabled:bg-gray-100"
                                placeholder="NAME"
                              />
                            </td>
                          </tr>

                          {/* Add other rows with disabled={isSubmitting} similarly */}
                          {/* ... */}
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
                          disabled={isSubmitting}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                          disabled={isSubmitting}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                          disabled={isSubmitting}
                          rows="3"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent uppercase disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                      disabled={isSubmitting}
                      className="px-8 py-3 border-2 border-gray-400 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Clear Form
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2 ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-700 hover:to-purple-700'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader className="w-5 h-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Enquiry'
                      )}
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
