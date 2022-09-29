import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

describe('App', () => {
  it('should render app', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const text = screen.getByText(/Social Media/i);
    expect(text).toBeInTheDocument();
  });
});
