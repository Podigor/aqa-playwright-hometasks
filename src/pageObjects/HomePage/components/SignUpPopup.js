import BaseComponent from '../../../components/BaseComponent'
import GaragePage from '../../GaragePage/GaragePage'

export default class SignUpPopup extends BaseComponent {
  _nameRequiredMessage = 'Name required'
  _nameInvalidMessage = 'Name is invalid'
  _nameWrongLengthMessage = 'Name has to be from 2 to 20 characters long'
  _lastNameRequiredMessage = 'Last name required'
  _lastNameInvalidMessage = 'Last name is invalid'
  _lastNameWrongLengthMessage = 'Last name has to be from 2 to 20 characters long'
  _emailRequiredMessage = 'Email required'
  _emailInvalidMessage = 'Email is incorrect'
  _passwordRequiredMessage = 'Password required'
  _passwordWrongLengthMessage = 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
  _repeatPasswordRequiredMessage = 'Re-enter password required'
  _repeatPasswordDoNotMatchMessage = 'Passwords do not match'
  _invalidInputBorderColor = 'rgb(220, 53, 69)'
 
  constructor(page) {
    super(page, page.locator('app-signup-modal'))
    this.nameInput = this.container.locator('#signupName')
    this.lastNameInput = this.container.locator('#signupLastName')
    this.emailInput = this.container.locator('#signupEmail')
    this.passwordInput = this.container.locator('#signupPassword')
    this.repeatPasswordInput = this.container.locator('#signupRepeatPassword')
    this.registerBtn = this.container.getByRole('button', {name: 'Register'})
    this.validationMessage = this.container.locator('.invalid-feedback').locator('p')
  }

  get nameRequiredMessage() {
    return this._nameRequiredMessage
}

  get nameInvalidMessage() {
    return this._nameInvalidMessage
}

  get nameWrongLengthMessage() {
    return this._nameWrongLengthMessage
}

  get lastNameRequiredMessage() {
    return this._lastNameRequiredMessage
}

  get lastNameInvalidMessage() {
    return this._lastNameInvalidMessage
}

  get lastNameWrongLengthMessage() {
    return this._lastNameWrongLengthMessage
}

  get emailRequiredMessage() {
    return this._emailRequiredMessage
}

  get emailInvalidMessage() {
    return this._emailInvalidMessage
}

  get passwordWrongLengthMessage() {
    return this._passwordWrongLengthMessage
}

  get passwordRequiredMessage() {
    return this._passwordRequiredMessage
}

  get repeatPasswordRequiredMessage() {
    return this._repeatPasswordRequiredMessage
}

  get repeatPasswordDoNotMatchMessage() {
    return this._repeatPasswordDoNotMatchMessage
}

  get invalidInputBorderColor() {
    return this._invalidInputBorderColor
}

  async fillRegistrationForm({name, lastName, email, password, repeatPassword}) {
    await this.nameInput.fill(name)
    await this.lastNameInput.fill(lastName)
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.repeatPasswordInput.fill(repeatPassword)
  }

  async saveNewUser() {
    await this.registerBtn.click()
    return new GaragePage(this._page)
  }
 }