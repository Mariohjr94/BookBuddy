import booksApi, { useGetBooksQuery } from "../API/api";
import store from "../APP/store";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Books = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetBooksQuery();
  const [books, setBooks] = useState([]);

  const handleDetails = (booksId) => {
    navigate(`/books/${booksId}`);
  };
  useEffect(() => {
    if (data && data.data) {
      setBooks(data.data.books);
    }
  }, [data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>error fetching books</p>;
  }

  const allBooks = data.books;

  console.log(allBooks);
  return (
    <div className="container padding-top">
      <div className="row g-3">
        {allBooks.map((book) => (
          <div key={book.id} className="col-lg-4 col-md-6 col-sm-6 mb-4 sm-4">
            <div className="card h-100">
              <img
                src={book.coverimage}
                className="card-img-top object-fit-cover border rounded h-50"
                alt={book.title}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">Author: {book.author}</p>
                <button
                  onClick={() => handleDetails(book.id)}
                  type="button"
                  className="btn btn-secondary mt-auto align-self-start"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
