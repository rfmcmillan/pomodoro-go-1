import { ContactsOutlined } from '@material-ui/icons';
import axios from 'axios';
import history from '../history';
import { createBlackList } from './blackList';

const GET_SITES = 'GET_SITES';
const ADD_SITE = 'ADD_SITE';
const DELETE_SITE = 'DELETE_SITE';

//get sites
export const getSites = (userId) => {
  return async (dispatch) => {
    try {
      const currentUser = (
        await axios.get(`${process.env.API_URL}/api/users/${userId}`)
      ).data;
      const blockedSites = currentUser.sites;
      dispatch(_getSites(blockedSites));
    } catch (err) {
      console.log(err);
    }
  };
};

const _getSites = (blockedSites) => {
  return {
    type: GET_SITES,
    blockedSites,
  };
};

//add new site
const _addSite = (blockedSite) => {
  return {
    type: ADD_SITE,
    blockedSite,
  };
};

export const addSite = (site, userId) => {
  return async (dispatch) => {
    try {
      const newSite = (
        await axios.post(`${process.env.API_URL}/api/sites`, {
          ...site,
          userId: userId,
        })
      ).data;
      const newBlackList = await axios.post(
        `${process.env.API_URL}/api/blackList`,
        {
          siteId: newSite.id,
          userId,
        }
      ).data;
      const { siteId, userId } = newBlackList;
      dispatch(_addSite(newSite));
      createBlackList(siteId, userId);
    } catch (err) {
      console.log(err);
    }
  };
};

//delete a site from a user
export const deleteSite = (userId, siteId) => {
  return async (dispatch) => {
    try {
      await axios.delete(
        `${process.env.API_URL}/api/sites/${userId}/${siteId}`
      );
      dispatch(getSites(userId));
    } catch (err) {
      console.log(err);
    }
  };
};

//update whether a site is de-blocked for the user temporarily
export const updateBlocking = (userId, siteId) => {
  return async (dispatch) => {
    try {
      await axios.put(
        `${process.env.API_URL}/api/blackList/${userId}/${siteId}`
      );
      dispatch(getSites(userId));
    } catch (err) {
      console.log(err);
    }
  };
};

const blockedSitesReducer = (state = [], action) => {
  if (action.type === GET_SITES) {
    return (state = action.blockedSites);
  }
  if (action.type === ADD_SITE) {
    return (state = [...state, action.blockedSite]);
  }
  return state;
};

export default blockedSitesReducer;
