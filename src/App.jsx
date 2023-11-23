import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  useEffect(() => {
    axios
      .get("http://localhost:8000/books/")
      .then((res) => {
        setBooks(res.data.allBooks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [books, setBooks] = useState([]);
  console.log(books);
  return (
    <>
      <div>
        {books.map((book) => {
          return (
            <div key={book.length}>
              <p>{book.name}</p>
              <p>{book.author}</p>
              <p>{book.publishedYear}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
