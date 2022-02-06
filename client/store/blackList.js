import axios from "axios"

const LOAD_BLACKLISTS = "LOAD_BLACKLISTS"
const UPDATE_BLACKLIST = "UPDATE_BLACKLIST"
const CREATE_BLACKLIST = "CREATE_BLACKLIST"

const loadBlackListsActionCreator = (blackLists) => {
  return {
    type: LOAD_BLACKLISTS,
    blackLists,
  }
}

const loadBlackLists = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${process.env.API_URL}/api/blackList`)
      const blackLists = response.data
      dispatch(loadBlackListsActionCreator(blackLists))
    } catch (error) {
      console.log(error)
    }
  }
}

const createBlackListActionCreator = (blackList) => {
  return {
    type: CREATE_BLACKLIST,
    blackList,
  }
}

const createBlackList = (siteUrl, category, userId) => {
  return async (dispatch) => {
    const response = await axios.get(`${process.env.API_URL}/api/sites`)
    const existingSites = response.data
    const foundSite = existingSites.find((site) => site.siteUrl === siteUrl)

    if (foundSite) {
      const response = await axios.post(
        `${process.env.API_URL}/api/blackList`,
        { siteId: foundSite.id, userId }
      )
      const blackList = response.data

      dispatch(createBlackListActionCreator(blackList))
    } else {
      const response = await axios.post(`${process.env.API_URL}/api/sites`, {
        siteUrl,
        category,
        userId,
      })
      const newSite = response.data.newSite
      const bLresponse = await axios.post(
        `${process.env.API_URL}/api/blackList`,
        { siteId: newSite.id, userId }
      )
      const blackList = bLresponse.data
      dispatch(createBlackListActionCreator(blackList))
    }
  }
}

const updateBlackListActionCreator = (blackList) => {
  return {
    type: UPDATE_BLACKLIST,
    blackList,
  }
}

const updateBlackList = (blackListId, blackListInfo) => {
  return async (dispatch) => {
    const response = await axios.put(
      `${process.env.API_URL}/api/blackList/${blackListId}`,
      blackListInfo
    )

    const { data } = response
    dispatch(updateBlackListActionCreator(data))
  }
}

const blackListReducer = (state = [], action) => {
  if (action.type === LOAD_BLACKLISTS) {
    state = action.blackLists
  }
  if (action.type === CREATE_BLACKLIST) {
    state = [...state, action.blackList]
  }
  if (action.type === UPDATE_BLACKLIST) {
    const blackLists = state.map((blackList) => {
      if (blackList.id === action.blackList.id) {
        return action.blackList
      }
      return blackList
    })
    state = blackLists
  }
  return state
}

export { loadBlackLists, createBlackList, updateBlackList, blackListReducer }
