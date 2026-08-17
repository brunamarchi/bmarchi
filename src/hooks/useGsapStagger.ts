import { useEffect, type RefObject } from 'react';
import { getGsap } from '../lib/gsap';
import { useReducedMotion } from './useReducedMotion';

interface StaggerOptions {
  childSelector: string;
  stagger?: number;
  duration?: number;
  y?: number;
  scale?: number;
  start?: string;
}

export function useGsapStagger(
  containerRef: RefObject<HTMLElement | null>,
  { childSelector, stagger = 0.03, duration = 0.5, y = 12, scale, start = 'top 75%' }: StaggerOptions,
) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const children = container.querySelectorAll(childSelector);
    if (!children.length) return;

    if (reducedMotion) {
      children.forEach((child) => {
        (child as HTMLElement).style.opacity = '1';
        (child as HTMLElement).style.transform = 'none';
      });
      return;
    }

    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        children,
        { opacity: 0, y, ...(scale ? { scale } : {}) },
        {
          opacity: 1,
          y: 0,
          ...(scale ? { scale: 1 } : {}),
          duration,
          stagger,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start,
            toggleActions: 'play none none none',
          },
        },
      );
    }, container);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.trigger === container && st.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, childSelector]);
}
