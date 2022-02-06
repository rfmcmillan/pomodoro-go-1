import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import { getSites } from "../../store/blockSites";
import { createBlackList } from "../../store/blackList";
import { setStoredBlackList, getStoredBlackList } from "../../storage.js";

const useStyles = makeStyles({
  addButton: { height: 35, marginTop: 10 },
  button: {
    marginRight: "30px",
    marginLeft: "10px",
    color: "white",
    backgroundColor: "#5061a9",
    "&:hover": {
      backgroundColor: "#9a6781",
    },
  },
  form: {
    maxWidth: 600,
    marginTop: "10px",
    marginBottom: "5px",
    display: "flex",
    justifyContent: "space-around",
  },
  root: { padding: 20, width: 880, margin: "30px auto" },
  textfield: {
    width: 350,
    height: 55,
    marginRight: "10px",
  },
});

const CreateBlockedSite = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const blackList = useSelector((state) => state.blackList);
  const [urlInput, setUrlInput] = useState({
    siteUrl: "",
    category: "",
  });
  const [hasError, setHasError] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getSites(auth.id));
  }, [blackList]);

  const handleSelectChange = (event) => {
    setUrlInput({ ...urlInput, category: event.target.value });
  };

  const submitNewUrl = () => {
    setHasError(!urlInput.category);
    getStoredBlackList().then((blackList) => {
      const newBlackList = [...blackList, urlInput.siteUrl];
      setStoredBlackList(newBlackList);
    });
    dispatch(createBlackList(urlInput.siteUrl, urlInput.category, auth.id));
  };

  return (
    <form id="add-site" className={classes.form}>
      <TextField
        id="standard-helperText"
        value={urlInput.siteUrl}
        label="URL"
        className={classes.textfield}
        helperText="Enter URL to block"
        variant="outlined"
        onChange={(event) => {
          setUrlInput({ ...urlInput, siteUrl: event.target.value });
        }}
        name="siteUrl"
      />
      <FormControl
        className={classes.category}
        error={hasError}
        variant="outlined"
      >
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          label="Category"
          id="category"
          name="category"
          value={urlInput.category}
          onChange={(event) => {
            handleSelectChange(event);
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"socialMedia"}>Social Media</MenuItem>
          <MenuItem value={"entertainment"}>Entertainment</MenuItem>
          <MenuItem value={"other"}>Other</MenuItem>
        </Select>
        {hasError && <FormHelperText>Please select a category</FormHelperText>}
        {!hasError && <FormHelperText>Select a category</FormHelperText>}
      </FormControl>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        className={`${classes.button} ${classes.addButton}`}
        onClick={submitNewUrl}
      >
        Add
      </Button>
    </form>
  );
};

CreateBlockedSite.propTypes = {
  getSites: PropTypes.func,
  blockedSites: PropTypes.array,
};

export default CreateBlockedSite;
