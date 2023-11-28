import { Alert, AlertTitle, Card, CardContent } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";

export default function ImageUpload() {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(false);
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (isFileFormatValid(file)) {
      const objectURL = URL.createObjectURL(file);
      setImage(objectURL);
      setMessage("");
    } else {
      setImage(null);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
      setMessage(
        "Invalid file format. Please upload a png, webp, jpg, or jpeg file."
      );
    }
  }, []);

  const isFileFormatValid = (file) => {
    const validFormats = ["image/png", "image/webp", "image/jpeg", "image/jpg"];
    return validFormats.includes(file.type);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/png, image/webp, image/jpeg, image/jpg",
    onDrop,
  });

  const dropzoneSize = "80px";
  const imageSize = "80px";
  return (
    <div>
      {alert && (
        <Alert
          severity="error"
          style={{
            position: "absolute",
            top: "0px",
            left: "30%",
            right: "30%",
            zIndex: "3",
          }}
        >
          <AlertTitle>
            <b>Invalid File Format</b>
          </AlertTitle>
          Please upload a proper file (webp, png, jpg, jpeg)
        </Alert>
      )}
      <Card
        style={{
          backgroundColor: "rgba(0, 0, 0, 0)",
          width: "120px",
          height: "120px",
          borderRadius: "80%",
          marginBottom: "30px",
          border: "2px solid #000000",
        }}
      >
        <CardContent>
          <div
            {...getRootProps()}
            style={{
              border: "2px dashed transparent",
              borderRadius: "80%",
              textAlign: "center",
              padding: "0px",
              cursor: "pointer",
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: dropzoneSize,
              height: dropzoneSize,
            }}
          >
            <input {...getInputProps()} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "80%",
                overflow: "hidden",
                width: imageSize,
                height: imageSize,
              }}
            >
              {image ? (
                <img
                  src={image}
                  alt="Uploaded"
                  width={100}
                  height={100}
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <p style={{ fontSize: "8px", color: "black" }}>
                  {message ||
                    "Drag & drop an image here, or click to select one"}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
