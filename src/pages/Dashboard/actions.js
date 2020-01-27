import axios from "../../config/axios";
import { errorNotification } from "../../actions";

const _getUserGamesPlayed = async user => {
  const request = await axios.get(`/presidents`);

  return {
    type: "GET_USER_GAMES_PLAYED",
    payload: request,
    user
  };
};

export const getUserGamesPlayed = () => {
  return async (dispatch, getState) => {
    try {
      const user = getState().user;
      await dispatch(_getUserGamesPlayed(user));
    } catch (err) {
      dispatch(
        errorNotification("Unable to load visualizations", err.response.data)
      );
    }
  };
};
