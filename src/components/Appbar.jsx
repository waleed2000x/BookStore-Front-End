import { Link } from "react-router-dom";

export default function Appbar() {
  return (
    <div className="appbar">
      <div className="logo">
        <h1>Book Store</h1>
      </div>
      <div className="nav-items">
        <Link to="/">Books</Link>
        <Link to="/create-book">Add a Book</Link>
        <Link to="/delete-book">Delete a Book</Link>
        <Link to="/update-book">Update a Book</Link>
      </div>
    </div>
  );
}
