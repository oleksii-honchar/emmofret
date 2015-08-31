class Container {
  constructor () {
    this.nextRouterPath = null
  }

  set nextTransitionPath (nextRouterPath) {
    return this.nextRouterPath
  }

  get nextTransitionPath () {
    let nextPath = this.nextRouterPath
    this.nextRouterPath = null
    return nextPath
  }

}

export default new Container()