"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

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
  { label: "TimeField", href: "/components/time-field" },
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
] as const;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-slate-200 dark:border-zinc-800 lg:block">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-zinc-800">
          <Link href="/" className="text-lg font-bold">
            MantleUI
          </Link>
          <ThemeToggle />
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4">
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
    </aside>
  );
}
