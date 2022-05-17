import { useState, useEffect } from "react";
// Mui imports
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function App() {
  const [result, setResult] = useState("");
  // State for URL
  const [url, SetUrl] = useState("");

  // Handler for entering URL
  const HandleTextChange = (e) => {
    SetUrl(e.target.value);
  };

  // Function for posting URL
  const PostURL = async () => {
    // Create post to backend with data from url variable
    const resp = await fetch("/ShortenUrl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(url),
    });
    // Await our json results and set the result variable to display it
    const data = await resp.json();
    setResult(data.data);
  };

  // Function for getting URL
  const GetURL = async () => {
    // Create get to backend with data from url variable
    const resp = await fetch("/GetUrl", {
      // Needs to be post to attach body
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(url),
    });
    // Await our json results and set the result variable to display it
    const data = await resp.json();
    setResult(data.data);
  };
  // useEffect(() => {
  // }, []);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar postition>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              URL Shortener
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        paddingTop="100px"
        noValidate
        autoComplete="off"
      >
        <TextField
          id="url-entered"
          label="Enter a URL"
          variant="outlined"
          value={url}
          onChange={HandleTextChange}
        ></TextField>
        <TextField
          id="url-entered"
          label="Result"
          disabled={true}
          variant="outlined"
          value={result}
          //onChange={HandleTextChange}
        ></TextField>
        <br></br>
        <Button variant="contained" onClick={PostURL}>
          Shorten URL
        </Button>
        <Button variant="contained" onClick={GetURL}>
          Find Corresponding Long URL
        </Button>
      </Box>
    </>
  );
}

export default App;
