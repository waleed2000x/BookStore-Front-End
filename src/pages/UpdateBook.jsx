import { Alert, AlertTitle, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import { UpdateSchema } from "./BookSchema";
import styled from "styled-components";

export default function UpdateBook() {
  const [alert, setAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const iValues = {
    idee: "",
    name: "",
    author: "",
    publishedYear: "",
  };

  const { values, errors, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: iValues,
    validationSchema: UpdateSchema,
    onSubmit: () => {
      let idee = values.idee;
      axios
        .patch(`http://localhost:8000/books/${idee}`, values)
        .then(() => {
          console.log("Book added");
          setAlert(true);
          setTimeout(() => {
            setAlert(false);
          }, 5000);
        })
        .catch((err) => {
          console.log(err.response);
          setErrorAlert(true);
          setTimeout(() => {
            setErrorAlert(false);
          }, 5000);
        });
      resetForm();
    },
  });
  return (
    <div className="create-parent">
      {errorAlert ? (
        <Alert
          severity="error"
          style={{
            position: "absolute",
            top: "100px",
            left: "50%",
            right: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            zIndex: "2",
          }}
        >
          <AlertTitle>Encountered and Error!</AlertTitle>
          Invalid ID provided.
        </Alert>
      ) : null}
      {alert ? (
        <Alert
          severity="success"
          style={{
            position: "absolute",
            top: "100px",
            left: "50%",
            right: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
          }}
        >
          <AlertTitle>Book Updated</AlertTitle>
          The Book has been updated at the database
        </Alert>
      ) : null}
      <div className="center-container">
        <form onSubmit={handleSubmit}>
          <StyledTextField
            variant="outlined"
            placeholder="ID of the document"
            label="ID"
            name="idee"
            type="text"
            error={Boolean(errors.idee)}
            value={values.idee}
            onChange={handleChange}
            helperText={errors?.idee || " "}
          />
          <StyledTextField
            variant="outlined"
            placeholder="Book's Name"
            label="Book's Name"
            name="name"
            type="text"
            error={Boolean(errors.name)}
            value={values.name}
            onChange={handleChange}
            helperText={errors?.name || " "}
          />
          <StyledTextField
            variant="outlined"
            label="Book's Aurthor"
            placeholder="Book's Aurthor"
            name="author"
            type="text"
            error={Boolean(errors.author)}
            value={values.author}
            onChange={handleChange}
            helperText={errors?.author || " "}
          />
          <StyledTextField
            variant="outlined"
            label="Publish Year"
            placeholder="Published in (Year)"
            name="publishedYear"
            type="number"
            error={Boolean(errors.publishedYear)}
            value={values.publishedYear}
            onChange={handleChange}
            helperText={errors?.publishedYear || " "}
          />
          <Button variant="contained" type="submit" color="primary">
            Update Book!
          </Button>
        </form>
      </div>
    </div>
  );
}
const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    color: black;
  }
  .MuiInputLabel-root {
    color: #000000;
  }
  .MuiOutlinedInput-notchedOutline {
    /* border-color: #000000; */
    border: 2px solid black;
  }
  margin: 50px 0px 0px 0px;
`;
