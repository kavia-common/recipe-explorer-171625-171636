import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { StoreProvider } from './state/store';

test('renders header brand and navigation', () => {
  render(
    <BrowserRouter>
      <StoreProvider>
        <App />
      </StoreProvider>
    </BrowserRouter>
  );
  expect(screen.getByLabelText(/Recipe Explorer Home/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Switch to/i })).toBeInTheDocument();
});
