const initialState = {
  gameStart: 0,
  totalPot: 25,
  playerPot: 0,
  giftUrlLink: '',
  selection: -1,
  amazon_card: '1234-1342-1432-1324'
}

export default function reducer (state = initialState, action) {
  if (!state.hydrated) {
    state = Object.assign({}, initialState, state, { hydrated: true })
  }

  switch (action.type) {
    case 'SET_DONATION':
      const total = Number(state.totalPot) + Number(action.payload);
      return {
        ...state, 
        totalPot: total,
        playerPot: total / 5,
      }
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
        gameStart: (action.payload ? ++state.gameStart : --state.gameStart) % 7,
        selection: -1
      }
    case 'GAME_END':
      return {
        ...state,
        gameStart: 6,
      }
    default:
      return state
  }
}
