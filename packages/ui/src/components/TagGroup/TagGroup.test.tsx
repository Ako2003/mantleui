import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TagGroup } from "./TagGroup";

describe("TagGroup", () => {
  describe("Rendering", () => {
    it("renders a group with a label", () => {
      render(
        <TagGroup label="Skills">
          <TagGroup.Tag value="react">React</TagGroup.Tag>
          <TagGroup.Tag value="ts">TypeScript</TagGroup.Tag>
        </TagGroup>,
      );
      expect(screen.getByRole("group", { name: "Skills" })).toBeInTheDocument();
      expect(screen.getByText("Skills")).toBeInTheDocument();
    });

    it("renders tags with text content", () => {
      render(
        <TagGroup label="Tags">
          <TagGroup.Tag value="a">Alpha</TagGroup.Tag>
          <TagGroup.Tag value="b">Beta</TagGroup.Tag>
        </TagGroup>,
      );
      expect(screen.getByText("Alpha")).toBeInTheDocument();
      expect(screen.getByText("Beta")).toBeInTheDocument();
    });
  });

  describe("Remove button", () => {
    it("shows remove button when onRemove is provided", () => {
      render(
        <TagGroup label="Tags">
          <TagGroup.Tag value="a" onRemove={() => {}}>
            Alpha
          </TagGroup.Tag>
        </TagGroup>,
      );
      expect(
        screen.getByRole("button", { name: "Remove Alpha" }),
      ).toBeInTheDocument();
    });

    it("does not show remove button when onRemove is not provided", () => {
      render(
        <TagGroup label="Tags">
          <TagGroup.Tag value="a">Alpha</TagGroup.Tag>
        </TagGroup>,
      );
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("calls onRemove with the tag value when clicked", async () => {
      const user = userEvent.setup();
      const onRemove = vi.fn();
      render(
        <TagGroup label="Tags">
          <TagGroup.Tag value="react" onRemove={onRemove}>
            React
          </TagGroup.Tag>
          <TagGroup.Tag value="ts" onRemove={onRemove}>
            TypeScript
          </TagGroup.Tag>
        </TagGroup>,
      );

      await user.click(screen.getByRole("button", { name: "Remove React" }));
      expect(onRemove).toHaveBeenCalledWith("react");

      await user.click(
        screen.getByRole("button", { name: "Remove TypeScript" }),
      );
      expect(onRemove).toHaveBeenCalledWith("ts");
    });
  });

  describe("Custom className", () => {
    it("merges custom className on the root", () => {
      const { container } = render(
        <TagGroup label="Tags" className="custom-group">
          <TagGroup.Tag value="a">A</TagGroup.Tag>
        </TagGroup>,
      );
      const root = container.firstChild as HTMLElement;
      expect(root.className).toContain("mantle-taggroup");
      expect(root.className).toContain("custom-group");
    });
  });
});
