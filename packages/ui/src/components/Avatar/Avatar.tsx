import { forwardRef } from "react";
import { resolveColor } from "../../utils";
import type { AvatarProps } from "./Avatar.types";
import "./Avatar.css";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts.at(0) ?? "";
  const last = parts.at(-1) ?? "";
  if (parts.length <= 1) {
    return first.charAt(0).toUpperCase();
  }
  return (first.charAt(0) + last.charAt(0)).toUpperCase();
}

/**
 * A user avatar with image or initials fallback.
 *
 * @example
 * ```tsx
 * <Avatar src="/photo.jpg" alt="Jane Doe" size="md" />
 * <Avatar name="Jane Doe" color="purple" size="lg" />
 * ```
 */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, alt, name, size = "md", color = "blue", className, ...rest },
  ref,
) {
  const { dataColor, colorStyle } = resolveColor(color);

  return (
    <span
      ref={ref}
      data-color={dataColor}
      style={colorStyle}
      role="img"
      aria-label={alt || name}
      className={["mantle-avatar", `mantle-avatar-${size}`, className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {src ? (
        <img
          className="mantle-avatar-image"
          src={src}
          alt={alt || name || ""}
        />
      ) : name ? (
        getInitials(name)
      ) : null}
    </span>
  );
});

Avatar.displayName = "Avatar";
