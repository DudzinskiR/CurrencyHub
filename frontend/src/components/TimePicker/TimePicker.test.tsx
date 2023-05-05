import { render, fireEvent, screen } from '@testing-library/react';
import TimePicker from './TimePicker';

const mockLabels = ['Label1', 'Label2', 'Label3'];
const mockValue = 1;
const mockOnChange = jest.fn();

describe('TimePicker component', () => {
  it('should render buttons with correct labels', () => {
    render(<TimePicker labels={mockLabels} value={0} onChange={() => { }} />);
    mockLabels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('should highlight button with correct value', () => {
    render(<TimePicker labels={mockLabels} value={mockValue} onChange={() => { }} />);
    const selectedButton = screen.getAllByRole('button').find(div => div.innerHTML.includes(mockLabels[mockValue]));
    expect(selectedButton).toHaveClass('selected');
  });

  it('should call onChange with correct value when button clicked', () => {
    render(<TimePicker labels={mockLabels} value={0} onChange={mockOnChange} />);
    const clickedButton = screen.getByText(mockLabels[mockValue]);
    fireEvent.click(clickedButton);
    expect(mockOnChange).toHaveBeenCalledWith(mockValue);
  });
});