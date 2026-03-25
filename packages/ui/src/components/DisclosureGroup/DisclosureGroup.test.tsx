import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Disclosure } from "../Disclosure";
import { DisclosureGroup } from "./DisclosureGroup";

function renderGroup(props: { allowMultiple?: boolean } = {}) {
  return render(
    <DisclosureGroup allowMultiple={props.allowMultiple}>
      <Disclosure value="a">
        <Disclosure.Trigger>Section A</Disclosure.Trigger>
        <Disclosure.Content>Content A</Disclosure.Content>
      </Disclosure>
      <Disclosure value="b">
        <Disclosure.Trigger>Section B</Disclosure.Trigger>
        <Disclosure.Content>Content B</Disclosure.Content>
      </Disclosure>
      <Disclosure value="c">
        <Disclosure.Trigger>Section C</Disclosure.Trigger>
        <Disclosure.Content>Content C</Disclosure.Content>
      </Disclosure>
    </DisclosureGroup>,
  );
}

describe("DisclosureGroup", () => {
  describe("Single mode (default)", () => {
    it("only one disclosure open at a time", async () => {
      const user = userEvent.setup();
      renderGroup();

      await user.click(screen.getByRole("button", { name: /Section A/ }));
      expect(screen.getByText("Content A")).toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: /Section B/ }));
      expect(screen.queryByText("Content A")).not.toBeInTheDocument();
      expect(screen.getByText("Content B")).toBeInTheDocument();
    });

    it("can close an open disclosure", async () => {
      const user = userEvent.setup();
      renderGroup();

      await user.click(screen.getByRole("button", { name: /Section A/ }));
      expect(screen.getByText("Content A")).toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: /Section A/ }));
      expect(screen.queryByText("Content A")).not.toBeInTheDocument();
    });
  });

  describe("Multiple mode", () => {
    it("allows multiple disclosures open at once", async () => {
      const user = userEvent.setup();
      renderGroup({ allowMultiple: true });

      await user.click(screen.getByRole("button", { name: /Section A/ }));
      await user.click(screen.getByRole("button", { name: /Section B/ }));

      expect(screen.getByText("Content A")).toBeInTheDocument();
      expect(screen.getByText("Content B")).toBeInTheDocument();
    });
  });

  describe("Rendering", () => {
    it("renders all triggers", () => {
      renderGroup();
      expect(
        screen.getByRole("button", { name: /Section A/ }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Section B/ }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Section C/ }),
      ).toBeInTheDocument();
    });

    it("all disclosures start closed", () => {
      renderGroup();
      expect(screen.queryByText("Content A")).not.toBeInTheDocument();
      expect(screen.queryByText("Content B")).not.toBeInTheDocument();
      expect(screen.queryByText("Content C")).not.toBeInTheDocument();
    });
  });
});
