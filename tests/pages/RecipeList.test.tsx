import { render, screen } from '@testing-library/react';
import RecipeList from '../../src/pages/RecipeList';
import { RecipeProvider } from '../../src/context/RecipeContext';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

const renderPage = () =>
  render(
    <BrowserRouter>
      <RecipeProvider>
        <RecipeList />
      </RecipeProvider>
    </BrowserRouter>
  );

test('renders search bar', () => {
  renderPage();
  expect(screen.getByPlaceholderText(/Search recipes/i)).toBeInTheDocument();
});
