import $ from 'jquery'

export default (opts) => {
  const classToToggle = `shake shake-constant shake-${opts.style}`
  $(opts.selector).toggleClass(classToToggle)
  setTimeout(() => {
    $(opts.selector).toggleClass(classToToggle)
  }, 300)
}
