import zIndexConstants from '../constants/zIndexConstands.js'
import _ from 'lodash'

let commonOpts = {
  z_index: zIndexConstants.notify,
  animate: {
    enter: 'animated flipInX',
    exit: 'animated flipOutX'
  },
  placement: {
    from: 'top',
    align: 'center'
  }
}

export function error (body) {
  let msg = ''

  if(_.has(body, 'error')) { msg = body.error }
  if(_.has(body, 'message')) {
    msg = `<span class="label label-warning">${body.status}</span> ${body.message}`
  }
  else if (_.has(body, 'errors')) {
    if(_.isObject(body.errors)) {
      _.each(body.errors, (val, key) => {
        msg += `<span class="label label-warning">${key}</span> ${val.join('\n')}`
      })
    } else if(_.isArray(body.errors)) {
      msg = body.errors.join('\n')
    }
  }

  let opts = _.extend({
    type: 'danger',
    delay: 5000,
  }, commonOpts)

  $.notify({ message: msg }, opts)
}

export function success (msg) {
  let opts = _.extend({
    type: 'success',
    delay: 5000,
  }, commonOpts)

  $.notify({ message: msg }, opts)
}

export default {
  success: success,
  error: error
}

