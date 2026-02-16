import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { School, Beaker, Dumbbell, Bus, Library, Music, ArrowRight, Trophy, Leaf } from 'lucide-react';

export const FacilitiesSection = () => {
  const facilities = [
    {
      icon: School,
      title: 'Smart Classrooms',
      description: 'Interactive digital boards and modern teaching tools for engaging learning experiences.',
      color: 'from-blue-400 to-blue-600',
      slug: 'smart-classrooms',
    },
    {
      icon: Beaker,
      title: 'Science and Computer Lab',
      description: 'Well-equipped science and computer lab with modern apparatus, computers, and internet access for hands-on experiments, coding, and digital learning.',
      color: 'from-green-400 to-green-600',
      slug: 'science-labs',
    },
    {
      icon: Dumbbell,
      title: 'Sports Ground',
      description: 'Spacious playgrounds and sports facilities for physical development and teamwork.',
      color: 'from-orange-400 to-orange-600',
      slug: 'sports-ground',
    },
    {
      icon: Bus,
      title: 'Transportation',
      description: 'Safe and reliable school bus service covering all major areas of the city.',
      color: 'from-yellow-400 to-yellow-600',
      slug: 'transportation',
    },
    {
      icon: Library,
      title: 'Library',
      description: 'Extensive collection of books and digital resources to foster reading habits.',
      color: 'from-purple-400 to-purple-600',
      slug: 'library',
    },
    {
      icon: Music,
      title: 'Music & Arts',
      description: 'State-of-the-art music rooms and art studios for students to explore their creativity and develop their artistic talents.',
      color: 'from-pink-400 to-pink-600',
      features: ['Music Room', 'Art Studio', 'Dance Studio', 'Theater Program'],
      slug: 'music-and-arts',
    },
  ];

  const activities = [
    {
      icon: Trophy,
      title: 'Sports',
      color: 'from-orange-400 to-orange-600',
      items: ['Football', 'Basketball', 'Volleyball', 'Kho-Kho', 'Table Tennis', 'Chess', 'Carrom'],
      slug: 'sports',
    },
    {
      icon: Leaf,
      title: 'Traditional Arts',
      color: 'from-emerald-400 to-teal-500',
      items: ['Yoga', 'Meditation', 'Karate', 'Silambam', 'Classical Dance'],
      slug: 'traditional-arts',
    },
  ];

  return (
    <section id="facilities" className="py-20 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden scroll-mt-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 font-playful">
            <span className="gradient-text">World-Class Facilities</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Creating the perfect environment for learning, growth, and fun!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Link to={`/facilities/${facility.slug}`} className="block h-full">
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                  <motion.div
                    className={`inline-block p-6 rounded-2xl bg-gradient-to-br ${facility.color} mb-6`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <facility.icon className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">{facility.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{facility.description}</p>
                  <div className="mt-4 inline-flex items-center text-blue-600 font-semibold group-hover:text-purple-600 transition-colors">
                    <span>View details</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-4xl font-bold mb-4 font-playful">
            <span className="gradient-text">Extra Curricular Activities</span>
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Balanced development through sports and traditional arts that build discipline, focus, and teamwork.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
            >
              <Link to={`/facilities/${activity.slug}`} className="block h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${activity.color}`}>
                    <activity.icon className="w-7 h-7 text-white" />
                  </span>
                  <h4 className="text-2xl font-bold text-gray-800">{activity.title}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activity.items.map((item) => (
                    <motion.span
                      key={item}
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-semibold text-sm shadow-sm"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
                <div className="mt-4 inline-flex items-center text-blue-600 font-semibold group-hover:text-purple-600 transition-colors">
                  <span>View details</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
