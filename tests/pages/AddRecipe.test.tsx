// tests/pages/AddRecipe.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import AddRecipe from "../../src/pages/AddRecipe";
import { RecipeProvider } from "../../src/context/RecipeContext";
import { BrowserRouter } from "react-router-dom";
import React from "react";

describe("AddRecipe Page", () => {
  const setup = () =>
    render(
      <BrowserRouter>
        <RecipeProvider>
          <AddRecipe />
        </RecipeProvider>
      </BrowserRouter>
    );

  test("renders form inputs and labels", () => {
    setup();
    expect(screen.getByText(/Add New Recipe/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Image Path or URL/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Preparation Time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Cooking Time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Servings/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Directions/i)).toBeInTheDocument();
    expect(screen.getByText(/Nutritional Info/i)).toBeInTheDocument();
  });

  test("can add and remove ingredient inputs", () => {
    setup();
    const addBtn = screen.getByText(/Add Ingredient/i);
    fireEvent.click(addBtn);

    const nameInputs = screen.getAllByPlaceholderText(/Ingredient name/i);
    expect(nameInputs.length).toBeGreaterThan(1);

    const removeBtn = screen.getAllByText(/Remove/i)[0];
    fireEvent.click(removeBtn);

    const updatedNameInputs = screen.getAllByPlaceholderText(/Ingredient name/i);
    expect(updatedNameInputs.length).toBe(1);
  });

  test("shows error on empty form submit", () => {
    setup();
    fireEvent.click(screen.getByText(/Save Recipe/i));
    expect(screen.getByText(/Please fill in all required fields/i)).toBeInTheDocument();
  });

  test("shows error if prep, cook time or servings are <= 0", () => {
    setup();
    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: "Test Recipe" } });
    fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: "Test" } });
    fireEvent.change(screen.getByLabelText(/Directions/i), { target: { value: "Mix well" } });

    fireEvent.click(screen.getByText(/Save Recipe/i));
    expect(
      screen.getByText(/Preparation, cooking time, and servings must be greater than 0/i)
    ).toBeInTheDocument();
  });

  test("shows error if ingredient is missing required fields", () => {
    setup();
    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: "Test Recipe" } });
    fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: "Test" } });
    fireEvent.change(screen.getByLabelText(/Directions/i), { target: { value: "Boil" } });
    fireEvent.change(screen.getByLabelText(/Preparation Time/i), { target: { value: "10" } });
    fireEvent.change(screen.getByLabelText(/Cooking Time/i), { target: { value: "20" } });
    fireEvent.change(screen.getByLabelText(/Servings/i), { target: { value: "2" } });

    fireEvent.click(screen.getByText(/Save Recipe/i));
    expect(screen.getByText(/At least one valid ingredient is required/i)).toBeInTheDocument();
  });
});
