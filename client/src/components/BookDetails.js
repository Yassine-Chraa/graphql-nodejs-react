import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries";
import { useEffect, useState } from "react";

const BookDetails = ({ bookId }) => {
  const [book, setBook] = useState();
  const { data, loading } = useQuery(getBookQuery, {
    variables: { id: bookId },
  });

  const displayBookDetails = () => {
    if (data) {
      const book = data.book;
      return (
        <div>
          <h3>{book.name}</h3>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {book.author.books.map((item) => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No book selected...</div>;
    }
  };
  return <div id="book-details">{displayBookDetails()}</div>;
};
export default BookDetails;
