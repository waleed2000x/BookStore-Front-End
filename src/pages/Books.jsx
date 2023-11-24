import axios from "axios";
import { useEffect, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
export default function Books() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/books").then((res) => {
      setBooks(res.data.allBooks);
    });
  }, []);
  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

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
                <div className="id-copyclip">
                  <sup>{book._id}</sup>
                  <ContentCopyIcon
                    onClick={() => handleCopyToClipboard(book._id)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
