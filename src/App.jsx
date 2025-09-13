import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Tv from "./pages/Tv";
import Movies from "./pages/Movies";
import Detail from "./pages/Detail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/:type/:id" element={<Detail />} />

            <Route path="/movies" element={<Movies />} />
            <Route path="/tv" element={<Tv />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
