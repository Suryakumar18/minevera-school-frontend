import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Sparkles, MapPin, School, Beaker, Dumbbell, Bus, Library, Music, X } from 'lucide-react';

const facilityData = {
  'smart-classrooms': {
    title: 'Smart Classrooms',
    blurb: 'Interactive boards, audio-visual systems, and campus Wi-Fi turn every lesson into an engaging experience.',
    icon: School,
    highlights: [
      'Interactive digital boards and screen casting',
      'High-speed Wi-Fi with LMS access',
      'Adaptive content and formative assessments',
      'Collaborative zones for group work'
    ],
    sections: [
      {
        title: 'Overview',
        blurb: 'Technology-rich classrooms designed to support blended and active learning.',
        highlights: ['Teacher-led interactive lessons', 'Projection and screen casting', 'Flexible seating for group activities']
      },
      {
        title: 'Technology',
        blurb: 'Robust AV setup and devices that help teachers deliver multimedia lessons and formative assessments.',
        highlights: ['Interactive touch boards', 'Document cameras and speakers', 'LMS access and digital content']
      },
      {
        title: 'Learning Experience',
        blurb: 'Classrooms are arranged to encourage collaboration, inquiry, and hands-on projects.',
        highlights: ['Group zones and breakout areas', 'Project-based learning support', 'Regular teacher training on ed-tech']
      }
    ],
  },
  'science-labs': {
    title: 'Science and Computer Lab',
    blurb: 'Well-equipped science and computer labs with modern apparatus and computer workstations for hands-on experiments, coding, and digital learning.',
    icon: Beaker,
    sections: [
      {
        title: 'Science Lab',
        blurb: 'Hands-on experiments and practical activities using modern apparatus and safety equipment to reinforce scientific concepts and inquiry-based learning.',
        highlights: [
          'Hands-on experiments and specimen study',
          'Safety equipment and clear safety protocols',
          'Lab manuals and experiment documentation',
          'Teacher-guided practical sessions and assessments'
        ],
      },
      {
        title: 'Computer Lab',
        blurb: 'Networked computer lab with modern PCs, reliable internet access, and educational software to support coding, digital literacy, and project-based learning.',
        highlights: [
          'Modern workstations with educational software',
          'Internet access for research and projects',
          'Coding and digital literacy curriculum support',
          'Supervised lab sessions and club activities'
        ],
      },
    ],
  },
  'sports-ground': {
    title: 'Sports Ground',
    blurb: 'Outdoor and indoor sports infrastructure to build fitness, teamwork, and grit.',
    icon: Dumbbell,
    highlights: [
      'Cricket, football, and athletics track',
      'Indoor badminton and table tennis zones',
      'Certified coaches and weekly PE blocks',
      'Yoga, fitness, and conditioning slots'
    ],
    sections: [
      {
        title: 'Outdoor Facilities',
        blurb: 'Large playing fields and running tracks for team sports and athletics.',
        highlights: ['Full-size football/cricket grounds', 'Athletics track and field equipment', 'Organised inter-school fixtures']
      },
      {
        title: 'Indoor & Training',
        blurb: 'Indoor courts and dedicated practice areas for coaching and skill development.',
        highlights: ['Badminton and table-tennis courts', 'Fitness and conditioning area', 'Professional coaching and drills']
      }
    ],
  },
  transportation: {
    title: 'Transportation',
    blurb: 'GPS-enabled buses, trained staff, and optimized routes for safe, on-time travel.',
    icon: Bus,
    highlights: [
      'GPS tracking with notified pickups/drop-offs',
      'Verified drivers and trained attendants',
      'First-aid kits and safety checks',
      'Route planning for punctuality'
    ],
    sections: [
      {
        title: 'Fleet & Routes',
        blurb: 'A modern fleet operating on planned routes with scheduled stops to ensure reliable transport.',
        highlights: ['GPS-enabled buses', 'Pre-planned safe routes', 'Regular vehicle maintenance']
      },
      {
        title: 'Safety & Supervision',
        blurb: 'Safety-first practices including trained attendants and emergency procedures.',
        highlights: ['Trained staff onboard', 'First-aid kits and emergency contact system', 'Driver background checks']
      }
    ],
  },
  library: {
    title: 'Library',
    blurb: 'A calm, well-lit space with print and digital collections that nurture daily reading.',
    icon: Library,
    highlights: [
      '5,000+ titles across genres and levels',
      'Digital subscriptions and periodicals',
      'Reading clubs and author interactions',
      'Research corners with guided access'
    ],
    sections: [
      {
        title: 'Collection & Resources',
        blurb: 'A curated collection of print and digital resources across age groups and subjects.',
        highlights: ['Reference and fiction collections', 'E-books and online journals', 'Study carrels and research support']
      },
      {
        title: 'Programs & Clubs',
        blurb: 'Regular reading clubs and author events to promote literacy and curiosity.',
        highlights: ['Storytime and book clubs', 'Research skills sessions', 'Author visits and reading challenges']
      }
    ],
  },
  'music-and-arts': {
    title: 'Music & Arts',
    blurb: 'Studios for music, dance, theater, and visual arts to grow creative confidence.',
    icon: Music,
    highlights: [
      'Keyboard, guitar, percussion, and vocal training',
      'Art studio for painting, sketching, and crafts',
      'Dance and theater practice rooms',
      'Showcase events and inter-school fests'
    ],
    sections: [
      {
        title: 'Music',
        blurb: 'Structured music lessons and ensemble practice to build skills and confidence.',
        highlights: ['Instrument tuition', 'Vocal coaching', 'School choir and bands']
      },
      {
        title: 'Arts & Performance',
        blurb: 'Art studios and performance spaces for visual arts, dance, and theater activities.',
        highlights: ['Art studio with materials', 'Dance rehearsal spaces', 'Theater productions and showcases']
      }
    ],
  },
  sports: {
    title: 'Sports',
    blurb: 'Team and individual sports programs that build fitness, discipline, and teamwork.',
    icon: Dumbbell,
    highlights: [
      'Football, Basketball, and Volleyball coaching',
      'Kho-Kho for agility and coordination',
      'Table Tennis for reflexes and focus',
      'Chess and Carrom for strategy and concentration'
    ],
    sections: [
      {
        title: 'Coaching & Training',
        blurb: 'Regular coaching sessions with structured skill progression and assessments.',
        highlights: ['Skill-focused coaching', 'Fitness and conditioning', 'Inter-school competitions']
      }
    ],
  },
  'traditional-arts': {
    title: 'Traditional Arts',
    blurb: 'Mind-body practices and classical arts that nurture balance, focus, and cultural roots.',
    icon: Music,
    highlights: [
      'Yoga and Meditation for mindfulness',
      'Karate and Silambam for discipline and self-defense',
      'Classical Dance to celebrate culture and expression',
      'Regular showcases and practice slots'
    ],
    sections: [
      {
        title: 'Practice & Curriculum',
        blurb: 'Regular classes that integrate traditional practices into the school routine.',
        highlights: ['Yoga and mindfulness', 'Classical dance instruction', 'Martial arts basics and safety']
      }
    ],
  },
};

