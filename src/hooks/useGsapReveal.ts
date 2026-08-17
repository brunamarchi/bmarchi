import { useEffect, useRef, type RefObject } from 'react';
import { getGsap } from '../lib/gsap';
import { useReducedMotion } from './useReducedMotion';

interface RevealOptions {
  y?: number;
  duration?: number;
  delay?: number;
  trigger?: 'load' | 'scroll';
  start?: string;
}

export function useGsapReveal(
  ref: RefObject<HTMLElement | null>,
  { y = 32, duration = 0.8, delay = 0, trigger = 'load', start = 'top 80%' }: RevealOptions = {},
) {
  const reducedMotion = useReducedMotion();
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || done.current) return;

    if (reducedMotion) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      const tween = gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
          ...(trigger === 'scroll'
            ? {
                scrollTrigger: {
                  trigger: el,
                  start,
                  toggleActions: 'play none none none',
                },
              }
            : {}),
        },
      );
      return () => tween.kill();
    }, el);

    done.current = true;
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.trigger === el && st.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);
}
