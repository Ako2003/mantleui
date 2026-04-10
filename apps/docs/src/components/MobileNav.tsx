"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { SearchDialog } from "./SearchDialog";

// Import the same navItems — extract to shared file would be cleaner
// but for now we'll duplicate the structure reference
const navItems = [
  { label: "Getting Started", href: "/" },
  { heading: "Form" },
  { label: "Input", href: "/components/input" },
  { label: "InputGroup", href: "/components/input-group" },
  { label: "InputOTP", href: "/components/input-otp" },
  { label: "Autocomplete", href: "/components/autocomplete" },
  { label: "ComboBox", href: "/components/combo-box" },
  { label: "Checkbox", href: "/components/checkbox" },
  { label: "CheckboxGroup", href: "/components/checkbox-group" },
  { label: "RadioGroup", href: "/components/radio-group" },
  { label: "Switch", href: "/components/switch" },
  { label: "Select", href: "/components/select" },
  { label: "MultiSelect", href: "/components/multi-select" },
  { label: "Toggle", href: "/components/toggle" },
  { label: "Slider", href: "/components/slider" },
  { label: "NumberField", href: "/components/number-field" },
  { label: "TextField", href: "/components/text-field" },
  { label: "TextArea", href: "/components/text-area" },
  { label: "SearchField", href: "/components/search-field" },
  { label: "TimeField", href: "/components/time-field" },
  { label: "Form", href: "/components/form" },
  { label: "Label", href: "/components/label" },
  { label: "Description", href: "/components/description" },
  { label: "ErrorMessage", href: "/components/error-message" },
  { label: "FieldError", href: "/components/field-error" },
  { label: "Fieldset", href: "/components/fieldset" },
  { heading: "Interactive" },
  { label: "Button", href: "/components/button" },
  { label: "ButtonGroup", href: "/components/button-group" },
  { label: "ToggleButton", href: "/components/toggle-button" },
  { label: "ToggleButtonGroup", href: "/components/toggle-button-group" },
  { label: "Accordion", href: "/components/accordion" },
  { label: "Tabs", href: "/components/tabs" },
  { label: "Popover", href: "/components/popover" },
  { label: "Tooltip", href: "/components/tooltip" },
  { label: "Dropdown", href: "/components/dropdown" },
  { label: "Modal", href: "/components/modal" },
  { label: "Drawer", href: "/components/drawer" },
  { label: "Disclosure", href: "/components/disclosure" },
  { label: "DisclosureGroup", href: "/components/disclosure-group" },
  { label: "DataTable", href: "/components/data-table" },
  { label: "ListBox", href: "/components/list-box" },
  { label: "Toolbar", href: "/components/toolbar" },
  { heading: "Feedback" },
  { label: "Badge", href: "/components/badge" },
  { label: "Alert", href: "/components/alert" },
  { label: "AlertDialog", href: "/components/alert-dialog" },
  { label: "Toast", href: "/components/toast" },
  { label: "ProgressBar", href: "/components/progress-bar" },
  { label: "ProgressCircle", href: "/components/progress-circle" },
  { label: "Spinner", href: "/components/spinner" },
  { label: "Skeleton", href: "/components/skeleton" },
  { label: "Meter", href: "/components/meter" },
  { heading: "Date & Time" },
  { label: "Calendar", href: "/components/calendar" },
  { label: "DatePicker", href: "/components/date-picker" },
  { label: "DateRangePicker", href: "/components/date-range-picker" },
  { label: "RadioCalendar", href: "/components/radio-calendar" },
  { heading: "Color" },
  { label: "ColorPicker", href: "/components/color-picker" },
  { label: "ColorArea", href: "/components/color-area" },
  { label: "ColorSlider", href: "/components/color-slider" },
  { label: "ColorField", href: "/components/color-field" },
  { label: "ColorSwatch", href: "/components/color-swatch" },
  { label: "ColorSwatchPicker", href: "/components/color-swatch-picker" },
  { heading: "Navigation" },
  { label: "Breadcrumb", href: "/components/breadcrumb" },
  { label: "Pagination", href: "/components/pagination" },
  { label: "Link", href: "/components/link" },
  { heading: "Layout" },
  { label: "Card", href: "/components/card" },
  { label: "Surface", href: "/components/surface" },
  { label: "Avatar", href: "/components/avatar" },
  { label: "Separator", href: "/components/separator" },
  { label: "ScrollShadow", href: "/components/scroll-shadow" },
  { heading: "Data Display" },
  { label: "DataField", href: "/components/data-field" },
  { label: "Chip", href: "/components/chip" },
  { label: "TagGroup", href: "/components/tag-group" },
  { label: "Kbd", href: "/components/kbd" },
  { heading: "Utility" },
  { label: "CloseButton", href: "/components/close-button" },
  { heading: "3D / Advanced" },
  { label: "Globe", href: "/components/globe" },
  { label: "ParticleField", href: "/components/particle-field" },
  { label: "Card3D", href: "/components/card-3d" },
  { label: "WaveField", href: "/components/wave-field" },
  { label: "Vortex", href: "/components/vortex" },
  { label: "DNAHelix", href: "/components/dna-helix" },
  { label: "MorphingSphere", href: "/components/morphing-sphere" },
  { label: "StarField", href: "/components/star-field" },
  { label: "Aurora", href: "/components/aurora" },
  { label: "GridPlane", href: "/components/grid-plane" },
  { heading: "Motion / Animation" },
  { label: "AnimatedCounter", href: "/components/animated-counter" },
  { label: "AnimatedList", href: "/components/animated-list" },
  { label: "SpotlightCard", href: "/components/spotlight-card" },
  { label: "MagneticButton", href: "/components/magnetic-button" },
  { label: "Marquee", href: "/components/marquee" },
  { label: "TypeWriter", href: "/components/type-writer" },
  { label: "BlurReveal", href: "/components/blur-reveal" },
  { label: "TextReveal", href: "/components/text-reveal" },
  { label: "HoverCard", href: "/components/hover-card" },
  { label: "PulseDot", href: "/components/pulse-dot" },
  { heading: "Carousels" },
  { label: "Carousel", href: "/components/carousel" },
  { label: "CardCarousel", href: "/components/card-carousel" },
  { label: "VerticalCarousel", href: "/components/vertical-carousel" },
  { label: "CoverflowCarousel", href: "/components/coverflow-carousel" },
  { label: "ParallaxCarousel", href: "/components/parallax-carousel" },
  { label: "ThumbnailCarousel", href: "/components/thumbnail-carousel" },
  { label: "FadeCarousel", href: "/components/fade-carousel" },
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Prevent scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Mobile header bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
          aria-label="Open navigation"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <Link href="/" className="text-lg font-bold">
          MantleUI
        </Link>
        <ThemeToggle />
      </header>

      {/* Overlay + Drawer */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
            }}
            role="button"
            tabIndex={-1}
            aria-label="Close navigation"
          />
          <div
            className="fixed inset-y-0 left-0 z-[9999] w-72 overflow-y-auto border-r border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 lg:hidden"
            style={{ animation: "mantle-slide-in-left 200ms ease-out" }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-zinc-800">
              <Link
                href="/"
                className="text-lg font-bold"
                onClick={() => setOpen(false)}
              >
                MantleUI
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                aria-label="Close navigation"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="px-4 pt-4">
              <SearchDialog />
            </div>

            <nav className="px-4 py-4">
              <ul className="space-y-1">
                {navItems.map((item, i) => {
                  if ("heading" in item) {
                    return (
                      <li
                        key={i}
                        className="px-2 pb-1 pt-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-white"
                      >
                        {item.heading}
                      </li>
                    );
                  }

                  const isActive = pathname === item.href;

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`block rounded-md px-2 py-1.5 text-sm transition-colors ${
                          isActive
                            ? "bg-slate-100 font-medium text-slate-900 dark:bg-zinc-800 dark:text-zinc-50"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
