import { render, screen } from '@testing-library/react';
import RecipeView from '../../src/pages/RecipeView';
import { RecipeProvider } from '../../src/context/RecipeContext';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

test('shows "Recipe not found" if ID is missing', () => {
  render(
    <BrowserRouter>
      <RecipeProvider>
        <RecipeView />
      </RecipeProvider>
    </BrowserRouter>
  );
  expect(screen.getByText(/Recipe not found/i)).toBeInTheDocument();
});
