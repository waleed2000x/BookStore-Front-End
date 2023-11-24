import { Route, Routes } from "react-router-dom";
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";
import DeleteBook from "./pages/DeleteBook";
import UpdateBook from "./pages/UpdateBook";
import Home from "./pages/Home";
import Appbar from "./components/Appbar";
import "./scss/index.css";

export default function App() {
  return (
    <div>
      <Appbar />
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/create-book" element={<AddBook />} />
        <Route path="/delete-book" element={<DeleteBook />} />
        <Route path="/update-book" element={<UpdateBook />} />
      </Routes>
      <Home />
    </div>
  );
}
