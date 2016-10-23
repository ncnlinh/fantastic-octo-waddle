const initialState = {
  gameStart: false
}

export default function auth (state = initialState, action) {
  if (!state.hydrated) {
    state = Object.assign({}, initialState, state, { hydrated: true })
  }
  switch (action.type) {
    case 'GAME_START':
      return {
        ...state,
        gameStart: true
      }
    default:
      return state
  }
}
