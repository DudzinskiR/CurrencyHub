import { render, screen } from "@testing-library/react";
import HeaderBar from "./HeaderBar"

describe('HeaderBar', () => {
  it('should render header bar with text', () => {
    render(<HeaderBar />);

    expect(screen.getByText('Walutownik')).toBeInTheDocument();
  })
})