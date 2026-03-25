import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SearchField } from "./SearchField";

describe("SearchField", () => {
  it("renders a searchbox", () => {
    render(<SearchField />);
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  it("shows clear button when has value", () => {
    render(<SearchField defaultValue="hello" />);
    expect(screen.getByLabelText("Clear search")).toBeInTheDocument();
  });

  it("does not show clear button when empty", () => {
    render(<SearchField />);
    expect(screen.queryByLabelText("Clear search")).not.toBeInTheDocument();
  });

  it("clears on clear button click", async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    const onValueChange = vi.fn();
    render(
      <SearchField
        defaultValue="hello"
        onValueChange={onValueChange}
        onClear={onClear}
      />,
    );

    await user.click(screen.getByLabelText("Clear search"));
    expect(onClear).toHaveBeenCalled();
    expect(onValueChange).toHaveBeenCalledWith("");
  });

  it("calls onValueChange when typing", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<SearchField onValueChange={onValueChange} />);

    await user.type(screen.getByRole("searchbox"), "a");
    expect(onValueChange).toHaveBeenCalledWith("a");
  });

  it("uses default placeholder", () => {
    render(<SearchField />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("uses custom placeholder", () => {
    render(<SearchField placeholder="Find users..." />);
    expect(screen.getByPlaceholderText("Find users...")).toBeInTheDocument();
  });
});
