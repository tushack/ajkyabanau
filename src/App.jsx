import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Inputingredients from "./pages/input_ingredient ";
import SearchResults from "./pages/SearchResults";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/input-ingredient" element={<Inputingredients />} />
      <Route path="/search-results" element={<SearchResults />} />
    </Routes>
  );
}