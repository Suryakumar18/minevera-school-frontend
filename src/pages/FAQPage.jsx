import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, BookOpen, Users, Calendar, DollarSign, Bus, Clock } from 'lucide-react';

const FAQItem = ({ question, answer, icon: Icon, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-colors duration-300"
      >
        <div className="flex items-center gap-4">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg text-white">
            <Icon size={24} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{question}</h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="text-gray-600" size={24} />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 pt-2">
              <p className="text-gray-700 leading-relaxed pl-14">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const FAQPage = () => {
  const faqs = [
    {
      category: "Admissions",
      questions: [
        {
          question: "What is the admission process at Minervaa School?",
          answer: "Our admission process includes filling out an online application form, submitting required documents (birth certificate, previous academic records, photographs), followed by an interaction with the child and parents. We accept applications throughout the year based on seat availability.",
          icon: BookOpen
        },
        {
          question: "What age groups do you accept for admission?",
          answer: "We accept children from Nursery (2.5 years) to Grade 12. For Nursery, the child should be 2.5 years old as of June 1st of the academic year. Age requirements vary by grade level as per government norms.",
          icon: Users
        },
        {
          question: "When does the academic year begin?",
          answer: "Our academic year begins in June and ends in April. New admissions are primarily conducted in March-May for the upcoming academic year, though we accept mid-year admissions based on availability.",
          icon: Calendar
        },
        {
          question: "Is there an entrance exam for admission?",
          answer: "For Nursery to Grade 2, we conduct a simple interaction to understand the child's readiness. For Grade 3 onwards, we conduct an age-appropriate assessment to evaluate the child's current academic level and ensure proper grade placement.",
          icon: HelpCircle
        }
      ]
    },
    {
      category: "Fees & Payment",
      questions: [
        {
          question: "What are the fee payment options available?",
          answer: "We offer multiple payment options including online payment through our portal, bank transfer, cheque, and cash at the school office. Fees can be paid annually, semi-annually, or quarterly based on parent preference.",
          icon: DollarSign
        },
        {
          question: "Do you offer any scholarship programs?",
          answer: "Yes, we offer merit-based scholarships for academically excellent students and need-based financial assistance for deserving students. Applications for scholarships are reviewed annually. Please contact our admissions office for detailed information.",
          icon: DollarSign
        },
        {
          question: "Is transportation fee included in the school fee?",
          answer: "No, transportation fee is separate from the tuition fee. The transport fee varies based on the distance from school and is charged per term. Parents can choose to opt-in or opt-out of the transportation facility.",
          icon: Bus
        }
      ]
    },
    {
      category: "Curriculum & Academics",
      questions: [
        {
          question: "What curriculum does Minervaa School follow?",
          answer: "We follow the CBSE curriculum with an enriched syllabus that includes additional focus on English communication, computer education, arts, and sports. Our curriculum is designed to develop both academic excellence and life skills.",
          icon: BookOpen
        },
        {
          question: "What is the student-teacher ratio?",
          answer: "We maintain a healthy student-teacher ratio of approximately 25:1 to ensure personalized attention for each child. For primary grades, we have assistant teachers for additional support during classes.",
          icon: Users
        },
        {
          question: "Do you provide extra coaching or remedial classes?",
          answer: "Yes, we offer free remedial classes for students who need additional support in core subjects. We also provide after-school programs for competitive exam preparation and skill development courses.",
          icon: BookOpen
        }
      ]
    },
    {
      category: "Facilities & Safety",
      questions: [
        {
          question: "What safety measures are in place at the school?",
          answer: "We have comprehensive safety measures including CCTV surveillance throughout campus, trained security personnel, controlled entry/exit system, fire safety equipment, first aid facilities, and a full-time nurse on campus. All staff undergo background verification.",
          icon: HelpCircle
        },
        {
          question: "Do you have medical facilities on campus?",
          answer: "Yes, we have a well-equipped medical room with a qualified nurse available during school hours. We maintain medical records for all students and have tie-ups with nearby hospitals for emergencies. Regular health check-ups are conducted.",
          icon: HelpCircle
        },
        {
          question: "What are the school timings?",
          answer: "School timings are from 8:30 AM to 3:30 PM for Grades 1-12. For Nursery and KG, timings are 8:30 AM to 12:30 PM. These timings may vary slightly during summer months or special events.",
          icon: Clock
        },
        {
          question: "Do you provide transportation facility?",
          answer: "Yes, we provide safe and reliable bus transportation covering major residential areas. All buses are GPS-enabled with CCTV cameras and have trained attendants. Transport routes are planned to minimize travel time for students.",
          icon: Bus
        }
      ]
    },
    {
      category: "Parent Engagement",
      questions: [
        {
          question: "How often are parent-teacher meetings conducted?",
          answer: "We conduct formal parent-teacher meetings twice a year after each term examination. Additionally, parents can schedule appointments with teachers anytime to discuss their child's progress. We also maintain regular communication through our mobile app.",
          icon: Users
        },
        {
          question: "How do you communicate student progress to parents?",
          answer: "We provide detailed report cards twice a year, maintain a parent communication diary, send regular SMS updates, and use our school mobile app for instant notifications about attendance, events, and important announcements.",
          icon: HelpCircle
        }
      ]
    }
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-block p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
            <HelpCircle className="text-white" size={48} />
          </div>
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
              Frequently Asked Questions
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about Minervaa School. Can't find what you're looking for? 
            Feel free to <a href="/contact" className="text-blue-600 hover:underline">contact us</a>.
          </p>
        </motion.div>

        {/* FAQ Categories */}
        <div className="max-w-5xl mx-auto space-y-12">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3"
              >
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                {category.category}
              </motion.h2>
              
              <div className="space-y-4">
                {category.questions.map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    icon={faq.icon}
                    index={index}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center p-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Still Have Questions?
          </h3>
          <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
            Our admissions team is here to help! Contact us for personalized assistance with your queries.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-white text-purple-600 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </div>
  );
};
