import { render, screen } from '@testing-library/react';
import React from 'react';
import Header from './Header';

describe('Header', () => {
  it('should render header', () => {
    render(<Header />);

    const text = screen.getByText(/Header/i);
    expect(text).toBeInTheDocument();
  });
});
