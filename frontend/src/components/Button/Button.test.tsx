import { render, fireEvent, screen } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  it('should render button with given text', () => {
    const buttonText = 'Click me!';
    render(<Button text={buttonText} />);
    expect(screen.getByText(buttonText)).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});