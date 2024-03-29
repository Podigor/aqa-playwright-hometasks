export default class RemoveAccountPopup {

    constructor(page) {
      this.page = page
      this.getRemoveAccountPopup = page.locator('app-remove-account-modal')
      this.getRemoveBtn = this.getRemoveAccountPopup.getByRole('button', {name: 'Remove'})
    }

    async removeAccount() {
        await this.getRemoveBtn.click()
      }
  }