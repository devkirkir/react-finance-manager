import HistoryNavigation from "./HistoryNavigation";
import { render, screen } from "@testing-library/react";
import { expect } from "vitest";

test("Testing history navigation", () => {
    render(<HistoryNavigation />);

    const linkText = screen.getByText(/HistoryNavigation/i);
    expect(linkText).toBeInTheDocument();
});
