import { Dispatcher } from 'flux'
import _ from 'lodash'

const dispatcher = new Dispatcher()

export function register (cb) {
  return dispatcher.register(cb)
}

export function waitFor (idx) {
  return dispatcher.waitFor(idx)
}

export function dispatch (opts) {
  if (process.env.NODE_ENV !== 'production') {
    let data = JSON.stringify(opts.data)
    console.log(`**[${opts.actionType}] ${ _.isUndefined(data) ? '' : data }`)
  }
  dispatcher.dispatch(opts)
}

export default {
  register: register,
  waitFor: waitFor,
  dispatch: dispatch
}
