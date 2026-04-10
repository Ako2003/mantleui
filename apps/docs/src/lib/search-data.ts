export interface SearchItem {
  title: string;
  section?: string;
  href: string;
  category: string;
}

// Static search index — component pages + their sections
export const searchData: SearchItem[] = [
  // Form
  { title: "Input", href: "/components/input", category: "Form" },
  {
    title: "Basic",
    section: "Input",
    href: "/components/input#basic",
    category: "Form",
  },
  {
    title: "With Label",
    section: "Input",
    href: "/components/input#with-label",
    category: "Form",
  },
  {
    title: "With Error",
    section: "Input",
    href: "/components/input#with-error",
    category: "Form",
  },
  {
    title: "Sizes",
    section: "Input",
    href: "/components/input#sizes",
    category: "Form",
  },

  { title: "InputGroup", href: "/components/input-group", category: "Form" },
  { title: "InputOTP", href: "/components/input-otp", category: "Form" },
  { title: "Autocomplete", href: "/components/autocomplete", category: "Form" },
  { title: "ComboBox", href: "/components/combo-box", category: "Form" },
  { title: "Checkbox", href: "/components/checkbox", category: "Form" },
  {
    title: "CheckboxGroup",
    href: "/components/checkbox-group",
    category: "Form",
  },
  { title: "RadioGroup", href: "/components/radio-group", category: "Form" },
  { title: "Switch", href: "/components/switch", category: "Form" },
  { title: "Select", href: "/components/select", category: "Form" },
  { title: "MultiSelect", href: "/components/multi-select", category: "Form" },
  { title: "Toggle", href: "/components/toggle", category: "Form" },
  { title: "Slider", href: "/components/slider", category: "Form" },
  { title: "NumberField", href: "/components/number-field", category: "Form" },
  { title: "TextField", href: "/components/text-field", category: "Form" },
  { title: "TextArea", href: "/components/text-area", category: "Form" },
  { title: "SearchField", href: "/components/search-field", category: "Form" },
  { title: "TimeField", href: "/components/time-field", category: "Form" },
  { title: "Form", href: "/components/form", category: "Form" },
  { title: "Label", href: "/components/label", category: "Form" },
  { title: "Description", href: "/components/description", category: "Form" },
  {
    title: "ErrorMessage",
    href: "/components/error-message",
    category: "Form",
  },
  { title: "FieldError", href: "/components/field-error", category: "Form" },
  { title: "Fieldset", href: "/components/fieldset", category: "Form" },

  // Interactive
  { title: "Button", href: "/components/button", category: "Interactive" },
  {
    title: "Variants",
    section: "Button",
    href: "/components/button#variants",
    category: "Interactive",
  },
  {
    title: "Sizes",
    section: "Button",
    href: "/components/button#sizes",
    category: "Interactive",
  },
  {
    title: "Colors",
    section: "Button",
    href: "/components/button#colors",
    category: "Interactive",
  },
  {
    title: "Loading State",
    section: "Button",
    href: "/components/button#loading-state",
    category: "Interactive",
  },
  {
    title: "Polymorphic",
    section: "Button",
    href: "/components/button#polymorphic",
    category: "Interactive",
  },
  {
    title: "ButtonGroup",
    href: "/components/button-group",
    category: "Interactive",
  },
  {
    title: "ToggleButton",
    href: "/components/toggle-button",
    category: "Interactive",
  },
  {
    title: "ToggleButtonGroup",
    href: "/components/toggle-button-group",
    category: "Interactive",
  },
  {
    title: "Accordion",
    href: "/components/accordion",
    category: "Interactive",
  },
  { title: "Tabs", href: "/components/tabs", category: "Interactive" },
  { title: "Popover", href: "/components/popover", category: "Interactive" },
  { title: "Tooltip", href: "/components/tooltip", category: "Interactive" },
  { title: "Dropdown", href: "/components/dropdown", category: "Interactive" },
  { title: "Modal", href: "/components/modal", category: "Interactive" },
  { title: "Drawer", href: "/components/drawer", category: "Interactive" },
  {
    title: "Disclosure",
    href: "/components/disclosure",
    category: "Interactive",
  },
  {
    title: "DisclosureGroup",
    href: "/components/disclosure-group",
    category: "Interactive",
  },
  {
    title: "DataTable",
    href: "/components/data-table",
    category: "Interactive",
  },
  { title: "ListBox", href: "/components/list-box", category: "Interactive" },
  { title: "Toolbar", href: "/components/toolbar", category: "Interactive" },

  // Feedback
  { title: "Badge", href: "/components/badge", category: "Feedback" },
  { title: "Alert", href: "/components/alert", category: "Feedback" },
  {
    title: "AlertDialog",
    href: "/components/alert-dialog",
    category: "Feedback",
  },
  { title: "Toast", href: "/components/toast", category: "Feedback" },
  {
    title: "ProgressBar",
    href: "/components/progress-bar",
    category: "Feedback",
  },
  {
    title: "ProgressCircle",
    href: "/components/progress-circle",
    category: "Feedback",
  },
  { title: "Spinner", href: "/components/spinner", category: "Feedback" },
  { title: "Skeleton", href: "/components/skeleton", category: "Feedback" },
  { title: "Meter", href: "/components/meter", category: "Feedback" },

  // Date & Time
  { title: "Calendar", href: "/components/calendar", category: "Date & Time" },
  {
    title: "DatePicker",
    href: "/components/date-picker",
    category: "Date & Time",
  },
  {
    title: "DateRangePicker",
    href: "/components/date-range-picker",
    category: "Date & Time",
  },
  {
    title: "RadioCalendar",
    href: "/components/radio-calendar",
    category: "Date & Time",
  },

  // Color
  { title: "ColorPicker", href: "/components/color-picker", category: "Color" },
  { title: "ColorArea", href: "/components/color-area", category: "Color" },
  { title: "ColorSlider", href: "/components/color-slider", category: "Color" },
  { title: "ColorField", href: "/components/color-field", category: "Color" },
  { title: "ColorSwatch", href: "/components/color-swatch", category: "Color" },
  {
    title: "ColorSwatchPicker",
    href: "/components/color-swatch-picker",
    category: "Color",
  },

  // Navigation
  {
    title: "Breadcrumb",
    href: "/components/breadcrumb",
    category: "Navigation",
  },
  {
    title: "Pagination",
    href: "/components/pagination",
    category: "Navigation",
  },
  { title: "Link", href: "/components/link", category: "Navigation" },

  // Layout
  { title: "Card", href: "/components/card", category: "Layout" },
  { title: "Surface", href: "/components/surface", category: "Layout" },
  { title: "Avatar", href: "/components/avatar", category: "Layout" },
  { title: "Separator", href: "/components/separator", category: "Layout" },
  {
    title: "ScrollShadow",
    href: "/components/scroll-shadow",
    category: "Layout",
  },

  // Data Display
  {
    title: "DataField",
    href: "/components/data-field",
    category: "Data Display",
  },
  { title: "Chip", href: "/components/chip", category: "Data Display" },
  {
    title: "TagGroup",
    href: "/components/tag-group",
    category: "Data Display",
  },
  { title: "Kbd", href: "/components/kbd", category: "Data Display" },

  // Utility
  {
    title: "CloseButton",
    href: "/components/close-button",
    category: "Utility",
  },

  // 3D / Advanced
  { title: "Globe", href: "/components/globe", category: "3D / Advanced" },
  {
    title: "ParticleField",
    href: "/components/particle-field",
    category: "3D / Advanced",
  },
  { title: "Card3D", href: "/components/card-3d", category: "3D / Advanced" },
  {
    title: "WaveField",
    href: "/components/wave-field",
    category: "3D / Advanced",
  },
  { title: "Vortex", href: "/components/vortex", category: "3D / Advanced" },
  {
    title: "DNAHelix",
    href: "/components/dna-helix",
    category: "3D / Advanced",
  },
  {
    title: "MorphingSphere",
    href: "/components/morphing-sphere",
    category: "3D / Advanced",
  },
  {
    title: "StarField",
    href: "/components/star-field",
    category: "3D / Advanced",
  },
  { title: "Aurora", href: "/components/aurora", category: "3D / Advanced" },
  {
    title: "GridPlane",
    href: "/components/grid-plane",
    category: "3D / Advanced",
  },

  // Motion / Animation
  {
    title: "AnimatedCounter",
    href: "/components/animated-counter",
    category: "Motion / Animation",
  },
  {
    title: "AnimatedList",
    href: "/components/animated-list",
    category: "Motion / Animation",
  },
  {
    title: "SpotlightCard",
    href: "/components/spotlight-card",
    category: "Motion / Animation",
  },
  {
    title: "MagneticButton",
    href: "/components/magnetic-button",
    category: "Motion / Animation",
  },
  {
    title: "Marquee",
    href: "/components/marquee",
    category: "Motion / Animation",
  },
  {
    title: "TypeWriter",
    href: "/components/type-writer",
    category: "Motion / Animation",
  },
  {
    title: "BlurReveal",
    href: "/components/blur-reveal",
    category: "Motion / Animation",
  },
  {
    title: "TextReveal",
    href: "/components/text-reveal",
    category: "Motion / Animation",
  },
  {
    title: "HoverCard",
    href: "/components/hover-card",
    category: "Motion / Animation",
  },
  {
    title: "PulseDot",
    href: "/components/pulse-dot",
    category: "Motion / Animation",
  },
];
