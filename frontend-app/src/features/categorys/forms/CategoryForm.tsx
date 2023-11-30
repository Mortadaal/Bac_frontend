import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Button, Form, Segment } from "semantic-ui-react";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

export default observer(function CategoryForm() {
  const { categoryStore } = useStore();
  const { createCategory, categoryLoading, selectedCategory } = categoryStore;

  const [message, setMessage] = useState("");
  const initialState = selectedCategory || {
    id: 0,
    categoryName: "",
  };
  const [categorys, setCategorys] = useState(initialState);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setCategorys({ ...categorys, [name]: value });
  }

  function handleSubmit() {
    createCategory(categorys)
      .then(() => {
        setMessage("Kategori oprettet !");
        setTimeout(() => setMessage(""), 5000);
      })
      .catch((error) => {
        setMessage(`Kunne ikke Oprette: ${error.message}`);
      });
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          name="categoryName"
          placeholder="Kategori Navn"
          label="Kategori Navn"
          value={categorys.categoryName}
          onChange={handleInputChange}
        />
        <Button.Group floated="right">
          <Button as={Link} to={"/menu"} type="button" content="Anullere" />
          <Button.Or />
          <Button
            loading={categoryLoading}
            positive
            type="submit"
            content="Opret"
          />
        </Button.Group>

        {message && <p>{message}</p>}
      </Form>
    </Segment>
  );
});
