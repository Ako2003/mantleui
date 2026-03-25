import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Tooltip } from "./Tooltip";

function renderTooltip(props: { delayMs?: number } = {}) {
  return render(
    <Tooltip delayMs={props.delayMs ?? 0}>
      <Tooltip.Trigger>
        <button type="button">Hover me</button>
      </Tooltip.Trigger>
      <Tooltip.Content side="top">Tooltip text</Tooltip.Content>
    </Tooltip>,
  );
}

describe("Tooltip", () => {
  describe("Rendering", () => {
    it("does not show tooltip by default", () => {
      renderTooltip();
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("shows on hover", async () => {
      const user = userEvent.setup();
      renderTooltip();

      await user.hover(screen.getByText("Hover me"));
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
      expect(screen.getByText("Tooltip text")).toBeInTheDocument();
    });

    it("hides on mouse leave", async () => {
      const user = userEvent.setup();
      renderTooltip();

      await user.hover(screen.getByText("Hover me"));
      expect(screen.getByRole("tooltip")).toBeInTheDocument();

      await user.unhover(screen.getByText("Hover me"));
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has role=tooltip", async () => {
      const user = userEvent.setup();
      renderTooltip();

      await user.hover(screen.getByText("Hover me"));
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    it("trigger has aria-describedby when open", async () => {
      const user = userEvent.setup();
      renderTooltip();

      await user.hover(screen.getByText("Hover me"));
      const trigger = screen
        .getByText("Hover me")
        .closest("[aria-describedby]");
      const tooltipId = screen.getByRole("tooltip").getAttribute("id") ?? "";
      expect(trigger).toHaveAttribute("aria-describedby", tooltipId);
    });
  });
});
