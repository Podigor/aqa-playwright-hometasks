import BasePage from "../BasePage.js"

export default class ProfilePage extends BasePage {

    constructor(page) {
      super(page, '/panel/profile')
      this.profileName = page.locator('.profile_name')
    }
  }