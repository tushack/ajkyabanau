import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Inputingredients from "./pages/input_ingredient ";
import SearchResults from "./pages/SearchResults";
import RecipeDetails from "./pages/RecipeDetails";
import About from "./pages/AboutUs";
import Contact from "./pages/Contact";
import BrowseCollections from "./pages/BrowseCollections";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/input-ingredient" element={<Inputingredients />} />
      <Route path="/search-results" element={<SearchResults />} />
      <Route path="/recipe/:id" element={<RecipeDetails />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/browse-collections" element={<BrowseCollections />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
    
    </Routes>
  );
}