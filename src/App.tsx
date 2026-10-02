import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { MealsProvider } from "./context/MealsContext";
import { FeedbackPage } from "./pages/FeedbackPage";
import { MealDetailPage } from "./pages/MealDetailPage";
import { MealFormPage } from "./pages/MealFormPage";
import { StatisticsPage } from "./pages/StatisticsPage";
import "./App.css";

function App() {
  return (
    <MealsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/meal/new" element={<MealFormPage />} />
          <Route path="/meal/:id" element={<MealDetailPage />} />
          <Route path="/meal/:id/edit" element={<MealFormPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </MealsProvider>
  );
}

export default App;
