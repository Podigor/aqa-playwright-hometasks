import { test, expect } from '@playwright/test';
import HomePage from '../pages/homePage/HomePage'
import SignUpPopup from '../pages/homePage/components/SignUpPopup';
import GaragePage from '../pages/garagePage/GaragePage';
import SettingsPage from '../pages/settingsPage/SettingsPage';
import RemoveAccountPopup from '../pages/settingsPage/components/RemoveAccountPopup';


test.describe("Successful user registration", ()=> {

    test.beforeEach(async ({page})=> {
        const homePage = new HomePage(page)
        const signUpPopup = new SignUpPopup(page)

        await homePage.visitHomePage()
        await homePage.openSignUpPopup()
        await expect(signUpPopup.signUpPopupContainer).toBeVisible()
    })

    test('Check that user can be registered with minimal allowed name, last name and password length', async ({page})=> {
        const signUpPopup = new SignUpPopup(page)
        const garagePage = new GaragePage(page)
        const userData = {
            name: 'Ih',
            lastName: 'po',
            email: 'aqa-ipod1@test.com',
            password: 'Secret10',
            repeatPassword: 'Secret10'
        }
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.registerBtn).toBeEnabled()
        await signUpPopup.saveNewUser()
        await expect(page).toHaveURL(garagePage.garagePageUrl)
    })

    test('Check that user can be registered with maximal allowed name, last name and password length', async ({page})=> {
        const signUpPopup = new SignUpPopup(page)
        const garagePage = new GaragePage(page)
        const userData = {
            name: 'somelongnamefortests',
            lastName: 'somelongnamefortests',
            email: 'aqa-ipod2@test.com',
            password: 'Secret10Secret1',
            repeatPassword: 'Secret10Secret1'
        }
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.registerBtn).toBeEnabled()
        await signUpPopup.saveNewUser()
        await expect(page).toHaveURL(garagePage.garagePageUrl)
    })

    test.afterEach(async ({page})=> {
        const settingsPage = new SettingsPage(page)
        const removeAccountPopup = new RemoveAccountPopup(page)
    
        await settingsPage.visitSettingsPage()
        await settingsPage.openRemoveAccountPopup()
        await removeAccountPopup.removeAccount()
        await expect(page).toHaveURL('')
    })
})
test.describe("Unsuccessful user registration", ()=> {

    test.beforeEach(async ({page})=> {
        const homePage = new HomePage(page)
        const signUpPopup = new SignUpPopup(page)

        await homePage.visitHomePage()
        await homePage.openSignUpPopup()
        await expect(signUpPopup.signUpPopupContainer).toBeVisible()
    })

    test('Check that name field is required', async ({page})=> {
        const signUpPopup = new SignUpPopup(page)
        const userData = {
            name: '',
            lastName: 'po',
            email: 'aqa-ipod@test.com',
            password: 'Secret10',
            repeatPassword: 'Secret10'
        }
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await expect(signUpPopup.nameInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.nameInput).toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.lastNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.lastNameInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.emailInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.emailInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.passwordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.passwordInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.validationMessage).toHaveText(signUpPopup.nameRequiredMessage)
        await expect(signUpPopup.validationMessage).toBeVisible()
    })
    test('Check that name can not be less than 2 characters', async ({page})=> {
        const signUpPopup = new SignUpPopup(page)
        const userData = {
            name: 'i',
            lastName: 'po',
            email: 'aqa-ipod@test.com',
            password: 'Secret10',
            repeatPassword: 'Secret10'
        }
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await expect(signUpPopup.nameInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.nameInput).toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.lastNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.lastNameInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.emailInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.emailInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.passwordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.passwordInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.validationMessage).toHaveText(signUpPopup.nameWrongLengthMessage)
        await expect(signUpPopup.validationMessage).toBeVisible()
    })
    test('Check that name can not be more than 20 characters', async ({page})=> {
        const signUpPopup = new SignUpPopup(page)
        const userData = {
            name: 'somelongnamefortestsa',
            lastName: 'po',
            email: 'aqa-ipod@test.com',
            password: 'Secret10',
            repeatPassword: 'Secret10'
        }
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await expect(signUpPopup.nameInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.nameInput).toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.lastNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.lastNameInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.emailInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.emailInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.passwordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.passwordInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.validationMessage).toHaveText(signUpPopup.nameWrongLengthMessage)
        await expect(signUpPopup.validationMessage).toBeVisible()
    })
    test('Check that name can not have spaces', async ({page})=> {
        const signUpPopup = new SignUpPopup(page)
        const userData = {
            name: 'some name',
            lastName: 'po',
            email: 'aqa-ipod@test.com',
            password: 'Secret10',
            repeatPassword: 'Secret10'
        }
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.nameInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.nameInput).toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.lastNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.lastNameInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.emailInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.emailInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.passwordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.passwordInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.validationMessage).toHaveText(signUpPopup.nameInvalidMessage)
        await expect(signUpPopup.validationMessage).toBeVisible()
    })
    test('Check that name can not have only letters', async ({page})=> {
        const signUpPopup = new SignUpPopup(page)
        const userData = {
            name: 'somename1',
            lastName: 'po',
            email: 'aqa-ipod@test.com',
            password: 'Secret10',
            repeatPassword: 'Secret10'
        }
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await expect(signUpPopup.nameInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.nameInput).toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.lastNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.lastNameInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.emailInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.emailInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.passwordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.passwordInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.validationMessage).toHaveText(signUpPopup.nameInvalidMessage)
        await expect(signUpPopup.validationMessage).toBeVisible()
    })
    test('Check that last name field is required', async ({page})=> {
        const signUpPopup = new SignUpPopup(page)
        const userData = {
            name: 'Ih',
            lastName: '',
            email: 'aqa-ipod@test.com',
            password: 'Secret10',
            repeatPassword: 'Secret10'
        }
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await expect(signUpPopup.nameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.nameInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.lastNameInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.lastNameInput).toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.emailInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.emailInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.passwordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.passwordInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.validationMessage).toHaveText(signUpPopup.lastNameRequiredMessage)
        await expect(signUpPopup.validationMessage).toBeVisible()
    })
    test('Check that last name can not be less than 2 characters', async ({page})=> {
        const signUpPopup = new SignUpPopup(page)
        const userData = {
            name: 'Ih',
            lastName: 'p',
            email: 'aqa-ipod@test.com',
            password: 'Secret10',
            repeatPassword: 'Secret10'
        }
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await expect(signUpPopup.nameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.nameInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.lastNameInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.lastNameInput).toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.emailInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.emailInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.passwordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.passwordInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.validationMessage).toHaveText(signUpPopup.lastNameWrongLengthMessage)
        await expect(signUpPopup.validationMessage).toBeVisible()
    })
    test('Check that last name can not be more than 20 characters', async ({page})=> {
        const signUpPopup = new SignUpPopup(page)
        const userData = {
            name: 'Ih',
            lastName: 'somelongnamefortestsa',
            email: 'aqa-ipod@test.com',
            password: 'Secret10',
            repeatPassword: 'Secret10'
        }
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await expect(signUpPopup.nameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.nameInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.lastNameInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.lastNameInput).toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.emailInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.emailInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.passwordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.passwordInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.validationMessage).toHaveText(signUpPopup.lastNameWrongLengthMessage)
        await expect(signUpPopup.validationMessage).toBeVisible()
    })
    test('Check that last name can not have spaces', async ({page})=> {
        const signUpPopup = new SignUpPopup(page)
        const userData = {
            name: 'Ih',
            lastName: 'some lastname',
            email: 'aqa-ipod@test.com',
            password: 'Secret10',
            repeatPassword: 'Secret10'
        }
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.nameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.nameInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.lastNameInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.lastNameInput).toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.emailInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.emailInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.passwordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.passwordInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.validationMessage).toHaveText(signUpPopup.lastNameInvalidMessage)
        await expect(signUpPopup.validationMessage).toBeVisible()
    })
    test('Check that last name can have only letters', async ({page})=> {
        const signUpPopup = new SignUpPopup(page)
        const userData = {
            name: 'Ih',
            lastName: 'somelastname1',
            email: 'aqa-ipod@test.com',
            password: 'Secret10',
            repeatPassword: 'Secret10'
        }
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await expect(signUpPopup.nameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.nameInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.lastNameInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.lastNameInput).toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.emailInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.emailInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.passwordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.passwordInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.validationMessage).toHaveText(signUpPopup.lastNameInvalidMessage)
        await expect(signUpPopup.validationMessage).toBeVisible()
    })
    test('Check that email field is required', async ({page})=> {
        const signUpPopup = new SignUpPopup(page)
        const userData = {
            name: 'Ih',
            lastName: 'PO',
            email: '',
            password: 'Secret10',
            repeatPassword: 'Secret10'
        }
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await expect(signUpPopup.nameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.nameInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.lastNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.lastNameInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.emailInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.emailInput).toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.passwordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.passwordInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.validationMessage).toHaveText(signUpPopup.emailRequiredMessage)
        await expect(signUpPopup.validationMessage).toBeVisible()
    })
    test('Check that email field does not accept invalid email', async ({page})=> {
        const signUpPopup = new SignUpPopup(page)
        const userData = {
            name: 'Ih',
            lastName: 'PO',
            email: 'test@',
            password: 'Secret10',
            repeatPassword: 'Secret10'
        }
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await expect(signUpPopup.nameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.nameInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.lastNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.lastNameInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.emailInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.emailInput).toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.passwordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.passwordInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.validationMessage).toHaveText(signUpPopup.emailInvalidMessage)
        await expect(signUpPopup.validationMessage).toBeVisible()
    })
    test('Check that email field does not accept spaces', async ({page})=> {
        const signUpPopup = new SignUpPopup(page)
        const userData = {
            name: 'Ih',
            lastName: 'PO',
            email: 'aqa-test@.com ',
            password: 'Secret10',
            repeatPassword: 'Secret10'
        }
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await expect(signUpPopup.nameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.nameInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.lastNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.lastNameInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.emailInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.emailInput).toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.passwordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.passwordInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.validationMessage).toHaveText(signUpPopup.emailInvalidMessage)
        await expect(signUpPopup.validationMessage).toBeVisible()
    })
    test('Check that password field is required', async ({page})=> {
        const signUpPopup = new SignUpPopup(page)
        const userData = {
            name: 'Ih',
            lastName: 'PO',
            email: 'aqa-ipod@test.com',
            password: '',
            repeatPassword: 'Secret10'
        }
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await expect(signUpPopup.nameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.nameInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.lastNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.lastNameInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.emailInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.emailInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.passwordInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.passwordInput).toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.validationMessage).toHaveText(signUpPopup.passwordRequiredMessage)
        await expect(signUpPopup.validationMessage).toBeVisible()
    })
    test('Check that password can not be less than 8 characters', async ({page})=> {
        const signUpPopup = new SignUpPopup(page)
        const userData = {
            name: 'Ih',
            lastName: 'PO',
            email: 'aqa-ipod@test.com',
            password: 'Secret1',
            repeatPassword: ''
        }
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await expect(signUpPopup.nameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.nameInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.lastNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.lastNameInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.emailInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.emailInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.passwordInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.passwordInput).toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.validationMessage).toHaveText(signUpPopup.passwordWrongLengthMessage)
        await expect(signUpPopup.validationMessage).toBeVisible()
    })
    test('Check that password can not be more than 15 characters', async ({page})=> {
        const signUpPopup = new SignUpPopup(page)
        const userData = {
            name: 'Ih',
            lastName: 'PO',
            email: 'aqa-ipod@test.com',
            password: 'Secret10Secret10',
            repeatPassword: ''
        }
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await expect(signUpPopup.nameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.nameInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.lastNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.lastNameInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.emailInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.emailInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.passwordInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.passwordInput).toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.validationMessage).toHaveText(signUpPopup.passwordWrongLengthMessage)
        await expect(signUpPopup.validationMessage).toBeVisible()
    })
    test('Check that password can not be without integers', async ({page})=> {
        const signUpPopup = new SignUpPopup(page)
        const userData = {
            name: 'Ih',
            lastName: 'PO',
            email: 'aqa-ipod@test.com',
            password: 'SecretabSecretc',
            repeatPassword: ''
        }
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await expect(signUpPopup.nameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.nameInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.lastNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.lastNameInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.emailInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.emailInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.passwordInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.passwordInput).toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.validationMessage).toHaveText(signUpPopup.passwordWrongLengthMessage)
        await expect(signUpPopup.validationMessage).toBeVisible()
    })
    test('Check that password can not be without capital letters', async ({page})=> {
        const signUpPopup = new SignUpPopup(page)
        const userData = {
            name: 'Ih',
            lastName: 'PO',
            email: 'aqa-ipod@test.com',
            password: 'secret10secret1',
            repeatPassword: ''
        }
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await expect(signUpPopup.nameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.nameInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.lastNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.lastNameInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.emailInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.emailInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.passwordInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.passwordInput).toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.validationMessage).toHaveText(signUpPopup.passwordWrongLengthMessage)
        await expect(signUpPopup.validationMessage).toBeVisible()
    })
    test('Check that password can not be without small letters', async ({page})=> {
        const signUpPopup = new SignUpPopup(page)
        const userData = {
            name: 'Ih',
            lastName: 'PO',
            email: 'aqa-ipod@test.com',
            password: 'SECRET10SECRET1',
            repeatPassword: ''
        }
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await expect(signUpPopup.nameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.nameInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.lastNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.lastNameInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.emailInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.emailInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.passwordInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.passwordInput).toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.repeatPasswordInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.validationMessage).toHaveText(signUpPopup.passwordWrongLengthMessage)
        await expect(signUpPopup.validationMessage).toBeVisible()
    })
    test('Check that Re-enter password field is required', async ({page})=> {
        const signUpPopup = new SignUpPopup(page)
        const userData = {
            name: 'Ih',
            lastName: 'PO',
            email: 'aqa-ipod@test.com',
            password: 'Secret10',
            repeatPassword: ''
        }
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await signUpPopup.repeatPasswordInput.focus()
        await signUpPopup.repeatPasswordInput.blur()
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await expect(signUpPopup.nameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.nameInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.lastNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.lastNameInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.emailInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.emailInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.passwordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.passwordInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.repeatPasswordInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.repeatPasswordInput).toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.validationMessage).toHaveText(signUpPopup.repeatPasswordRequiredMessage)
        await expect(signUpPopup.validationMessage).toBeVisible()
    })
    test('Check that Re-enter password should match with password', async ({page})=> {
        const signUpPopup = new SignUpPopup(page)
        const userData = {
            name: 'Ih',
            lastName: 'PO',
            email: 'aqa-ipod@test.com',
            password: 'Secret10',
            repeatPassword: 'Secret11'
        }
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await signUpPopup.repeatPasswordInput.focus()
        await signUpPopup.repeatPasswordInput.blur()
        await expect(signUpPopup.registerBtn).toBeDisabled()
        await expect(signUpPopup.nameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.nameInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.lastNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.lastNameInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.emailInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.emailInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.passwordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.passwordInput).not.toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.repeatPasswordInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.repeatPasswordInput).toHaveCSS('border-color', signUpPopup.invalidInputBorderColor)
        await expect(signUpPopup.validationMessage).toHaveText(signUpPopup.repeatPasswordDoNotMatchMessage)
        await expect(signUpPopup.validationMessage).toBeVisible()
    })
})