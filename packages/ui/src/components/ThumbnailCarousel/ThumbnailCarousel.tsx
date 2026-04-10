import { forwardRef, useCallback, useEffect, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useControllable } from "../../hooks";
import type { ThumbnailCarouselProps } from "./ThumbnailCarousel.types";
import "./ThumbnailCarousel.css";

/**
 * Carousel with a main image area and a scrollable thumbnail strip for
 * navigation.
 */
export const ThumbnailCarousel = forwardRef<
  HTMLDivElement,
  ThumbnailCarouselProps
>(function ThumbnailCarousel(
  {
    images,
    value,
    defaultValue = 0,
    onValueChange,
    autoplay = false,
    interval = 3000,
    loop = true,
    className,
    style,
    ...rest
  },
  ref,
) {
  const count = images.length;
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

  const active = images[index];

  return (
    <div
      ref={ref}
      className={["mantle-thumbnailcarousel", className]
        .filter(Boolean)
        .join(" ")}
      style={style}
      role="region"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      <div className="mantle-thumbnailcarousel-main">
        <AnimatePresence mode="wait" initial={false}>
          {active ? (
            <motion.img
              key={index}
              src={active.src}
              alt={active.alt ?? `slide ${index + 1} of ${count}`}
              aria-roledescription="slide"
              aria-label={`slide ${index + 1} of ${count}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />
          ) : null}
        </AnimatePresence>
      </div>
      <div className="mantle-thumbnailcarousel-strip" role="tablist">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            className="mantle-thumbnailcarousel-thumb"
            data-active={i === index}
            aria-label={`Go to slide ${i + 1}`}
            aria-selected={i === index}
            role="tab"
            onClick={() => goTo(i)}
          >
            <img src={img.src} alt={img.alt ?? ""} />
          </button>
        ))}
      </div>
    </div>
  );
});

ThumbnailCarousel.displayName = "ThumbnailCarousel";
