import React from 'react';
import { motion } from 'framer-motion';

export const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 30 + 10,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    color: ['bg-yellow-300', 'bg-blue-300', 'bg-pink-300', 'bg-green-300', 'bg-purple-300'][Math.floor(Math.random() * 5)],
    duration: Math.random() * 5 + 3
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${particle.color} opacity-20`}
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};
