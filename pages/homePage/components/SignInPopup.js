export default class SignInPopup {

  constructor(page) {
    this.page = page
    this.getSignInPopup = page.locator('app-signin-modal')
    this.getRegistrationBtn = this.getSignInPopup.getByRole('button', {name: 'Registration'})
  }

  async openRegistrationPopup() {
    await this.getRegistrationBtn.click()
  }
 }