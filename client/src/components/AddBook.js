import { useMutation, useQuery } from "@apollo/client";
import { addBookMutation, getAuthorsQuery, getBooksQuery } from "../queries";
import { useState } from "react";

const AddBook = () => {
  const [form, setForm] = useState({
    name: "",
    genre: "",
    authorId: undefined,
  });
  const { loading, data } = useQuery(getAuthorsQuery);
  const [mutateFunction] = useMutation(addBookMutation);
  const displayAuthors = () => {
    if (loading) {
      return <option disabled>Loading authors</option>;
    } else {
      return data.authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };
  const submitForm = (e) => {
    e.preventDefault();
    console.log(form);
    mutateFunction({
      variables: form,
      refetchQueries: [{ query: getBooksQuery }],
    });
    setForm({ name: "", genre: "", authorId: undefined });
  };
  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          value={form.genre}
          onChange={(e) => setForm({ ...form, genre: e.target.value })}
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select
          value={form.authorId}
          onChange={(e) => setForm({ ...form, authorId: e.target.value })}
        >
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBook;
