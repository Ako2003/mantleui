import { forwardRef } from "react";
import type {
  CardBodyProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
} from "./Card.types";
import "./Card.css";

/* --- Root --- */

const CardRoot = forwardRef<HTMLDivElement, CardProps>(function CardRoot(
  { className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={["mantle-card", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
});

/* --- Header --- */

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  function CardHeader({ className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={["mantle-card-header", className].filter(Boolean).join(" ")}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

/* --- Body --- */

const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(function CardBody(
  { className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={["mantle-card-body", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
});

/* --- Footer --- */

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  function CardFooter({ className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={["mantle-card-footer", className].filter(Boolean).join(" ")}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

/**
 * A card container with optional header, body, and footer using compound pattern.
 *
 * @example
 * ```tsx
 * <Card>
 *   <Card.Header>Title</Card.Header>
 *   <Card.Body>Content here</Card.Body>
 *   <Card.Footer>Actions</Card.Footer>
 * </Card>
 * ```
 */
export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});
