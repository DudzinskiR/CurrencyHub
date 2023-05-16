import { render, screen } from "@testing-library/react";
import HeaderBar from "./header-bar"

describe('HeaderBar', () => {
  it('should render header bar with text', () => {
    render(<HeaderBar />);

    expect(screen.getByText('CurrencyHub')).toBeInTheDocument();
  })
})