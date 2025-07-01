import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import MovieDetail from "./pages/MovieDetail";
import Home from "./pages/Home";
import Tv from "./pages/Tv";
import Movies from "./pages/Movies";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/movieDetail" element={<MovieDetail />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tv" element={<Tv />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
