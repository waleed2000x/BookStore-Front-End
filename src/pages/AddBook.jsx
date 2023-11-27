import { Alert, AlertTitle, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { BookSchema } from "./BookSchema";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

export default function AddBook() {
  const [alert, setAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const iValues = {
    name: "",
    author: "",
    publishedYear: "",
  };

  const { values, errors, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: iValues,
    validationSchema: BookSchema,
    onSubmit: () => {
      axios
        .post("http://localhost:8000/books", values)
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
          }}
        >
          <AlertTitle>Encountered and Error!</AlertTitle>
          Kindly check the developers console for the error information.
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
          <AlertTitle>Book Added</AlertTitle>
          The Book has been added to the database
        </Alert>
      ) : null}
      <div className="center-container">
        <form onSubmit={handleSubmit}>
          <StyledTextField
            variant="outlined"
            placeholder="Book's Name"
            label="Book's Name"
            name="name"
            type="text"
            error={Boolean(errors.name)}
            color="success"
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
            color="success"
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
            color="success"
            type="number"
            error={Boolean(errors.publishedYear)}
            value={values.publishedYear}
            onChange={handleChange}
            helperText={errors?.publishedYear || " "}
          />
          <Button variant="contained" type="submit" color="success">
            Add Book!
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
