import axios from "axios";
import { useEffect, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [iconTogglers, setIconTogglers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/books").then((res) => {
      setBooks(res.data.allBooks);

      setIconTogglers(res.data.allBooks.map(() => true));
    });
  }, []);

  const handleCopyToClipboard = (text, index) => {
    setIconTogglers((prevTogglers) => {
      const newTogglers = [...prevTogglers];
      newTogglers[index] = false;
      return newTogglers;
    });

    setTimeout(() => {
      setIconTogglers((prevTogglers) => {
        const newTogglers = [...prevTogglers];
        newTogglers[index] = true;
        return newTogglers;
      });
    }, 1000);

    navigator.clipboard.writeText(text);
  };

  return (
    <div className="home-parent">
      <div className="book-list">
        <div className="books">
          {books.map((book, index) => {
            return (
              <div className="book-container" key={book._id}>
                <h1>{book.name}</h1>
                <p>{book.author}</p>
                <p>{book.publishedYear}</p>
                <div className="id-copyclip">
                  <sup>{book._id}</sup>
                  {iconTogglers[index] ? (
                    <ContentCopyIcon
                      onClick={() => handleCopyToClipboard(book._id, index)}
                    />
                  ) : (
                    <CheckCircleOutlineIcon />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
