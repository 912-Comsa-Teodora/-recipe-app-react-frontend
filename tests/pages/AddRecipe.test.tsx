import { render, screen } from '@testing-library/react';
import AddRecipe from '../../src/pages/AddRecipe';
import { RecipeProvider } from '../../src/context/RecipeContext';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

test('renders Add Recipe form', () => {
  render(
    <BrowserRouter>
      <RecipeProvider>
        <AddRecipe />
      </RecipeProvider>
    </BrowserRouter>
  );
  expect(screen.getByText(/Add New Recipe/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
});
