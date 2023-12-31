import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries";
import { useState } from "react";
import BookDetails from "./BookDetails";

const BookList = () => {
  const [selected, setSelected] = useState(-1);
  const { loading, data } = useQuery(getBooksQuery);
  const displayBooks = () => {
    if (loading) {
      return <div>Loading books...</div>;
    } else {
      return data.books.map((book) => {
        return (
          <li key={book.id} onClick={(e) => setSelected(book.id)}>
            {book.name}
          </li>
        );
      });
    }
  };
  return (
    <div>
      <ul id="book-list">{displayBooks()}</ul>
      <BookDetails bookId={selected} />
    </div>
  );
};

export default BookList;
