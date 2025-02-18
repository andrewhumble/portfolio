'use client';
import { motion, useInView } from 'framer-motion';
import * as React from 'react';
 
export default function TextFade({
  direction,
  children,
  className = '',
  staggerChildren = 0.1,
  duration = 3,
  distance = 100,
}: {
  direction: 'up' | 'down' | 'left' | 'right';
  children: React.ReactNode;
  className?: string;
  staggerChildren?: number;
  duration?: number;
  distance?: number;
}) {
  const FADE_DOWN = {
    show: { opacity: 1, x: 0, y: 0, transition: { duration, type: 'spring' } },
    hidden: { opacity: 0, y: direction === 'down' ? -distance : direction === 'up' ? distance: 0, x: direction === 'right' ? -distance : direction === 'left' ? distance : 0 },
  };
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'show' : ''}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerChildren,
          },
        },
      }}
      className={className}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? (
          <motion.div variants={FADE_DOWN}>{child}</motion.div>
        ) : (
          child
        )
      )}
    </motion.div>
  );
}
