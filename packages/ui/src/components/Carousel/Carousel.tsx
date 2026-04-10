import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  type KeyboardEvent,
} from "react";
import { motion, type PanInfo } from "framer-motion";
import { useControllable } from "../../hooks";
import type { CarouselProps } from "./Carousel.types";
import "./Carousel.css";

/**
 * Classic horizontal carousel with arrows, dots, and drag-to-swipe.
 *
 * @example
 * ```tsx
 * <Carousel slides={[<Slide1 />, <Slide2 />]} autoplay />
 * ```
 */
export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  function Carousel(
    {
      slides,
      value,
      defaultValue = 0,
      onValueChange,
      autoplay = false,
      interval = 3000,
      loop = true,
      showArrows = true,
      showDots = true,
      gap = 0,
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

    const viewportRef = useRef<HTMLDivElement | null>(null);

    const goTo = useCallback(
      (next: number) => {
        if (count === 0) return;
        let target = next;
        if (loop) {
          target = ((next % count) + count) % count;
        } else {
          target = Math.max(0, Math.min(count - 1, next));
        }
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
        if (info.offset.x < -threshold) goNext();
        else if (info.offset.x > threshold) goPrev();
      },
      [goNext, goPrev],
    );

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

    const canPrev = loop || index > 0;
    const canNext = loop || index < count - 1;

    return (
      <div
        ref={ref}
        className={["mantle-carousel", className].filter(Boolean).join(" ")}
        style={style}
        role="region"
        aria-roledescription="carousel"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        <div ref={viewportRef} className="mantle-carousel-viewport">
          <motion.div
            className="mantle-carousel-track"
            style={{ gap: `${gap}px` }}
            animate={{ x: `calc(${-index * 100}% - ${index * gap}px)` }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                className="mantle-carousel-slide"
                role="group"
                aria-roledescription="slide"
                aria-label={`slide ${i + 1} of ${count}`}
                aria-hidden={i !== index}
              >
                {slide}
              </div>
            ))}
          </motion.div>
          {showArrows && count > 1 && (
            <>
              <button
                type="button"
                className="mantle-carousel-arrow"
                data-side="prev"
                aria-label="Previous slide"
                onClick={goPrev}
                disabled={!canPrev}
              >
                {"<"}
              </button>
              <button
                type="button"
                className="mantle-carousel-arrow"
                data-side="next"
                aria-label="Next slide"
                onClick={goNext}
                disabled={!canNext}
              >
                {">"}
              </button>
            </>
          )}
        </div>
        {showDots && count > 1 && (
          <div className="mantle-carousel-dots" role="tablist">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                className="mantle-carousel-dot"
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
  },
);

Carousel.displayName = "Carousel";
