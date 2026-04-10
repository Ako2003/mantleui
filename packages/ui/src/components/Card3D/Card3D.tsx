import { forwardRef, useCallback, useRef, useState } from "react";
import type { Card3DProps } from "./Card3D.types";
import "./Card3D.css";

/**
 * A card with 3D perspective tilt that follows the mouse cursor.
 * Pure CSS/JS — does not require Three.js.
 *
 * @example
 * ```tsx
 * <Card3D>
 *   <h3>Hover me</h3>
 *   <p>I tilt in 3D!</p>
 * </Card3D>
 * ```
 */
export const Card3D = forwardRef<HTMLDivElement, Card3DProps>(function Card3D(
  {
    children,
    maxTilt = 15,
    perspective = 1000,
    resetSpeed = 400,
    hoverScale = 1.02,
    glare = true,
    maxGlare = 0.15,
    borderColor = "var(--mantle-color-border, #e2e8f0)",
    background = "var(--mantle-color-bg-subtle, #f8fafc)",
    borderRadius = 12,
    className,
    style,
    ...rest
  },
  ref,
) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg)");
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({
    opacity: 0,
  });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      setTransform(
        `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(${hoverScale})`,
      );

      if (glare) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        setGlareStyle({
          opacity: maxGlare,
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.4), transparent 60%)`,
        });
      }
    },
    [maxTilt, hoverScale, glare, maxGlare],
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setTransform("rotateX(0deg) rotateY(0deg) scale(1)");
    setGlareStyle({ opacity: 0 });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const radius =
    typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius;

  return (
    <div
      ref={(node) => {
        (cardRef as React.MutableRefObject<HTMLDivElement | null>).current =
          node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      className={["mantle-card3d", className].filter(Boolean).join(" ")}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        perspective: `${perspective}px`,
        ...style,
      }}
      {...rest}
    >
      <div
        className="mantle-card3d-inner"
        style={{
          transform,
          transition: isHovering
            ? "transform 50ms ease-out"
            : `transform ${resetSpeed}ms ease-out`,
          border: `1px solid ${borderColor}`,
          background,
          borderRadius: radius,
        }}
      >
        {children}
        {glare && (
          <div
            className="mantle-card3d-glare"
            style={{
              ...glareStyle,
              borderRadius: radius,
            }}
          />
        )}
      </div>
    </div>
  );
});

Card3D.displayName = "Card3D";
