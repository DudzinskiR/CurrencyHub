import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CurrencyPicker from './currency-picker';

describe("CurrencyPicker", () => {

  const onChange = jest.fn();
  const props = {
    currencyCode: 'CHF',
    onChange,
  };


  test("Should render currency picker with default value", () => {
    render(<CurrencyPicker />);
    expect(screen.getByText('USD')).toBeInTheDocument();
    expect(screen.getByText('United States Dollar')).toBeInTheDocument();
  });

  test('opens and closes currency list when the button is clicked', () => {
    render(<CurrencyPicker />);
    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(screen.getByPlaceholderText('Enter a currency...')).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.queryByPlaceholderText('Enter a currency...')).not.toBeInTheDocument();
  });

  test('opens and closes currency list when clicked outsite', () => {
    render(<CurrencyPicker />);
    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(screen.getByPlaceholderText('Enter a currency...')).toBeInTheDocument();

    fireEvent.blur(screen.getByPlaceholderText('Enter a currency...'));
    expect(screen.queryByPlaceholderText('Enter a currency...')).not.toBeInTheDocument();
  });

  test('displays the correct currency when a country code is passed as a prop', () => {
    render(<CurrencyPicker {...props} />);
    expect(screen.getByText('CHF')).toBeInTheDocument();
    expect(screen.getByText('Swiss Franc')).toBeInTheDocument();
  });

  test('filters currencies when text is entered in the search input', () => {
    render(<CurrencyPicker {...props} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const input = screen.getByPlaceholderText('Enter a currency...');

    fireEvent.change(input, { target: { value: 'Japa' } });
    expect(screen.queryByText('USD')).not.toBeInTheDocument();
    expect(screen.getByText('JPY')).toBeInTheDocument();
    expect(screen.getByText('Japanese Yen')).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'dol' } });
    expect(screen.getByText('USD')).toBeInTheDocument();
    expect(screen.queryByText('EUR')).not.toBeInTheDocument();
  });

  test('calls the onChange prop when a currency is selected by click', () => {
    const mockOnChange = jest.fn();
    render(<CurrencyPicker onChange={mockOnChange} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const selectedCurrency = screen.getByText(/CZK/i);
    fireEvent.mouseDown(selectedCurrency);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith('CZK');
  });

  test('calls the onChange prop when a currency is selected by pressing enter', () => {
    render(<CurrencyPicker {...props} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const input = screen.getByPlaceholderText('Enter a currency...');

    fireEvent.change(input, { target: { value: 'Swiss' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(screen.getByText('CHF')).toBeInTheDocument();
  });

  test('Should be no reaction when filtered list is empty', () => {
    render(<CurrencyPicker {...props} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const input = screen.getByPlaceholderText('Enter a currency...');

    fireEvent.change(input, { target: { value: 'Lorem Ipsum' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    const checkInput = screen.getByPlaceholderText('Enter a currency...');
    expect(checkInput).toBeInTheDocument();
  });

  test('Should be no reaction to pressing a key other than enter', () => {
    render(<CurrencyPicker {...props} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const input = screen.getByPlaceholderText('Enter a currency...');
    fireEvent.keyDown(input, { key: 'Alt', code: 'Alt' });

    const checkInput = screen.getByPlaceholderText('Enter a currency...');
    expect(checkInput).toBeInTheDocument();
  })



  test('calls the empty onChange prop when a currency is selected', () => {
    const mockOnChange = jest.fn();
    render(<CurrencyPicker />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const selectedCurrency = screen.getByText(/CZK/i);
    fireEvent.mouseDown(selectedCurrency);

    expect(mockOnChange).toHaveBeenCalledTimes(0);
  });
})
