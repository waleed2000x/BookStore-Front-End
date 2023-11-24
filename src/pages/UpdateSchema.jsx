import * as Yup from "yup";

export const UpdateSchema = Yup.object({
  idee: Yup.string().required("ID is required!"),
  name: Yup.string().required("Name is required!").trim(),
  author: Yup.string().required("Author is required!").trim(),
  publishedYear: Yup.string().required("Published Year is required!"),
});
