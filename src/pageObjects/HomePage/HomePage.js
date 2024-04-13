import BasePage from '../BasePage'
import SignUpPopup from '../HomePage/components/SignUpPopup'
import SignInPopup from '../HomePage/components/SignInPopup'

export default class HomePage extends BasePage {

  constructor(page) {
    super(page, '')
    this.signUpBtn = page.getByRole('button', {name: 'Sign up'})
    this.signInBtn = page.getByRole('button', {name: 'Sign In'})
  }

  async openSignUpPopup() {
    await this.signUpBtn.click()
    return new SignUpPopup(this._page)
  }
  async openSignInPopup() {
    await this.signInBtn.click()
    return new SignInPopup(this._page)
  }
}