import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecipeList from "./pages/RecipeList";
import AddRecipe from "./pages/AddRecipe";
import EditRecipe from "./pages/EditRecipe";
import { RecipeProvider } from "./context/RecipeContext";
import RecipeView from "./pages/RecipeView";

function App() {
  return (
    <RecipeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/add" element={<AddRecipe />} />
          <Route path="/edit/:id" element={<EditRecipe />} />
          <Route path="/recipe/:id" element={<RecipeView />} />

        </Routes>
      </Router>
    </RecipeProvider>
  );
}

export default App;
