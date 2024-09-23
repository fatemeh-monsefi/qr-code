"use client";

import { IconButton, List, ListItem, ListItemText, Box } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import QRCode from "qrcode";
import { useState } from "react";
import Image from "next/image";
import { deleteLink, editLink } from "@/utils/controllers";
import LinkEditModal from "./LinkEditModal";

export default function LinkList({ links }) {
  const [src, setSrc] = useState("");
  const [currentLink, setCurrentLink] = useState(null);
  const [open, setOpen] = useState(false);

  const handleDelete = async (id) => {
    await deleteLink(id);
    console.log(id);
  };

  const handleClickOpen = (link) => {
    setCurrentLink(link);
    setOpen(true);
  };

  const handleEdit = async (newLink) => {
    if (currentLink) {
      await editLink(currentLink.id, newLink);
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  function generateQrCode(url) {
    QRCode.toDataURL(url)
      .then((url) => {
        setSrc(url);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <List sx={{ my: "2rem", width: "55%", ml: "9rem" }}>
          {links?.map((link) => (
            <ListItem
              style={{
                border: "1px solid lightgray",
                marginBottom: "10px",
                borderRadius: "8px",
                maxWidth: "38.5rem",
              }}
              key={link.id}
            >
              <ListItemText
                sx={{
                  wordBreak: "break-word",
                }}
              >
                {link.link}
              </ListItemText>

              <IconButton
                onClick={() => handleClickOpen(link)}
                color="secondary"
                aria-label="edit"
                size="large"
              >
                <EditIcon />
              </IconButton>

              <IconButton
                onClick={() => handleDelete(link.id)}
                aria-label="delete"
                size="large"
              >
                <DeleteIcon />
              </IconButton>

              <IconButton
                onClick={() => {
                  generateQrCode(link.link);
                }}
                size="large"
              >
                <RemoveRedEyeIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
        {src ? (
          <Image
            src={src}
            width={280}
            height={280}
            alt="QR-code"
            style={{
              border: "1px solid lightgray",
              borderRadius: "10px",
              marginTop: "2.5rem",
              padding: "16px",
            }}
          />
        ) : (
          <div
            style={{
              border: "1px solid lightgray",
              borderRadius: "10px",
              marginTop: "2.5rem",
              padding: "16px",
              width: "280px",
              height: "280px",
            }}
          ></div>
        )}
      </Box>

      <LinkEditModal
        open={open}
        currentLink={currentLink}
        handleClose={handleClose}
        handleEdit={handleEdit}
      />
    </>
  );
}