export const FacilityDetailPage = () => {
  const { facilityId } = useParams();
  const facility = facilityData[facilityId];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [facilityId]);

  if (!facility) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-6 py-16">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-xl w-full text-center">
          <p className="text-2xl font-bold text-gray-800 mb-4">Facility not found</p>
          <p className="text-gray-600 mb-6">The facility you are looking for is unavailable.</p>
          <Link to="/facilities#facilities" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg">
            <ArrowLeft className="w-4 h-4" /> Back to Facilities
          </Link>
        </div>
      </div>
    );
  }

  const Icon = facility.icon || Sparkles;

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-10">
          <div className="flex items-center justify-between gap-3 mb-2 text-gray-800">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 text-blue-700">
              <Icon className="w-7 h-7" />
            </span>
            <div>
              <p className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-blue-600 mb-1">
                <MapPin className="w-4 h-4" /> Minervaa Vidhya Mandhir
              </p>
              <h1 className="text-3xl md:text-4xl font-bold">{facility.title}</h1>
            </div>
            <Link
              to="/facilities#facilities"
              aria-label="Close"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow hover:bg-gray-50"
            >
              <X className="w-5 h-5 text-gray-700" />
            </Link>
          </div>
          <p className="text-gray-700 text-lg md:text-xl max-w-4xl">{facility.blurb}</p>

          <div className="mt-6">
            {facilityId === 'smart-classrooms' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <img
                  src={encodeURI('/smart class/6E7A8936.JPG')}
                  alt="Smart classroom 1"
                  className="w-full h-56 md:h-64 object-cover rounded-2xl shadow-md"
                />
                <img
                  src={encodeURI('/smart class/6E7A8943.JPG')}
                  alt="Smart classroom 2"
                  className="w-full h-56 md:h-64 object-cover rounded-2xl shadow-md"
                />
              </div>
            )}

            {facilityId === 'science-labs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <img
                  src={encodeURI('/science and computer lab/6E7A8886.JPG')}
                  alt="Science lab 1"
                  className="w-full h-56 md:h-64 object-cover rounded-2xl shadow-md"
                />
                <img
                  src={encodeURI('/science and computer lab/science lab.jpg')}
                  alt="Science lab 2"
                  className="w-full h-56 md:h-64 object-cover rounded-2xl shadow-md"
                />
              </div>
            )}
            {facilityId === 'sports-ground' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <img
                  src={encodeURI('/sports ground/6E7A1176.JPG')}
                  alt="Sports ground 1"
                  className="w-full h-56 md:h-64 object-cover rounded-2xl shadow-md"
                />
                <img
                  src={encodeURI('/sports ground/6E7A1219.JPG')}
                  alt="Sports ground 2"
                  className="w-full h-56 md:h-64 object-cover rounded-2xl shadow-md"
                />
              </div>
            )}
            {facilityId === 'transportation' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <img
                  src={encodeURI('/transportation/6E7A9000.JPG')}
                  alt="Transport 1"
                  className="w-full h-56 md:h-64 object-cover rounded-2xl shadow-md"
                />
                <img
                  src={encodeURI('/transportation/6E7A9002.JPG')}
                  alt="Transport 2"
                  className="w-full h-56 md:h-64 object-cover rounded-2xl shadow-md"
                />
              </div>
            )}
            {facilityId === 'library' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <img
                  src={encodeURI('/library/6E7A8910.JPG')}
                  alt="Library 1"
                  className="w-full h-56 md:h-64 object-cover rounded-2xl shadow-md"
                />
                <img
                  src={encodeURI('/library/6E7A8915.JPG')}
                  alt="Library 2"
                  className="w-full h-56 md:h-64 object-cover rounded-2xl shadow-md"
                />
              </div>
            )}
            {facilityId === 'music-and-arts' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <img
                  src={encodeURI('/music and arts/23454881.JPG')}
                  alt="Music & Arts 1"
                  className="w-full h-56 md:h-64 object-cover rounded-2xl shadow-md"
                />
                <img
                  src={encodeURI('/music and arts/23455294.JPG')}
                  alt="Music & Arts 2"
                  className="w-full h-56 md:h-64 object-cover rounded-2xl shadow-md"
                />
              </div>
            )}
          </div>

        </div>
      </div>

      <div className="container mx-auto px-4 mt-6 md:mt-10 pb-12 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-blue-500">Facility details</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">What you can expect</h2>
            </div>
            <Link
              to="/facilities#facilities"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Facilities
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-gray-900">Facility Details</h3>
              </div>
              <div className="space-y-6 text-gray-700">
                {facility.sections && facility.sections.map((sec, sidx) => (
                  <div key={sidx}>
                    <h4 className="text-md font-semibold text-gray-900 mb-1">{sec.title}</h4>
                    <p className="mb-2">{sec.blurb}</p>
                    <ul className="space-y-2 list-disc list-inside">
                      {sec.highlights.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-bold text-gray-900">Access & Use</h3>
              </div>
              <ul className="space-y-2 text-gray-700 list-disc list-inside">
                <li>Guided access during scheduled periods.</li>
                <li>Extra slots for clubs, practice, and competitions.</li>
                <li>Safety and care guidelines shared with students.</li>
              </ul>
            </motion.div>
          </div>

          <div className="mt-8">
            <Link
              to="/contact#contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg"
            >
              <Sparkles className="w-5 h-5" /> Schedule a visit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
