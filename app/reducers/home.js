const initialState = {
  gameStart: 0,
  totalPot: 25,
  playerPot: 5,
  giftUrlLink: '',
}

export default function reducer (state = initialState, action) {
  if (!state.hydrated) {
    state = Object.assign({}, initialState, state, { hydrated: true })
  }

  switch (action.type) {
    case 'UPDATE_GIFT_URL':
      return {
        ...state,
        giftUrlLink: action.payload
      }
    case 'GAME_START':
      return {
        ...state,
        gameStart: action.payload ? ++state.gameStart : --state.gameStart
      }
    default:
      return state
  }
}
