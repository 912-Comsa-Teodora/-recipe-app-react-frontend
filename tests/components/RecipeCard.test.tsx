import { render, screen } from '@testing-library/react';
import RecipeCard from '../../src/components/RecipeCard';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

const recipe = {
  id: '1',
  title: 'Test Pancakes',
  category: 'Breakfast',
  image: 'test.jpg',
  preparationTime: 5,
  cookingTime: 10,
  servings: 2,
  ingredients: [],
  directions: 'Mix and cook.',
  nutritionalInfo: {
    calories: 600,
    proteins: 10,
    fats: 10,
    carbs: 10,
    fiber: 2,
  },
};

const calorieStats = {
  max: 600,
  min: 300,
  avg: 450,
};

const renderWithRouter = (ui: React.ReactElement) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);

test('renders recipe title', () => {
  renderWithRouter(
    <RecipeCard recipe={recipe} onDelete={() => {}} calorieStats={calorieStats} />
  );
  expect(screen.getByText(/Test Pancakes/i)).toBeInTheDocument();
});

test('highlights calorie count in red if max', () => {
  renderWithRouter(
    <RecipeCard recipe={recipe} onDelete={() => {}} calorieStats={calorieStats} />
  );
  const calorieText = screen.getByText(/Calories: 600/i);
  expect(calorieText).toHaveClass('text-red-500');
});
