import { forwardRef, useEffect, useRef, useState } from "react";
import type { MarqueeProps } from "./Marquee.types";
import "./Marquee.css";

/**
 * Infinite horizontal scroll of children, looped seamlessly.
 *
 * @example
 * ```tsx
 * <Marquee speed={80} pauseOnHover>
 *   <Logo /> <Logo /> <Logo />
 * </Marquee>
 * ```
 */
export const Marquee = forwardRef<HTMLDivElement, MarqueeProps>(
  function Marquee(
    {
      children,
      speed = 50,
      direction = "left",
      pauseOnHover = true,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const groupRef = useRef<HTMLDivElement | null>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
      const node = groupRef.current;
      if (!node) return;
      const update = () => setWidth(node.scrollWidth);
      update();
      const observer = new ResizeObserver(update);
      observer.observe(node);
      return () => observer.disconnect();
    }, [children]);

    const duration = width > 0 ? width / speed : 20;
    const trackStyle = {
      "--mantle-marquee-distance": `${width}px`,
      "--mantle-marquee-duration": `${duration}s`,
    } as React.CSSProperties;

    return (
      <div
        ref={ref}
        className={["mantle-marquee", className].filter(Boolean).join(" ")}
        style={style}
        data-pause-on-hover={pauseOnHover}
        data-direction={direction}
        {...rest}
      >
        <div className="mantle-marquee-track" style={trackStyle}>
          <div ref={groupRef} className="mantle-marquee-group">
            {children}
          </div>
          <div className="mantle-marquee-group" aria-hidden="true">
            {children}
          </div>
        </div>
      </div>
    );
  },
);

Marquee.displayName = "Marquee";
