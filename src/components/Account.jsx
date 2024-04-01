import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const User = ({ token }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleReturn = async (id) => {
    try {
      const response = await fetch(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      userDetails();
      console.log(books);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  async function userDetails() {
    try {
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUser(data);
      console.log(user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    userDetails();
  }, [token]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  console.log(user);

  return (
    <div className="container" id="userDetails">
      <div className="row g-3">
        <h2>User: {user.firstname}</h2>
        {user.books.map((book) => (
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
                <p className="card-text">Description: {book.description}</p>
                <button
                  onClick={() => handleReturn(book.id)}
                  type="button"
                  className="btn btn-secondary mt-auto align-self-start"
                >
                  Return Book
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
