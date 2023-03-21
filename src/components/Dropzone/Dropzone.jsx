import React, { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FileContext } from "../../App";

const Item = styled(Paper)(({ theme }) => ({
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));

const darkTheme = createTheme({ palette: { mode: "dark" } });
// const lightTheme = createTheme({ palette: { mode: "light" } });

const MyDropzone = () => {
  const { fileState, setFileState } = useContext(FileContext);

  // Handles the dropped/selected file
  // FI: Add support for multiple files
  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      if (file != null) {
        setFileState(() => file);
      }
    });
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      {[darkTheme].map((theme) => (
        // eslint-disable-next-line react/jsx-key
        <ThemeProvider theme={theme}>
          <Box
            {...getRootProps()}
            display="flex"
            flexDirection="column"
            alignItems="stretch"
            padding={2}
            sx={{
              "&:hover": {
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            <Item>
              <input {...getInputProps()} />
              <Typography gutterBottom marginTop={2}>
                Drag &apos;n&apos; drop or click to select csv files
              </Typography>
            </Item>
          </Box>
        </ThemeProvider>
      ))}
    </>
  );
};

export default MyDropzone;
