import { forwardRef, useCallback, useEffect, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { useControllable } from "../../hooks";
import type { CardCarouselProps } from "./CardCarousel.types";
import "./CardCarousel.css";

/**
 * Carousel where the active card is centered and the previous/next cards peek
 * at the sides at a smaller scale and reduced opacity.
 */
export const CardCarousel = forwardRef<HTMLDivElement, CardCarouselProps>(
  function CardCarousel(
    {
      slides,
      value,
      defaultValue = 0,
      onValueChange,
      autoplay = false,
      interval = 3000,
      loop = true,
      peekScale = 0.85,
      peekOpacity = 0.6,
      peekDistance = 60,
      showArrows = false,
      prevIcon,
      nextIcon,
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

    const canPrev = loop || index > 0;
    const canNext = loop || index < count - 1;

    return (
      <div
        ref={ref}
        className={["mantle-cardcarousel", className].filter(Boolean).join(" ")}
        style={style}
        role="region"
        aria-roledescription="carousel"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {slides.map((slide, i) => {
          const offset = getOffset(i);
          const isActive = offset === 0;
          const isVisible = Math.abs(offset) <= 1;
          const x = `${offset * peekDistance}%`;
          const scale = isActive ? 1 : peekScale;
          const opacity = isVisible ? (isActive ? 1 : peekOpacity) : 0;
          const zIndex = 10 - Math.abs(offset);
          const position = isActive ? "active" : offset < 0 ? "prev" : "next";
          return (
            <motion.div
              key={i}
              className="mantle-cardcarousel-slide"
              data-position={position}
              role="group"
              aria-roledescription="slide"
              aria-label={`slide ${i + 1} of ${count}`}
              aria-hidden={!isActive}
              animate={{ x, scale, opacity, zIndex }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              style={{ pointerEvents: isVisible ? "auto" : "none" }}
              onClick={() => {
                if (!isActive) goTo(i);
              }}
            >
              {slide}
            </motion.div>
          );
        })}
        {showArrows && count > 1 && (
          <>
            <button
              type="button"
              className="mantle-cardcarousel-arrow"
              data-side="prev"
              aria-label="Previous slide"
              onClick={goPrev}
              disabled={!canPrev}
            >
              {prevIcon ?? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              )}
            </button>
            <button
              type="button"
              className="mantle-cardcarousel-arrow"
              data-side="next"
              aria-label="Next slide"
              onClick={goNext}
              disabled={!canNext}
            >
              {nextIcon ?? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              )}
            </button>
          </>
        )}
      </div>
    );
  },
);

CardCarousel.displayName = "CardCarousel";
