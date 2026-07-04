import { useEffect, useRef, useState } from "react";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function AnimateIn({ children, className = "", delay = 0, as: Tag = "div" }) {
  const ref = useRef(null);
  const reducedMotion = prefersReducedMotion();
  const [visible, setVisible] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const element = ref.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const motionClass = reducedMotion ? "" : "animate-on-scroll";
  const visibleClass = visible && !reducedMotion ? "is-visible" : reducedMotion ? "" : visible ? "is-visible" : "";

  return (
    <Tag
      ref={ref}
      className={`${motionClass} ${visibleClass} ${className}`.trim()}
      style={reducedMotion ? undefined : { transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
