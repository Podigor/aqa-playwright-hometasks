import BasePage from '../BasePage'
import SignUpPopup from '../HomePage/components/SignUpPopup'

export default class HomePage extends BasePage {

  constructor(page) {
    super(page, '')
    this.signUpBtn = page.getByRole('button', {name: 'Sign up'})
  }

  async openSignUpPopup() {
    await this.signUpBtn.click()
    return new SignUpPopup(this._page)
  }
}