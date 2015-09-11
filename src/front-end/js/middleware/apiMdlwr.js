function checkStatus(response) {
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

  return fetch('http://emmofret.home.dev' + payload, {
    headers: { 'Authorization': store.getState().application.token }
  })
    .then(checkStatus)
    .then( (response) => {
      next({
        type: SUCCESS,
        payload: response.json(),
        ...props
      })
    })
    .catch( (err) => {
      next({
        type: ERROR,
        error: err,
        ...props
      })
    })
}