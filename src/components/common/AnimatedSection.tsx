import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = 600
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  const getTransformClass = () => {
    const baseTransform = {
      up: 'translate-y-8',
      down: '-translate-y-8',
      left: 'translate-x-8',
      right: '-translate-x-8'
    };
    return baseTransform[direction];
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all ease-out',
        !isVisible && `opacity-0 ${getTransformClass()}`,
        isVisible && 'opacity-100 translate-x-0 translate-y-0',
        className
      )}
      style={{
        transitionDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;