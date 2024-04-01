export default class GaragePage {
    _garagePageUrl = '/panel/garage'

    constructor(page) {
      this.page = page
    }

    get garagePageUrl() {
      return this._garagePageUrl
    }
  }