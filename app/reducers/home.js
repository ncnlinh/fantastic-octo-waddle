const initialState = {
  gameStart: 4,
  totalPot: 25,
  playerPot: 5,
  giftUrlLink: '',
  selection: -1,
}

export default function reducer (state = initialState, action) {
  if (!state.hydrated) {
    state = Object.assign({}, initialState, state, { hydrated: true })
  }

  switch (action.type) {
    case 'UPDATE_SELECTION':
      return {
        ...state, 
        selection: action.payload
      }
    case 'UPDATE_GIFT_URL':
      return {
        ...state,
        giftUrlLink: action.payload
      }
    case 'GAME_START':
      return {
        ...state,
        gameStart: (action.payload ? ++state.gameStart : --state.gameStart) % 5,
        selection: -1
      }
    default:
      return state
  }
}
