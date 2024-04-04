import BasePage from "../BasePage.js"
import RemoveAccountPopup from "./components/RemoveAccountPopup.js";

export default class SettingsPage extends BasePage {

    constructor(page) {
      super(page, '/panel/settings')
      this.removeMyAccountBtn = page.getByRole('button', {name: 'Remove my account'})
    }

    async openRemoveAccountPopup() {
        await this.removeMyAccountBtn.click()
        return new RemoveAccountPopup(this._page)
    }
    
  }