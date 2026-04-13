import { forwardRef, useCallback, useEffect, type KeyboardEvent } from "react";
import { motion, type PanInfo } from "framer-motion";
import { useControllable } from "../../hooks";
import type { VerticalCarouselProps } from "./VerticalCarousel.types";
import "./VerticalCarousel.css";

/**
 * Carousel that slides vertically between items.
 */
export const VerticalCarousel = forwardRef<
  HTMLDivElement,
  VerticalCarouselProps
>(function VerticalCarousel(
  {
    slides,
    value,
    defaultValue = 0,
    onValueChange,
    autoplay = false,
    interval = 3000,
    loop = true,
    height = 400,
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

  const handleDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      const threshold = 50;
      if (info.offset.y < -threshold) goNext();
      else if (info.offset.y > threshold) goPrev();
    },
    [goNext, goPrev],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        goNext();
      }
    },
    [goPrev, goNext],
  );

  const canPrev = loop || index > 0;
  const canNext = loop || index < count - 1;

  return (
    <div
      ref={ref}
      className={["mantle-verticalcarousel", className]
        .filter(Boolean)
        .join(" ")}
      style={{ height, ...style }}
      role="region"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      <div className="mantle-verticalcarousel-viewport">
        <motion.div
          className="mantle-verticalcarousel-track"
          animate={{ y: `${-index * 100}%` }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="mantle-verticalcarousel-slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`slide ${i + 1} of ${count}`}
              aria-hidden={i !== index}
            >
              {slide}
            </div>
          ))}
        </motion.div>
        {count > 1 && (
          <>
            <button
              type="button"
              className="mantle-verticalcarousel-arrow"
              data-side="prev"
              aria-label="Previous slide"
              onClick={goPrev}
              disabled={!canPrev}
            >
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
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </button>
            <button
              type="button"
              className="mantle-verticalcarousel-arrow"
              data-side="next"
              aria-label="Next slide"
              onClick={goNext}
              disabled={!canNext}
            >
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
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </>
        )}
      </div>
      {count > 1 && (
        <div className="mantle-verticalcarousel-dots" role="tablist">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              className="mantle-verticalcarousel-dot"
              data-active={i === index}
              aria-label={`Go to slide ${i + 1}`}
              aria-selected={i === index}
              role="tab"
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
});

VerticalCarousel.displayName = "VerticalCarousel";
