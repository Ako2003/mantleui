/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */
import { forwardRef, useCallback, useEffect, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { useControllable } from "../../hooks";
import type { CoverflowCarouselProps } from "./CoverflowCarousel.types";
import "./CoverflowCarousel.css";

/**
 * Apple-style 3D coverflow carousel. Side slides are rotated and scaled to
 * create a sense of depth.
 */
export const CoverflowCarousel = forwardRef<
  HTMLDivElement,
  CoverflowCarouselProps
>(function CoverflowCarousel(
  {
    slides,
    value,
    defaultValue = 0,
    onValueChange,
    autoplay = false,
    interval = 3000,
    loop = true,
    rotateAngle = 30,
    slideDistance = 150,
    className,
    style,
    ...rest
  },
  ref,
) {
  const count = slides.length;
  const [index, setIndex] = useControllable<number>({
    value,
    defaultValue,
    onChange: onValueChange,
  });

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return;
      let target = next;
      if (loop) target = ((next % count) + count) % count;
      else target = Math.max(0, Math.min(count - 1, next));
      setIndex(target);
    },
    [count, loop, setIndex],
  );

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    if (!autoplay || count <= 1) return;
    const id = window.setInterval(() => {
      setIndex((prev) => {
        const next = prev + 1;
        if (loop) return ((next % count) + count) % count;
        return Math.min(count - 1, next);
      });
    }, interval);
    return () => window.clearInterval(id);
  }, [autoplay, interval, count, loop, setIndex]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    },
    [goPrev, goNext],
  );

  const getOffset = (i: number) => {
    let diff = i - index;
    if (loop) {
      if (diff > count / 2) diff -= count;
      else if (diff < -count / 2) diff += count;
    }
    return diff;
  };

  return (
    <div
      ref={ref}
      className={["mantle-coverflowcarousel", className]
        .filter(Boolean)
        .join(" ")}
      style={style}
      role="region"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      <div className="mantle-coverflowcarousel-stage">
        {slides.map((slide, i) => {
          const offset = getOffset(i);
          const absOffset = Math.abs(offset);
          const isActive = offset === 0;
          const isVisible = absOffset <= 2;
          const x = offset * slideDistance;
          const rotateY = isActive
            ? 0
            : offset < 0
              ? rotateAngle
              : -rotateAngle;
          const scale = isActive ? 1 : Math.max(0.6, 1 - absOffset * 0.15);
          const opacity = isVisible
            ? isActive
              ? 1
              : 0.7 - absOffset * 0.2
            : 0;
          const zIndex = 10 - absOffset;
          return (
            <motion.div
              key={i}
              className="mantle-coverflowcarousel-slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`slide ${i + 1} of ${count}`}
              aria-hidden={!isActive}
              animate={{ x, rotateY, scale, opacity, zIndex }}
              transition={{ type: "spring", stiffness: 200, damping: 28 }}
              style={{ pointerEvents: isVisible ? "auto" : "none" }}
              onClick={() => {
                if (!isActive) goTo(i);
              }}
            >
              {slide}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
});

CoverflowCarousel.displayName = "CoverflowCarousel";
