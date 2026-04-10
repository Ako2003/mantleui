import type { HTMLAttributes, ReactNode } from "react";

export interface WorldMapData {
  /** ISO alpha-2 country code (e.g. "US", "GB") or numeric UN M49 code. */
  code: string;
  /** Value for this country (used for color intensity). */
  value: number;
  /** Optional label override. */
  label?: string;
}

export interface WorldMapProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "color"
> {
  /** Array of country data points. */
  data?: WorldMapData[];
  /** Base color for the choropleth scale. Defaults to "#3b82f6". */
  color?: string;
  /** Background color of countries with no data. Defaults to "#e2e8f0" (light) or "#27272a" (dark). */
  emptyColor?: string;
  /** Background color of the map container. Defaults to "transparent". */
  backgroundColor?: string;
  /** Border/stroke color for countries. Defaults to "white". */
  strokeColor?: string;
  /** Stroke width. Defaults to 0.5. */
  strokeWidth?: number;
  /** Whether to show a tooltip on hover. Defaults to true. */
  showTooltip?: boolean;
  /** Custom tooltip renderer. Receives the country data and name. */
  renderTooltip?: (data: WorldMapData | undefined, name: string) => ReactNode;
  /** Called when a country is clicked. */
  onCountryClick?: (code: string, name: string, data?: WorldMapData) => void;
  /** Height of the map. Defaults to 400. */
  height?: number | string;
  /** Legend position. Defaults to "bottom-left". Set to "none" to hide. */
  legend?: "bottom-left" | "bottom-right" | "top-left" | "top-right" | "none";
  /** Legend low label. Defaults to "Low". */
  legendLow?: string;
  /** Legend high label. Defaults to "High". */
  legendHigh?: string;
  /** Title text shown above the map. */
  title?: string;
  /** Subtitle text shown below the title. */
  subtitle?: string;
}
