import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '../';

describe('Button', () => {
  it('should display button', () => {
    const props = {
      backgroundColor: null,
      primary: false,
      size: 'medium',
      onClick: undefined,
      label: 'Test'
    };
    render(<Button {...props} />);
    let text = screen.getByText('Test');
    expect(text).toBeInTheDocument();
  });
});
