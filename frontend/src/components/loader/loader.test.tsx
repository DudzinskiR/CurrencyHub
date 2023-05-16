import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from './loader';

describe('Loader', () => {
  it('should render children', () => {
    render(
      <Loader>
        <div>test</div>
      </Loader>
    );
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('should render loading text when isLoading prop is true', () => {
    render(<Loader isLoading={true} />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('should render error text when isError prop is true', () => {
    render(<Loader isError={true} />);
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('should render error text when isError prop is true and isLoad prop is true', () => {
    render(<Loader isError={true} isLoading={true} />);
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('should not render loading or error text when isLoading and isError props are false', () => {
    render(<Loader />);
    expect(screen.queryByText('Loading')).toBeNull();
    expect(screen.queryByText('Error')).toBeNull();
  });
});