import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  Grid,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteSite } from "../../store/blockSites";
import { setStoredBlackList, getStoredBlackList } from "../../storage.js";

const useStyles = makeStyles({
  button: {
    marginRight: "30px",
    marginLeft: "10px",
    color: "white",
    backgroundColor: "#5061a9",
    "&:hover": {
      backgroundColor: "#9a6781",
    },
  },
  category: { width: 200 },
  root: {
    maxWidth: 400,
    margin: "5px",
  },
});

const BlockedSiteCard = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { site } = props;
  const classes = useStyles();

  const deleteUrl = (siteToDelete) => {
    getStoredBlackList().then((blackList) => {
      const filtered = blackList.filter((site) => {
        return site !== siteToDelete.siteUrl;
      });
      setStoredBlackList(filtered);
    });
    dispatch(deleteSite(auth.id, siteToDelete.id));
  };

  return (
    <Card className={classes.root} key={site.id} variant="outlined">
      <CardContent>
        <Typography variant="body1">Site URL: {site.siteUrl}</Typography>
      </CardContent>
      <CardActions>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Chip label={site.category} variant="outlined" />
          </Grid>
          <Grid item>
            <Button
              className={classes.button}
              variant="contained"
              startIcon={<DeleteIcon />}
              onClick={() => deleteUrl(site)}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

BlockedSiteCard.propTypes = {
  deleteSite: PropTypes.func,
  site: PropTypes.object,
};

export default BlockedSiteCard;
