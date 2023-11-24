import axios from "axios";
import { useEffect, useState } from "react";
export default function Books() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/books").then((res) => {
      setBooks(res.data.allBooks);
    });
  }, []);
  console.log(books);
  return (
    <div className="home-parent">
      <div className="book-list">
        <div className="books">
          {books.map((book) => {
            return (
              <div className="book-container" key={book._id}>
                <h1>{book.name}</h1>
                <p>{book.author}</p>
                <p>{book.publishedYear}</p>
                <sub>{book._id}</sub>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
