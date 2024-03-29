import { test, expect } from '@playwright/test';
import HomePage from '../pages/homePage/HomePage'
import SignInPopup from '../pages/homePage/components/SignInPopup';
import SignUpPopup from '../pages/homePage/components/SignUpPopup';
import GaragePage from '../pages/garagePage/GaragePage';
import SettingsPage from '../pages/settingsPage/SettingsPage';
import RemoveAccountPopup from '../pages/settingsPage/components/RemoveAccountPopup';


test.describe("Successful user registration", ()=> {

    test.beforeEach(async ({page})=> {
        const homePage = new HomePage(page)
        const signInPopup = new SignInPopup(page)
        const signUpPopup = new SignUpPopup(page)

        await homePage.visitHomePage()
        await homePage.openSignInPopup()
        await signInPopup.openRegistrationPopup()
        await expect(signUpPopup.getSignUpPopup).toBeVisible()
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
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.getRegisterBtn).toBeEnabled()
        await signUpPopup.saveNewUser()
        await expect(page).toHaveURL(garagePage.getGaragePageUrl)
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
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.getRegisterBtn).toBeEnabled()
        await signUpPopup.saveNewUser()
        await expect(page).toHaveURL(garagePage.getGaragePageUrl)
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
        const signInPopup = new SignInPopup(page)
        const signUpPopup = new SignUpPopup(page)

        await homePage.visitHomePage()
        await homePage.openSignInPopup()
        await signInPopup.openRegistrationPopup()
        await expect(signUpPopup.getSignUpPopup).toBeVisible()
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
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await expect(signUpPopup.getNameInput).toHaveClass(/is-invalid/) //checks that border color is red by using corresponding class
        await expect(signUpPopup.getLastNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getEmailInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getRepeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getValidationMessage).toHaveText(signUpPopup.getNameRequiredMessage)
        await expect(signUpPopup.getValidationMessage).toBeVisible()
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
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await expect(signUpPopup.getNameInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.getLastNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getEmailInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getRepeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getValidationMessage).toHaveText(signUpPopup.getNameWrongLengthMessage)
        await expect(signUpPopup.getValidationMessage).toBeVisible()
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
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await expect(signUpPopup.getNameInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.getLastNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getEmailInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getRepeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getValidationMessage).toHaveText(signUpPopup.getNameWrongLengthMessage)
        await expect(signUpPopup.getValidationMessage).toBeVisible()
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
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await expect(signUpPopup.getNameInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.getLastNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getEmailInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getRepeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getValidationMessage).toHaveText(signUpPopup.getNameInvalidMessage)
        await expect(signUpPopup.getValidationMessage).toBeVisible()
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
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await expect(signUpPopup.getNameInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.getLastNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getEmailInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getRepeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getValidationMessage).toHaveText(signUpPopup.getNameInvalidMessage)
        await expect(signUpPopup.getValidationMessage).toBeVisible()
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
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await expect(signUpPopup.getNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getLastNameInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.getEmailInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getRepeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getValidationMessage).toHaveText(signUpPopup.getLastNameRequiredMessage)
        await expect(signUpPopup.getValidationMessage).toBeVisible()
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
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await expect(signUpPopup.getNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getLastNameInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.getEmailInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getRepeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getValidationMessage).toHaveText(signUpPopup.getLastNameWrongLengthMessage)
        await expect(signUpPopup.getValidationMessage).toBeVisible()
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
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await expect(signUpPopup.getNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getLastNameInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.getEmailInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getRepeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getValidationMessage).toHaveText(signUpPopup.getLastNameWrongLengthMessage)
        await expect(signUpPopup.getValidationMessage).toBeVisible()
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
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await expect(signUpPopup.getNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getLastNameInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.getEmailInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getRepeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getValidationMessage).toHaveText(signUpPopup.getLastNameInvalidMessage)
        await expect(signUpPopup.getValidationMessage).toBeVisible()
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
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await expect(signUpPopup.getNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getLastNameInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.getEmailInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getRepeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getValidationMessage).toHaveText(signUpPopup.getLastNameInvalidMessage)
        await expect(signUpPopup.getValidationMessage).toBeVisible()
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
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await expect(signUpPopup.getNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getLastNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getEmailInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.getPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getRepeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getValidationMessage).toHaveText(signUpPopup.getEmailRequiredMessage)
        await expect(signUpPopup.getValidationMessage).toBeVisible()
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
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await expect(signUpPopup.getNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getLastNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getEmailInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.getPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getRepeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getValidationMessage).toHaveText(signUpPopup.getEmailInvalidMessage)
        await expect(signUpPopup.getValidationMessage).toBeVisible()
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
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await expect(signUpPopup.getNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getLastNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getEmailInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.getPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getRepeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getValidationMessage).toHaveText(signUpPopup.getEmailInvalidMessage)
        await expect(signUpPopup.getValidationMessage).toBeVisible()
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
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await expect(signUpPopup.getNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getLastNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getEmailInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getPasswordInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.getRepeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getValidationMessage).toHaveText(signUpPopup.getPasswordRequiredMessage)
        await expect(signUpPopup.getValidationMessage).toBeVisible()
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
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await expect(signUpPopup.getNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getLastNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getEmailInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getPasswordInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.getRepeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getValidationMessage).toHaveText(signUpPopup.getPasswordWrongLengthMessage)
        await expect(signUpPopup.getValidationMessage).toBeVisible()
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
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await expect(signUpPopup.getNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getLastNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getEmailInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getPasswordInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.getRepeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getValidationMessage).toHaveText(signUpPopup.getPasswordWrongLengthMessage)
        await expect(signUpPopup.getValidationMessage).toBeVisible()
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
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await expect(signUpPopup.getNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getLastNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getEmailInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getPasswordInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.getRepeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getValidationMessage).toHaveText(signUpPopup.getPasswordWrongLengthMessage)
        await expect(signUpPopup.getValidationMessage).toBeVisible()
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
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await expect(signUpPopup.getNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getLastNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getEmailInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getPasswordInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.getRepeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getValidationMessage).toHaveText(signUpPopup.getPasswordWrongLengthMessage)
        await expect(signUpPopup.getValidationMessage).toBeVisible()
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
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await expect(signUpPopup.getNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getLastNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getEmailInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getPasswordInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.getRepeatPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getValidationMessage).toHaveText(signUpPopup.getPasswordWrongLengthMessage)
        await expect(signUpPopup.getValidationMessage).toBeVisible()
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
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await signUpPopup.getRepeatPasswordInput.focus()
        await signUpPopup.getRepeatPasswordInput.blur()
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await expect(signUpPopup.getNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getLastNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getEmailInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getRepeatPasswordInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.getValidationMessage).toHaveText(signUpPopup.getRepeatPasswordRequiredMessage)
        await expect(signUpPopup.getValidationMessage).toBeVisible()
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
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await signUpPopup.fillRegistrationForm(userData)
        await signUpPopup.getRepeatPasswordInput.focus()
        await signUpPopup.getRepeatPasswordInput.blur()
        await expect(signUpPopup.getRegisterBtn).toBeDisabled()
        await expect(signUpPopup.getNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getLastNameInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getEmailInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getPasswordInput).not.toHaveClass(/is-invalid/)
        await expect(signUpPopup.getRepeatPasswordInput).toHaveClass(/is-invalid/)
        await expect(signUpPopup.getValidationMessage).toHaveText(signUpPopup.getRepeatPasswordDoNotMatchMessage)
        await expect(signUpPopup.getValidationMessage).toBeVisible()
    })
})