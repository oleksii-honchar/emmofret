import _ from 'lodash'

export function test (state, action) {
  console.log('test reducer')
  return _.merge({}, state)
}