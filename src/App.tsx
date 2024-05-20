import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MoviesPage } from "./components/movies-page/MoviesPage";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to={'/movies'} />} />
          <Route path='*' element={<div><h1>Page Not Found</h1></div>} />
          <Route path="/movies" element={<MoviesPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
