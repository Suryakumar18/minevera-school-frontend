import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Phone } from 'lucide-react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

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
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
      if (file.size > 5 * 1024 * 1024) {
        alert('Photo size must be less than 5MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }
      
      setStudentPhoto(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value.toUpperCase()
    }));
  };

  // Helper function to remove emojis and special characters
  const sanitizeText = (text) => {
    if (!text) return 'N/A';
    // Remove emojis and special characters, keep alphanumeric and basic punctuation
    return text.toString().replace(/[^\x00-\x7F]/g, '').trim() || 'N/A';
  };

  // Professional HTML Email Template
  const generateHTMLEmail = (formData, photoPreview) => {
    const formatDate = (dateString) => {
      if (!dateString) return 'N/A';
      return new Date(dateString).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    };

    const formatCurrency = (value) => {
      if (!value) return 'N/A';
      return `Rs. ${value}`;
    };

    const photoHtml = photoPreview 
      ? `<div style="text-align: center; margin-bottom: 30px;">
           <div style="display: inline-block; border: 4px solid #2563eb; border-radius: 50%; padding: 5px; background: white;">
             <img src="${photoPreview}" alt="Student Photo" style="width: 150px; height: 150px; border-radius: 50%; object-fit: cover; display: block;" />
           </div>
           <p style="color: #2563eb; font-weight: 600; margin-top: 10px;">Student Photograph</p>
         </div>`
      : '';

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Admission Enquiry - Minervaa Vidhya Mandhir School</title>
        <style>
          body {
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
            background: #f3f4f6;
          }
          .container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          }
          .header {
            background: #1e40af;
            color: white;
            padding: 30px;
            text-align: center;
          }
          .school-name {
            font-size: 28px;
            font-weight: bold;
            margin: 0;
          }
          .badge {
            background: #fbbf24;
            color: #1e3c72;
            padding: 6px 16px;
            border-radius: 20px;
            display: inline-block;
            font-weight: bold;
            margin-top: 10px;
          }
          .content {
            padding: 30px;
          }
          .info-card {
            background: #f8fafc;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
            border: 1px solid #e2e8f0;
          }
          .card-title {
            color: #1e40af;
            font-size: 18px;
            margin: 0 0 15px 0;
            padding-bottom: 8px;
            border-bottom: 2px solid #2563eb;
            font-weight: bold;
          }
          .info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
          }
          .info-item {
            background: white;
            padding: 12px;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
          }
          .info-label {
            color: #64748b;
            font-size: 12px;
            margin-bottom: 4px;
          }
          .info-value {
            color: #0f172a;
            font-weight: 600;
            font-size: 14px;
          }
          .data-table {
            width: 100%;
            border-collapse: collapse;
          }
          .data-table th {
            background: #2563eb;
            color: white;
            padding: 10px;
            text-align: left;
            font-size: 14px;
          }
          .data-table td {
            padding: 10px;
            border: 1px solid #e2e8f0;
            font-size: 13px;
          }
          .data-table tr:nth-child(even) {
            background: #f8fafc;
          }
          .tag {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 12px;
          }
          .tag-blue {
            background: #dbeafe;
            color: #1e40af;
          }
          .tag-pink {
            background: #fce7f3;
            color: #9d174d;
          }
          .tag-green {
            background: #dcfce7;
            color: #166534;
          }
          .tag-red {
            background: #fee2e2;
            color: #991b1b;
          }
          .footer {
            background: #1e293b;
            color: white;
            padding: 20px;
            text-align: center;
            font-size: 13px;
          }
          .footer-info {
            margin: 10px 0;
            color: #cbd5e1;
          }
          .reference-id {
            background: #fbbf24;
            color: #1e293b;
            padding: 4px 12px;
            border-radius: 4px;
            display: inline-block;
            font-weight: bold;
            margin-bottom: 15px;
            font-size: 13px;
          }
          @media (max-width: 768px) {
            .info-grid {
              grid-template-columns: 1fr;
            }
            .school-name {
              font-size: 22px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="school-name">MINERVAA VIDHYA MANDHIR SCHOOL</h1>
            <p style="margin: 5px 0 0; opacity: 0.9;">Excellence in Education</p>
            <div class="badge">ADMISSION ENQUIRY FORM</div>
          </div>
          
          <div class="content">
            <div style="text-align: center; margin-bottom: 20px;">
              <span class="reference-id">REF: MVM/${new Date().getFullYear()}/${Math.random().toString(36).substr(2, 8).toUpperCase()}</span>
              <p style="color: #64748b; font-size: 13px; margin: 5px 0 0;">
                Submitted on: ${new Date().toLocaleString('en-IN')}
              </p>
            </div>
            
            ${photoHtml}
            
            <!-- Child Information -->
            <div class="info-card">
              <h2 class="card-title">CHILD INFORMATION</h2>
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Full Name</div>
                  <div class="info-value">${formData.childName || 'N/A'}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Date of Birth</div>
                  <div class="info-value">${formatDate(formData.dateOfBirth)}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Sex</div>
                  <div class="info-value">
                    <span class="tag ${formData.sex === 'MALE' ? 'tag-blue' : 'tag-pink'}">${formData.sex || 'N/A'}</span>
                  </div>
                </div>
                <div class="info-item">
                  <div class="info-label">Blood Group</div>
                  <div class="info-value">
                    <span class="tag tag-red">${formData.bloodGroup || 'N/A'}</span>
                  </div>
                </div>
                <div class="info-item">
                  <div class="info-label">Contact Number</div>
                  <div class="info-value">${formData.contactNumber || 'N/A'}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Contact Type</div>
                  <div class="info-value">${formData.contactType || 'N/A'}</div>
                </div>
              </div>
            </div>
            
            <!-- Parents/Guardian Details -->
            <div class="info-card">
              <h2 class="card-title">PARENTS / GUARDIAN DETAILS</h2>
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Father</th>
                    <th>Mother</th>
                    <th>Guardian</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td><strong>Name</strong></td><td>${formData.fatherName || 'N/A'}</td><td>${formData.motherName || 'N/A'}</td><td>${formData.guardianName || 'N/A'}</td></tr>
                  <tr><td><strong>Nationality</strong></td><td>${formData.fatherNationality || 'N/A'}</td><td>${formData.motherNationality || 'N/A'}</td><td>${formData.guardianNationality || 'N/A'}</td></tr>
                  <tr><td><strong>Occupation</strong></td><td>${formData.fatherOccupation || 'N/A'}</td><td>${formData.motherOccupation || 'N/A'}</td><td>${formData.guardianOccupation || 'N/A'}</td></tr>
                  <tr><td><strong>Office Address</strong></td><td>${formData.fatherOfficeAddress || 'N/A'}</td><td>${formData.motherOfficeAddress || 'N/A'}</td><td>${formData.guardianOfficeAddress || 'N/A'}</td></tr>
                  <tr><td><strong>Distance</strong></td><td>${formData.fatherDistance || 'N/A'}</td><td>${formData.motherDistance || 'N/A'}</td><td>${formData.guardianDistance || 'N/A'}</td></tr>
                  <tr><td><strong>Permanent Address</strong></td><td>${formData.fatherPermanentAddress || 'N/A'}</td><td>${formData.motherPermanentAddress || 'N/A'}</td><td>${formData.guardianPermanentAddress || 'N/A'}</td></tr>
                  <tr><td><strong>Monthly Income</strong></td><td>${formatCurrency(formData.fatherIncome)}</td><td>${formatCurrency(formData.motherIncome)}</td><td>${formatCurrency(formData.guardianIncome)}</td></tr>
                </tbody>
              </table>
            </div>
            
            <!-- Academic Information -->
            <div class="info-card">
              <h2 class="card-title">ACADEMIC INFORMATION</h2>
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Class Seeking Admission</div>
                  <div class="info-value">
                    <span class="tag tag-green">${formData.classAdmission || 'N/A'}</span>
                  </div>
                </div>
                <div class="info-item">
                  <div class="info-label">Transfer Certificate</div>
                  <div class="info-value">
                    <span class="tag ${formData.tcAttached === 'YES' ? 'tag-green' : 'tag-red'}">${formData.tcAttached || 'N/A'}</span>
                  </div>
                </div>
              </div>
              <div style="margin-top: 15px;">
                <div class="info-label">How did you know about MVM School?</div>
                <div style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 8px; font-size: 13px;">
                  ${formData.howKnow || 'N/A'}
                </div>
              </div>
            </div>
          </div>
          
          <div class="footer">
            <h3 style="color: #fbbf24; margin: 0 0 10px 0;">Minervaa Vidhya Mandhir School</h3>
            <div class="footer-info">
              A21, A22 D Colony, Pollachi, Tamil Nadu<br>
              +91 98948 86733 | +91 99949 59484<br>
              admissions@minervaa.edu.in
            </div>
            <div style="color: #64748b; font-size: 11px; margin-top: 15px; border-top: 1px solid #334155; padding-top: 10px;">
              This is a computer-generated document. No signature is required.
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Generate PDF
     
      // Generate HTML email
      const htmlEmail = generateHTMLEmail(formData, photoPreview);
      
      // Create FormData for Formspree
      const formDataToSend = new FormData();
      
      // Add all form fields
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      // Format date of birth
      if (formData.dateOfBirth) {
        const dob = new Date(formData.dateOfBirth);
        formDataToSend.append('dateOfBirth_formatted', dob.toLocaleDateString('en-IN'));
      }
      
      
      // Add HTML email content
      formDataToSend.append('_subject', `New Admission Enquiry - ${formData.childName || 'New Student'}`);
      
      // Add text version
      formDataToSend.append('message', `
NEW ADMISSION ENQUIRY

Student: ${formData.childName || 'N/A'}
Class: ${formData.classAdmission || 'N/A'}
Contact: ${formData.contactNumber || 'N/A'}

      `);
      
      // Add timestamp
      formDataToSend.append('submitted_at', new Date().toISOString());
      formDataToSend.append('reference_id', `MVM/${new Date().getFullYear()}/${Math.random().toString(36).substr(2, 8).toUpperCase()}`);
      
      // Send to Formspree
      const response = await fetch('https://formspree.io/f/xnjbzwrn', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setShowThankYou(true);
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Submission Error:', error);
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-2 sm:p-4"
            onClick={(e) => e.target === e.currentTarget && handleClose()}
          >
            <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden max-h-[90vh] sm:max-h-[95vh] overflow-y-auto">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="absolute top-2 left-2 sm:top-6 sm:left-6 z-10"
              >
                <span className="inline-flex items-center gap-1.5 sm:gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 sm:px-8 sm:py-4 rounded-full font-bold text-xs sm:text-xl md:text-2xl shadow-2xl">
                  ADMISSION OPEN
                </span>
              </motion.div>

              <button
                onClick={handleClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-[20] p-2 sm:p-2.5 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors duration-300 shadow-lg"
              >
                <X size={20} className="sm:w-6 sm:h-6" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="bg-gradient-to-br from-blue-400 via-blue-300 to-cyan-300 p-4 sm:p-8 md:p-12 flex items-center justify-center relative overflow-hidden min-h-[220px] sm:min-h-[300px] md:min-h-[600px] pt-16 sm:pt-8">
                  <div className="relative z-10 text-center w-full h-full flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.8, y: 20, opacity: 0 }}
                      animate={{ scale: 1, y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, type: 'spring' }}
                      className="relative mt-4 sm:mt-0"
                    >
                      <motion.div 
                        className="relative inline-block"
                        animate={{ y: [0, -20, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                      >
                        <div className="relative">
                          <div className="w-28 h-28 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-yellow-300 via-orange-300 to-pink-300 flex items-center justify-center shadow-2xl">
                            <span className="text-5xl sm:text-8xl md:text-9xl">👨‍🎓</span>
                          </div>
                        </div>
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

                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                      className="absolute top-6 sm:top-10 right-6 sm:right-10 text-4xl sm:text-6xl"
                    >
                      ⭐
                    </motion.div>
                  </div>
                </div>

                <div className="p-4 sm:p-6 md:p-10 flex flex-col justify-center bg-white">
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

                  <motion.p
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-700 text-xs sm:text-base md:text-lg mb-3 sm:mb-4 font-medium leading-snug"
                  >
                    An International Standard Education for Your Child's Bright Future
                  </motion.p>

                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mb-3 sm:mb-4"
                  >
                    <button onClick={handleEnrollClick} className="block w-full">
                      <div className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 rounded-xl md:rounded-2xl p-2.5 sm:p-3 md:p-4 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                        <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white text-center tracking-wider drop-shadow-lg">
                          ENROLL NOW
                        </h3>
                      </div>
                    </button>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl p-3 md:p-4 shadow-lg"
                  >
                    <div className="flex flex-col gap-1.5 md:gap-2 text-white text-xs sm:text-sm md:text-base">
                      <div className="flex items-start gap-2">
                        <MapPin size={16} className="flex-shrink-0 mt-1" />
                        <span className="font-medium">A21, A22 D Colony, Pollachi, Tamil Nadu</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={16} className="flex-shrink-0" />
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

      {showForm && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto">
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

              {showThankYou ? (
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-6xl mb-4"
                  >
                    ✓
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
                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg border-2 border-blue-200">
                    <h3 className="text-xl font-bold text-blue-900 mb-4 text-center">Student Photo</h3>
                    
                    <div className="flex flex-col items-center">
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

                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-blue-900 mb-4">Child Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="childName" className="block text-sm font-semibold text-gray-700 mb-2">
                          Name of the Child (Full Name in Capital Letters) *
                        </label>
                        <input
                          id="childName"
                          type="text"
                          name="childName"
                          value={formData.childName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                          placeholder="ENTER CHILD'S FULL NAME"
                        />
                      </div>

                      <div>
                        <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-gray-700 mb-2">
                          Date of Birth *
                        </label>
                        <input
                          id="dateOfBirth"
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          required
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
                        <label htmlFor="contactType" className="block text-sm font-semibold text-gray-700 mb-2">
                          Contact Type *
                        </label>
                        <select
                          id="contactType"
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
                        <label htmlFor="contactNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                          Contact Number *
                        </label>
                        <input
                          id="contactNumber"
                          type="tel"
                          name="contactNumber"
                          value={formData.contactNumber}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter contact number"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-purple-900 mb-4">Details of Parents/Guardian</h3>
                    
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
                          {[
                            ['fatherName', 'motherName', 'guardianName', 'Name (Capital)'],
                            ['fatherNationality', 'motherNationality', 'guardianNationality', 'Nationality'],
                            ['fatherOccupation', 'motherOccupation', 'guardianOccupation', 'Occupation'],
                            ['fatherOfficeAddress', 'motherOfficeAddress', 'guardianOfficeAddress', 'Office Address & Tel'],
                            ['fatherDistance', 'motherDistance', 'guardianDistance', 'Distance from School'],
                            ['fatherPermanentAddress', 'motherPermanentAddress', 'guardianPermanentAddress', 'Permanent Address'],
                            ['fatherIncome', 'motherIncome', 'guardianIncome', 'Monthly Income']
                          ].map(([f, m, g, label], idx) => (
                            <tr key={idx}>
                              <td className="border border-gray-300 px-2 py-2 font-semibold bg-purple-50">{label}</td>
                              <td className="border border-gray-300 px-2 py-2">
                                {label.includes('Address') ? (
                                  <textarea
                                    name={f}
                                    value={formData[f]}
                                    onChange={handleInputChange}
                                    rows="2"
                                    className="w-full px-2 py-1 border border-gray-200 rounded uppercase text-sm"
                                  />
                                ) : (
                                  <input
                                    type="text"
                                    name={f}
                                    value={formData[f]}
                                    onChange={handleInputChange}
                                    className="w-full px-2 py-1 border border-gray-200 rounded uppercase text-sm"
                                  />
                                )}
                              </td>
                              <td className="border border-gray-300 px-2 py-2">
                                {label.includes('Address') ? (
                                  <textarea
                                    name={m}
                                    value={formData[m]}
                                    onChange={handleInputChange}
                                    rows="2"
                                    className="w-full px-2 py-1 border border-gray-200 rounded uppercase text-sm"
                                  />
                                ) : (
                                  <input
                                    type="text"
                                    name={m}
                                    value={formData[m]}
                                    onChange={handleInputChange}
                                    className="w-full px-2 py-1 border border-gray-200 rounded uppercase text-sm"
                                  />
                                )}
                              </td>
                              <td className="border border-gray-300 px-2 py-2">
                                {label.includes('Address') ? (
                                  <textarea
                                    name={g}
                                    value={formData[g]}
                                    onChange={handleInputChange}
                                    rows="2"
                                    className="w-full px-2 py-1 border border-gray-200 rounded uppercase text-sm"
                                  />
                                ) : (
                                  <input
                                    type="text"
                                    name={g}
                                    value={formData[g]}
                                    onChange={handleInputChange}
                                    className="w-full px-2 py-1 border border-gray-200 rounded uppercase text-sm"
                                  />
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

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
