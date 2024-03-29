export default class SettingsPage {
    _settingsPageUrl = '/panel/settings'

    constructor(page) {
      this.page = page
      this.getGaragePageUrl = this._settingsPageUrl
      this.getRemoveMyAccountBtn = page.getByRole('button', {name: 'Remove my account'})
    }

    async visitSettingsPage() {
        await this.page.goto(this.getGaragePageUrl)
    }

    async openRemoveAccountPopup() {
        await this.getRemoveMyAccountBtn.click()
    }
    
  }