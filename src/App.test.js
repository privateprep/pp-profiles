import { render, screen } from '@testing-library/react';
import App from './App';

test('renders fallback page as default', () => {
  render(<App />);
  const fallbackElement = screen.getByText(/reached the profile site/i);
  expect(fallbackElement).toBeInTheDocument();
});
