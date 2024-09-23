"use client";

import { addLink } from "@/utils/controllers";
import { TextField, Button } from "@mui/material";
import { useState } from "react";

function LinkForm() {
  const [link, setLink] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if ((link && link.startsWith("http://")) || link.startsWith("https://")) {
      await addLink(link);
      setLink("");
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} style={{ marginLeft: "9rem" }}>
      <TextField
        value={link}
        onChange={(e) => setLink(e.target.value)}
        variant="outlined"
        size="large"
        sx={{ width: "30rem", minHeight: "5rem" }}
        placeholder="Please Enter Your Link"
        error={
          link?.length > 0 &&
          !link.startsWith("http://") &&
          !link.startsWith("https://")
        }
        helperText={
          link?.length > 0 &&
          !link.startsWith("http://") &&
          !link.startsWith("https://")
            ? "URL must start with http or https"
            : ""
        }
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{ height: "56px", marginLeft: "1rem" }}
        disabled={
          link?.length > 0 &&
          !link.startsWith("http://") &&
          !link.startsWith("https://")
        }
      >
        Add Link
      </Button>
    </form>
  );
}

export default LinkForm;
