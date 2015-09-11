export default (dispatch, components, params) => {
  const beforeActions = components.reduce( (prev, current) => {
    return (current.beforeActions || [])
      .concat((current.WrappedComponent ? current.WrappedComponent.beforeActions : []) || [])
      .concat(prev)
  }, [])

  const promises = beforeActions.map(action => dispatch(action(params)))
  return Promise.all(promises)
}