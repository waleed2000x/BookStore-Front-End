import { Route, Routes } from "react-router-dom";
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";
import DeleteBook from "./pages/DeleteBook";
import UpdateBook from "./pages/UpdateBook";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" Component={<Books />} />
        <Route path="/create-book" Component={<AddBook />} />
        <Route path="/delete-book" Component={<DeleteBook />} />
        <Route path="/update-book" Component={<UpdateBook />} />
      </Routes>
    </div>
  );
}
