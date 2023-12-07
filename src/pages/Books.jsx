import axios from "axios";
import { useEffect, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Button } from "@mui/material";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [iconTogglers, setIconTogglers] = useState([]);
  const [sort, setSort] = useState(false);
  const handleSort = () => {
    setSort(!sort);
  };
  useEffect(() => {
    const Link = "https://bookstore-xalj.onrender.com/books/";
    if (sort) {
      axios.get(`${Link}?sort=-publishedYear`).then((res) => {
        setBooks(res.data.allBooks);
      });
    } else {
      axios.get(`${Link}`).then((res) => {
        setBooks(res.data.allBooks);

        setIconTogglers(res.data.allBooks.map(() => true));
      });
    }
  }, [sort]);

  const handleCopyToClipboard = (text, index) => {
    setIconTogglers((prevTogglers) => {
      console.log(prevTogglers);
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
      <div className="access-menu">
        <Button
          onClick={handleSort}
          variant="contained"
          color={sort ? "success" : "secondary"}
        >
          {sort ? "Back to Orignal" : "Sort by Year"}
        </Button>
      </div>
      <div className="book-list">
        <div className="books">
          {books.map((book, index) => {
            return (
              <div className="book-container" key={book._id}>
                <img src={book.image} alt={book.name} />
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
