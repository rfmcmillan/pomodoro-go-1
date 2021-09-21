import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { lightGreen } from '@material-ui/core/colors';
import {
  Typography,
  FormControlLabel,
  Switch,
  Card,
  CardContent,
  CardActions,
  Chip,
  Button,
  TextField,
  Select,
  FormHelperText,
  FormControl,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { Paper } from '@material-ui/core';
import {
  getSites,
  addSite,
  deleteSite,
  updateBlocking,
} from '../store/blockSites';
import { setStoredBlackList, getStoredBlackList } from '../storage.js';

// material-ui style definitions
const LightGreenSwitch = withStyles({
  switchBase: {
    color: '#5061a9',
    '&$checked': {
      color: '#9a6781',
    },
    '&$checked + $track': {
      backgroundColor: '#9a6781',
    },
    '& + $track': {
      backgroundColor: '#e0e2e4',
      opacity: 1,
      border: 'none',
    },
  },
  checked: {},
  track: {},
})(Switch);

const LightGreenButton = withStyles((theme) => ({
  root: {
    color: 'white',
    backgroundColor: '#5061a9',
    '&:hover': {
      backgroundColor: '#9a6781',
    },
  },
}))(Button);

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: '5px',
  },
  form: {
    maxWidth: 600,
    marginTop: '10px',
    marginBottom: '5px',
    display: 'flex',
    justifyContent: 'space-around',
  },
  textfield: {
    width: 350,
    height: 55,
    marginRight: '10px',
  },
  button: {
    height: 55,
    marginRight: '30px',
    marginLeft: '10px',
  },
});
//

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

//Start of component
const BlockSites = (props) => {
  //states
  const [urlInput, setUrlInput] = useState({
    siteUrl: '',
    category: '',
  });
  const dispatch = useDispatch();
  //

  //style control
  const classes = useStyles();
  //

  //lifecycles
  useEffect(() => {
    props.getSites(props.auth.id);
  }, []);

  //user interactions > change state, dispatch to store
  const handleChange = (event) => {
    const siteId = event.target.name.slice(4);
    const toggleSite = props.blockedSites.filter((each) => each.id === siteId);

    chrome?.runtime?.sendMessage('kaghhmclljbnigfffgjhfbbbcpgenjoi', {
      message: 'toggle-block-or-not',
      toggleSite: toggleSite[0]?.siteUrl,
    });
    props.updateBlocking(props.auth.id, siteId);
  };

  const submitNewUrl = () => {
    getStoredBlackList().then((blackList) => {
      const newBlackList = [...blackList, urlInput.siteUrl];
      console.log('newBlackList:', newBlackList);
      setStoredBlackList(newBlackList);
    });
    props.addSite(urlInput, props.auth.id);
  };

  const deleteUrl = (urlToDelete, indexToDelete) => {
    console.log('indexToDelete:', indexToDelete);
    getStoredBlackList().then((blackList) => {
      blackList.splice(indexToDelete, 1);

      console.log('blackList after splice:', blackList);
      setStoredBlackList(blackList);
    });
    props.deleteSite(props.auth.id, urlToDelete);
  };

  const paperStyle = {
    padding: 20,
    width: 880,
    margin: '30px auto',
  };

  return (
    <Paper elevation={10} style={paperStyle}>
      {chrome.storage === undefined ? (
        <Alert severity="info">
          Turn on the extension for this feature to work fully 🤞🏻
        </Alert>
      ) : undefined}
      <br />
      <Typography variant="h5" gutterBottom>
        Add sites to block list
      </Typography>
      <form id="add-site" className={classes.form}>
        <TextField
          id="standard-helperText"
          value={urlInput.siteUrl}
          label="URL"
          className={classes.textfield}
          helperText="Enter URL to block"
          variant="outlined"
          onChange={(ev) =>
            setUrlInput({ ...urlInput, siteUrl: ev.target.value })
          }
          name="siteUrl"
        />
        <FormControl variant="outlined">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            name="category"
            value={urlInput.category}
            onChange={(ev) =>
              setUrlInput({ ...urlInput, category: ev.target.value })
            }
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'socialMedia'}>Social Media</MenuItem>
            <MenuItem value={'entertainment'}>Entertainment</MenuItem>
            <MenuItem value={'other'}>Other</MenuItem>
          </Select>
          <FormHelperText>Select a category</FormHelperText>
        </FormControl>
        <LightGreenButton
          variant="contained"
          startIcon={<AddIcon />}
          className={classes.button}
          onClick={submitNewUrl}
        >
          Add
        </LightGreenButton>
      </form>
      <Typography variant="h5" gutterBottom>
        Sites you already blocked
      </Typography>
      <div id="currBlocked">
        {props.blockedSites.length > 0 &&
          props.blockedSites.map((each, idx) => {
            return (
              <Card className={classes.root} key={each.id} variant="outlined">
                <CardContent>
                  <Typography variant="body1">
                    Site URL: {each.siteUrl}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Chip label={each.category} variant="outlined" />
                  <FormControlLabel
                    control={
                      <LightGreenSwitch
                        checked={each.blacklist?.blockingEnabled}
                        onChange={handleChange}
                        name={`item${each.id}`}
                      />
                    }
                    label="Blocked"
                  />
                  <LightGreenButton
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteUrl(each.id, idx)}
                  >
                    Delete
                  </LightGreenButton>
                </CardActions>
              </Card>
            );
          })}
      </div>
    </Paper>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    blockedSites: state.blockedSites,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSites: (userId) => {
      dispatch(getSites(userId));
    },
    addSite: (site, userId) => {
      dispatch(addSite(site, userId));
    },
    deleteSite: (userId, siteId) => {
      dispatch(deleteSite(userId, siteId));
    },
    updateBlocking: (userId, siteId) => {
      dispatch(updateBlocking(userId, siteId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockSites);
