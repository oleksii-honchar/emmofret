/* global fetch, __API_BASE_URL__ */
import _ from 'lodash'

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export default store => next => action => {
  if (!_.isObject(action.type)) return next(action)

  const { type, payload, ...props } = action
  const { REQUEST, SUCCESS, ERROR } = type

  next({ type: REQUEST, ...props })

  return fetch(__API_BASE_URL__ + payload, {
    headers: { 'Authorization': store.getState().application.token }
  })
    .then(checkStatus)
    .then((response) => response.json())
    .then((json) => {
      next({
        type: SUCCESS,
        payload: json,
        ...props
      })
    })
    .catch((err) => {
      next({
        type: ERROR,
        error: err,
        ...props
      })
    })
}
