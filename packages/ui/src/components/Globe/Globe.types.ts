import type { HTMLAttributes } from "react";

export interface GlobeMarker {
  /** Latitude in degrees (-90 to 90). */
  lat: number;
  /** Longitude in degrees (-180 to 180). */
  lng: number;
  /** Optional label for the marker. */
  label?: string;
  /** Marker color. Defaults to accent color. */
  color?: string;
  /** Marker size. Defaults to 0.02. */
  size?: number;
}

export interface GlobeArc {
  /** Start point latitude. */
  startLat: number;
  /** Start point longitude. */
  startLng: number;
  /** End point latitude. */
  endLat: number;
  /** End point longitude. */
  endLng: number;
  /** Arc color. Defaults to accent color. */
  color?: string;
}

export interface GlobeProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "color"
> {
  /** Globe size in pixels. Defaults to 400. */
  size?: number;
  /** Globe color. Defaults to "#3b82f6". */
  color?: string;
  /** Dot grid color. Defaults to "rgba(255,255,255,0.3)". */
  dotColor?: string;
  /** Background color. Defaults to "transparent". */
  backgroundColor?: string;
  /** Auto-rotate speed. Set to 0 to disable. Defaults to 0.5. */
  autoRotateSpeed?: number;
  /** Allow user interaction (drag to rotate). Defaults to true. */
  interactive?: boolean;
  /** Markers on the globe surface. */
  markers?: GlobeMarker[];
  /** Arcs connecting two points on the globe. */
  arcs?: GlobeArc[];
  /** Show country outlines on the globe. Defaults to false. */
  showCountries?: boolean;
  /** Country outline color. Defaults to "rgba(255,255,255,0.2)". */
  countryColor?: string;
  /** Country fill opacity (0-1). Defaults to 0. Set > 0 for filled landmasses. */
  countryFillOpacity?: number;
  /** Country fill color. Defaults to the accent color. */
  countryFillColor?: string;
}
