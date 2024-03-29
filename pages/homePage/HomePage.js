export default class HomePage {

  constructor(page) {
    this.page = page
    this.getSignInButton = this.page.getByRole('button', {name: 'Sign In'})
  }

  async visitHomePage() {
    await this.page.goto('')
  }

  async openSignInPopup() {
    await this.getSignInButton.click()
  }
}