import axios from "axios"
import history from "../history"
import socketIOClient from "socket.io-client"

const ENDPOINT = process.env.API_URL
export const socket = socketIOClient(ENDPOINT)

const TOKEN = "token"

const SET_AUTH = "SET_AUTH"

const setAuth = (auth) => ({ type: SET_AUTH, auth })

export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get(`${process.env.API_URL}/auth/me`, {
      headers: {
        authorization: token,
      },
    })
    return dispatch(setAuth(res.data))
  }
}
export const authenticateGoogle =
  (data = {}) =>
  async (dispatch) => {
    try {
      const response = await axios.post("/auth/google", data, {
        headers: { authorization: data.tokenId },
      })
      window.localStorage.setItem("token", response.data.token)
      dispatch(me())
    } catch (error) {
      console.log(error)
    }
  }

export const authenticate =
  (username, email, password, method) => async (dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.API_URL}/auth/${method}`,
        method === "signup"
          ? { username, email, password }
          : { email, password }
      )
      window.localStorage.setItem(TOKEN, res.data.token)
      dispatch(me())
    } catch (authError) {
      return dispatch(setAuth({ error: authError }))
    }
  }

export const logout = () => {
  window.localStorage.removeItem(TOKEN)
  window.localStorage.removeItem("user")
  window.localStorage.removeItem("timerDone")
  history.push("/login")
  return {
    type: SET_AUTH,
    auth: {},
  }
}

export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      if (action.auth.id) {
        socket.emit("login", { userId: action.auth.id })
      } else {
        socket.emit("logout", { userId: state.id })
      }
      return action.auth
    default:
      return state
  }
}
