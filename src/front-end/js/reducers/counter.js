import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../constants/CounterConstants.js'

const initialState = 108

export default function counter(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state + 1
    case DECREMENT_COUNTER:
      return state - 1
    default:
      return state
  }
}
