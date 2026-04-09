import { forwardRef, useCallback, useMemo, useState } from "react";
import countriesGeo from "./countries.json";
import { countryNames, isoToNumeric } from "./countryData";
import type { WorldMapData, WorldMapProps } from "./WorldMap.types";
import "./WorldMap.css";

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
}

function interpolateColor(color: string, ratio: number): string {
  const { r, g, b } = hexToRgb(color);
  // Interpolate from very light to full color
  const lr = Math.round(230 + (r - 230) * ratio);
  const lg = Math.round(235 + (g - 235) * ratio);
  const lb = Math.round(240 + (b - 240) * ratio);
  return `rgb(${lr},${lg},${lb})`;
}

/**
 * An interactive world map with choropleth coloring, tooltips, and click events.
 * Zero runtime dependencies — SVG paths are embedded.
 *
 * @example
 * ```tsx
 * <WorldMap
 *   data={[
 *     { code: "US", value: 1200 },
 *     { code: "GB", value: 800 },
 *     { code: "DE", value: 450 },
 *   ]}
 *   color="#3b82f6"
 *   title="Visitors by Country"
 * />
 * ```
 */
export const WorldMap = forwardRef<HTMLDivElement, WorldMapProps>(
  function WorldMap(
    {
      data = [],
      color = "#3b82f6",
      emptyColor = "#e2e8f0",
      backgroundColor = "transparent",
      strokeColor = "#fff",
      strokeWidth = 0.5,
      showTooltip = true,
      renderTooltip,
      onCountryClick,
      height = 400,
      legend = "bottom-left",
      legendLow = "Low",
      legendHigh = "High",
      title,
      subtitle,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const [hovered, setHovered] = useState<string | null>(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

    // Resolve ISO codes to numeric IDs and build lookup
    const dataMap = useMemo(() => {
      const map = new Map<string, WorldMapData>();
      for (const d of data) {
        const numericId = isoToNumeric[d.code] ?? d.code;
        map.set(numericId, d);
      }
      return map;
    }, [data]);

    const maxValue = useMemo(
      () => Math.max(...data.map((d) => d.value), 1),
      [data],
    );

    const getCountryColor = useCallback(
      (id: string) => {
        const d = dataMap.get(id);
        if (!d) return emptyColor;
        const ratio = Math.min(d.value / maxValue, 1);
        return interpolateColor(color, ratio);
      },
      [dataMap, maxValue, color, emptyColor],
    );

    const handleMouseMove = useCallback(
      (e: React.MouseEvent) => {
        if (!showTooltip) return;
        const rect = (e.currentTarget as HTMLElement)
          .closest(".mantle-worldmap")
          ?.getBoundingClientRect();
        if (rect) {
          setTooltipPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        }
      },
      [showTooltip],
    );

    const hoveredName = hovered ? (countryNames[hovered] ?? "Unknown") : "";
    const hoveredData = hovered ? dataMap.get(hovered) : undefined;

    const totalValue = useMemo(
      () => data.reduce((sum, d) => sum + d.value, 0),
      [data],
    );

    return (
      <div
        ref={ref}
        className={["mantle-worldmap", className].filter(Boolean).join(" ")}
        style={{
          height: typeof height === "number" ? `${height}px` : height,
          background: backgroundColor,
          ...style,
        }}
        onMouseMove={handleMouseMove}
        {...rest}
      >
        {/* Header */}
        {(title || subtitle) && (
          <div className="mantle-worldmap-header">
            <div>
              {title && <div className="mantle-worldmap-title">{title}</div>}
              {subtitle && (
                <div className="mantle-worldmap-subtitle">{subtitle}</div>
              )}
            </div>
            {data.length > 0 && (
              <div
                className="mantle-worldmap-total"
                style={{ borderColor: `${color}40`, color }}
              >
                {totalValue.toLocaleString()} total
              </div>
            )}
          </div>
        )}

        {/* SVG Map */}
        <svg
          viewBox="0 0 960 500"
          className="mantle-worldmap-svg"
          preserveAspectRatio="xMidYMid meet"
        >
          {(countriesGeo as Array<{ id: string; d: string }>).map((country, i) => (
            <path
              key={`${country.id}-${i}`}
              d={country.d}
              fill={
                hovered === country.id ? color : getCountryColor(country.id)
              }
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              className="mantle-worldmap-country"
              onMouseEnter={() => setHovered(country.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => {
                const name = countryNames[country.id] ?? "Unknown";
                onCountryClick?.(country.id, name, dataMap.get(country.id));
              }}
            />
          ))}
        </svg>

        {/* Tooltip */}
        {showTooltip && hovered && (
          <div
            className="mantle-worldmap-tooltip"
            style={{
              left: tooltipPos.x + 12,
              top: tooltipPos.y - 8,
            }}
          >
            {renderTooltip ? (
              renderTooltip(hoveredData, hoveredName)
            ) : (
              <>
                <div className="mantle-worldmap-tooltip-name">
                  {hoveredName}
                </div>
                {hoveredData && (
                  <div className="mantle-worldmap-tooltip-value">
                    {hoveredData.value.toLocaleString()}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Legend */}
        {legend !== "none" && data.length > 0 && (
          <div
            className={`mantle-worldmap-legend mantle-worldmap-legend-${legend}`}
          >
            <span className="mantle-worldmap-legend-label">{legendLow}</span>
            <div
              className="mantle-worldmap-legend-bar"
              style={{
                background: `linear-gradient(to right, ${interpolateColor(color, 0.1)}, ${interpolateColor(color, 0.4)}, ${interpolateColor(color, 0.7)}, ${color})`,
              }}
            />
            <span className="mantle-worldmap-legend-label">{legendHigh}</span>
          </div>
        )}
      </div>
    );
  },
);

WorldMap.displayName = "WorldMap";
