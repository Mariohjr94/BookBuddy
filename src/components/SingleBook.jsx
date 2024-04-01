import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetBooksQuery } from "../API/api";

const SingleBook = ({ token }) => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetBooksQuery(id);
  const navigate = useNavigate();

  const checkout = async () => {
    const response = await fetch(
      `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          available: false,
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (!isLoading && !error && data) {
    }
  }, [data, error, isLoading]);

  const goBack = () => {
    navigate("/");
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching book details</p>;
  }

  const book = data.books.find((book) => book.id === parseInt(id, 10));

  if (!book) {
    return <p>Book not found</p>;
  }
  return (
    <div class="row row-cols-lg-3 row-cols-md-2 row-cols-sm-2  g-4 padding-top single-book">
      <div class="col">
        <div class="card">
          <img
            src={book.coverimage}
            alt={book.title}
            className="card-img-top"
          />
          <div class="card-body gap">
            <h5 class="card-title">{book.title}</h5>
            <p class="card-text">{book.author}</p>
            <p class="card-text">{book.description}</p>
            <button
              onClick={checkout}
              type="button"
              className="btn btn-secondary mt-auto align-self-start"
            >
              Check Out
            </button>
            <button
              onClick={goBack}
              type="button"
              className="btn btn-secondary mt-auto align-self-start"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
