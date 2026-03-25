import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Card } from "./Card";

describe("Card", () => {
  it("renders all compound parts", () => {
    render(
      <Card data-testid="card">
        <Card.Header data-testid="header">Header</Card.Header>
        <Card.Body data-testid="body">Body</Card.Body>
        <Card.Footer data-testid="footer">Footer</Card.Footer>
      </Card>,
    );

    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("body")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("applies correct class names", () => {
    render(
      <Card data-testid="card">
        <Card.Header data-testid="header">Header</Card.Header>
        <Card.Body data-testid="body">Body</Card.Body>
        <Card.Footer data-testid="footer">Footer</Card.Footer>
      </Card>,
    );

    expect(screen.getByTestId("card")).toHaveClass("mantle-card");
    expect(screen.getByTestId("header")).toHaveClass("mantle-card-header");
    expect(screen.getByTestId("body")).toHaveClass("mantle-card-body");
    expect(screen.getByTestId("footer")).toHaveClass("mantle-card-footer");
  });

  it("merges custom className", () => {
    render(
      <Card data-testid="card" className="custom">
        Content
      </Card>,
    );
    const card = screen.getByTestId("card");
    expect(card).toHaveClass("mantle-card");
    expect(card).toHaveClass("custom");
  });

  it("forwards ref on Card root", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Card ref={ref}>Content</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("forwards ref on Card.Header", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Card>
        <Card.Header ref={ref}>Header</Card.Header>
      </Card>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("forwards ref on Card.Body", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Card>
        <Card.Body ref={ref}>Body</Card.Body>
      </Card>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("forwards ref on Card.Footer", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Card>
        <Card.Footer ref={ref}>Footer</Card.Footer>
      </Card>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
