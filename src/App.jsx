import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [books, setBooks] = useState([]);
  //
  const [name, setName] = useState(String);
  const [author, setAuthor] = useState(String);
  const [publishedYear, setPublishedYear] = useState(Number);

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

  const HandleSubmit = (e) => {
    const data = {
      name,
      author,
      publishedYear,
    };
    axios
      .post("http://localhost:8000/books/", data)
      .then(() => {
        console.log("BOOK CREATED");
      })
      .catch((err) => console.log(err.response.data.Error));
    e.preventDefault();
  };
  return (
    <>
      <div>
        {books.map((book) => {
          return (
            <div
              style={{ border: "3px solid black", marginTop: "30px" }}
              key={book._id}
            >
              <p>{book.name}</p>
              <p>{book.author}</p>
              <p>{book.publishedYear}</p>
            </div>
          );
        })}
        <form onSubmit={HandleSubmit}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            type="text"
          />
          <input
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            type="number"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  );
}

export default App;
