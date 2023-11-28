import { Alert, AlertTitle, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import { DeleteSchema } from "./BookSchema";
import styled from "styled-components";
export default function DeleteBook() {
  const [alert, setAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const iValues = {
    idee: "",
  };

  const { values, errors, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: iValues,
    validationSchema: DeleteSchema,
    onSubmit: () => {
      let idee = values.idee;
      axios
        .delete(`http://localhost:8000/books/${idee}`, values)
        .then(() => {
          console.log("Book Deleted");
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
          <AlertTitle>Book Deleted</AlertTitle>
          The Book has been deleted from the database
        </Alert>
      ) : null}
      <div className="center-container">
        <form
          onSubmit={handleSubmit}
          style={{
            maxHeight: "150px",
            minHeight: "150px",
          }}
        >
          <StyledTextField
            variant="outlined"
            placeholder="Book's ID"
            label="ID"
            name="idee"
            type="text"
            error={Boolean(errors.idee)}
            value={values.idee}
            onChange={handleChange}
            helperText={errors?.idee || " "}
          />
          <Button variant="contained" type="submit" color="error">
            Delete Book!
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
