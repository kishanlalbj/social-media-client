import { render, screen } from '@testing-library/react';
import React from 'react';
import Header from '../';

describe('Header', () => {
  it('should render header', () => {
    render(<Header />);

    const text = screen.getByText(/Social Media/i);
    expect(text).toBeInTheDocument();
  });
});
