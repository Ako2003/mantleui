import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DataField } from "./DataField";

describe("DataField", () => {
  it("renders label and value", () => {
    render(<DataField label="Name" value="John Doe" />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("applies vertical layout by default", () => {
    const { container } = render(<DataField label="Name" value="John Doe" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("mantle-dataFieldVertical");
  });

  it("applies horizontal layout when specified", () => {
    const { container } = render(
      <DataField label="Name" value="John Doe" orientation="horizontal" />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("mantle-dataFieldHorizontal");
  });

  it("renders ReactNode as value", () => {
    render(<DataField label="Status" value={<strong>Active</strong>} />);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <DataField label="Name" value="Test" className="custom" />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("custom");
  });
});
