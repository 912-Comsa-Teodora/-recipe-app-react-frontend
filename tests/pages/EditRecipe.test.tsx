import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { RecipeProvider } from "../../src/context/RecipeContext";
import EditRecipe from "../../src/pages/EditRecipe";
import React from "react";

test("renders Edit Recipe if recipe exists", () => {
  render(
    <MemoryRouter initialEntries={["/edit/1"]}>
      <RecipeProvider>
        <Routes>
          <Route path="/edit/:id" element={<EditRecipe />} />
        </Routes>
      </RecipeProvider>
    </MemoryRouter>
  );

  expect(screen.getByText(/Edit Recipe/i)).toBeInTheDocument();
});
