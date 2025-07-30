'use client'

import React from 'react';
import Image from 'next/image';

interface CognizantLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
}

const CognizantLogo: React.FC<CognizantLogoProps> = ({ 
  className = '', 
  size = 'md',
  variant = 'light'
}) => {
  const sizes = {
    xs: { width: 100, height: 24 },
    sm: { width: 120, height: 30 },
    md: { width: 150, height: 40 },
    lg: { width: 200, height: 52 }
  };

  const currentSize = sizes[size];

  return (
    <div className={`inline-flex items-center ${className}`}>
      <Image
        src="/cognizant.jpg"
        alt="Cognizant Logo"
        width={currentSize.width}
        height={currentSize.height}
        className="object-contain"
        priority
      />
    </div>
  );
};

export default CognizantLogo; 