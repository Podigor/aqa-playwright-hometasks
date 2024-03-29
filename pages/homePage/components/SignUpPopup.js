export default class SignUpPopup {
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
 
  constructor(page) {
    this.page = page
    this.getSignUpPopup = page.locator('app-signup-modal')
    this.getNameInput = this.getSignUpPopup.locator('#signupName')
    this.getLastNameInput = this.getSignUpPopup.locator('#signupLastName')
    this.getEmailInput = this.getSignUpPopup.locator('#signupEmail')
    this.getPasswordInput = this.getSignUpPopup.locator('#signupPassword')
    this.getRepeatPasswordInput = this.getSignUpPopup.locator('#signupRepeatPassword')
    this.getRegisterBtn = this.getSignUpPopup.getByRole('button', {name: 'Register'})
    this.getValidationMessage = this.getSignUpPopup.locator('.invalid-feedback').locator('p')
    this.getNameRequiredMessage = this._nameRequiredMessage
    this.getNameInvalidMessage = this._nameInvalidMessage
    this.getNameWrongLengthMessage = this._nameWrongLengthMessage
    this.getLastNameRequiredMessage = this._lastNameRequiredMessage
    this.getLastNameInvalidMessage = this._lastNameInvalidMessage
    this.getLastNameWrongLengthMessage = this._lastNameWrongLengthMessage
    this.getEmailRequiredMessage = this._emailRequiredMessage
    this.getEmailInvalidMessage = this._emailInvalidMessage
    this.getPasswordRequiredMessage = this._passwordRequiredMessage
    this.getPasswordWrongLengthMessage = this._passwordWrongLengthMessage
    this.getRepeatPasswordRequiredMessage = this._repeatPasswordRequiredMessage
    this.getRepeatPasswordDoNotMatchMessage = this._repeatPasswordDoNotMatchMessage
  }

  async fillRegistrationForm({name, lastName, email, password, repeatPassword}) {
    await this.getNameInput.fill(name)
    await this.getLastNameInput.fill(lastName)
    await this.getEmailInput.fill(email)
    await this.getPasswordInput.fill(password)
    await this.getRepeatPasswordInput.fill(repeatPassword)
  }

  async saveNewUser() {
    await this.getRegisterBtn.click()
  }
 }