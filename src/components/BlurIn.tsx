'use client';
import { motion, useInView } from 'framer-motion';
import * as React from 'react';
 
export const BlurIn = ({ children }: { children: React.ReactNode }) => {
  const ref = React.useRef(null);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? '' : { filter: 'blur(20px)', opacity: 0 }}
      animate={isInView && !prefersReducedMotion ? { filter: 'blur(0px)', opacity: 1 } : {}}
      transition={{ duration: 1.2 }}
    >
      {children}
    </motion.div>
  );
};

export default BlurIn;
