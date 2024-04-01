export default class HomePage {

  constructor(page) {
    this.page = page
    this.signUpBtn = this.page.getByRole('button', {name: 'Sign up'})
  }

  async visitHomePage() {
    await this.page.goto('')
  }

  async openSignUpPopup() {
    await this.signUpBtn.click()
  }
}