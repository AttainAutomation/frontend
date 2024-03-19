import React, { useState } from "react";
import {
  ThemeProvider,
  CssBaseline,
  createTheme,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function SimpleForm() {
  const [fileName, setFileName] = useState("");
  const [supplier, setSupplier] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };
  const handleFileClear = () => {
    setFileName("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const username = event.target.username.value;
    const password = event.target.password.value;
    const file = event.target.file.files[0];
    console.log(file);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("csv", file);

    fetch(`http://localhost/attain/${supplier}`, {
      method: "POST",
      body: formData,
    }).then((response) => {
      console.log(response);
    });
  };

  const handleSupplierChange = (event) => {
    setSupplier(event.target.value);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={styles.mainContent}>
        <Card sx={styles.card}>
          <CardContent>
            <Typography variant="h4" component="h2" sx={{ marginBottom: 2 }}>
              Attain FritoLay Ordering Automation
            </Typography>
            <p>
              (1) Submit this form
              <br />
              (2) JoshyTrain (AI Bot) will start adding items to cart
              <br />
              (3) You will be emailed a new csv, where you can review and submit
              the completed cart
            </p>
            <Box
              component="form"
              sx={styles.container}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <TextField
                id="email"
                type="email"
                label="Your Email"
                variant="outlined"
                sx={styles.textField}
              />
              <FormControl fullWidth>
                <InputLabel>Supplier</InputLabel>
                <Select
                  value={supplier}
                  onChange={handleSupplierChange}
                >
                  <MenuItem value={"fritolay"}>Frito Lay</MenuItem>
                  <MenuItem value={"kehe"}>KeHe</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id="username"
                type="username"
                label="Login Username"
                variant="outlined"
                sx={styles.textField}
              />
              <TextField
                id="password"
                type="password"
                label="Login Password"
                variant="outlined"
                sx={styles.textField}
              />
              <Button
                variant="outlined"
                component="label"
                sx={styles.uploadButton}
              >
                Upload CSV
                <input
                  type="file"
                  name="file"
                  hidden
                  accept=".csv"
                  onChange={handleFileChange}
                />
              </Button>
              {fileName && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {" "}
                  {/* Ensure this is set to 'flex' */}
                  <Typography sx={{ wordBreak: "break-all", marginRight: 1 }}>
                    {fileName}
                  </Typography>
                  <IconButton size="small" onClick={handleFileClear}>
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                </Box>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={styles.submitButton}
              >
                Submit
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
}

const styles = {
  mainContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "2rem",
  },
  card: {
    minWidth: 575,
    maxWidth: 900,
    margin: "auto",
    padding: "2rem",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  textField: {
    width: "100%",
  },
  uploadButton: {
    margin: "8px 0",
  },
  closeButton: {
    padding: "0",
  },
  submitButton: {
    width: "100%",
  },
};

export default SimpleForm;