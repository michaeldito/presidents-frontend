export default function dashboardReducer(state = {}, action) {
  if (action.type === "GET_USER_GAMES_PLAYED") {
    const { payload, user } = action;
    let { data } = payload.data;
    let newState = Object.assign({}, state);
    newState.gameHistory = {
      gamesPlayed: data
        .filter(game => user.gamesPlayed.find(id => id === game.id))
        .map(d => {
          const { players, ...rest } = d;
          return {
            ...rest,
            player: players.find(player => player.user._id === user._id)
          };
        })
    };
    let gameMonths = data
      .filter(game => user.gamesPlayed.find(id => id === game.id))
      .map(game => new Date(game.createdAt).getMonth());
    let lineChartData = [
      {
        name: "Jan",
        Games: 0
      },
      {
        name: "Feb",
        Games: 0
      },
      {
        name: "March",
        Games: 0
      },
      {
        name: "April",
        Games: 0
      },
      {
        name: "May",
        Games: 0
      },
      {
        name: "June",
        Games: 0
      },
      {
        name: "July",
        Games: 0
      },
      {
        name: "Aug",
        Games: 0
      },
      {
        name: "Sept",
        Games: 0
      },
      {
        name: "Oct",
        Games: 0
      },
      {
        name: "Nov",
        Games: 0
      },
      {
        name: "Dec",
        Games: 0
      }
    ];
    gameMonths.forEach(month => lineChartData[month].Games++);
    newState.lineChartData = lineChartData;
    return newState;
  } else if (action.type === "LOGOUT") {
    return {};
  }
  return state;
}
