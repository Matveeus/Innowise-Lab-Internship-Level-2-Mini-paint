import React from 'react';
import { Dialog } from '@mui/material';

const ArtModal = ({
  open,
  setOpen,
  image,
  title,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  image: string;
  title: string;
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  console.log(image);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <img src={`${image}`} alt={title} />
    </Dialog>
  );
};

export default ArtModal;
