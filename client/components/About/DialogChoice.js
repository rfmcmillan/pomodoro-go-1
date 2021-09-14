import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DialogChoice = () => {
  const [open, setOpen] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Just a quick note on our site-blocking feature...'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            In order for the site-blocking feature to work, you will have to
            install the Chrome extension. Please click the appropriate button
            below to download it.
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            If instead you would like to explore the user interface without the
            site-blocking feature enabled, please click the appropriate button
            below.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            href="/localhost:8080/webpack.config.js"
            download
            onClick={handleClose}
            color="primary"
          >
            Download Extension
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Explore Web App
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogChoice;
