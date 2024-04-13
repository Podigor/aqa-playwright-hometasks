import BaseComponent from "../../../components/BaseComponent";


export default class SignInPopup extends BaseComponent {

    constructor(page) {
        super(page, page.locator('app-signin-modal'))
        this.emailInput =  this.container.locator('#signinEmail')
        this.passwordInput =  this.container.locator('#signinPassword')
        this.signInButton = this.container.locator('.btn-primary')
    }
}