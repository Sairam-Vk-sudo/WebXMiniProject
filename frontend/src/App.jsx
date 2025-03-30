import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import RecipesPage from "./pages/RecipesPage";
import Dashboard from "./pages/Dashboard";
import AddRecipePage from "./pages/AddRecipePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path='/addrecipe' element={<AddRecipePage />}/>
      </Routes>
    </Router>
  );
}

export default App;
