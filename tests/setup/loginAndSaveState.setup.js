import { test as setup, expect } from '@playwright/test'
import HomePage from '../../src/pageObjects/HomePage/HomePage'
import { USER_STORAGE_STATE_PATH } from '../../src/constants'
import GaragePage from '../../src/pageObjects/GaragePage/GaragePage'
import config from '../../config/config';

setup.describe('Setup', ()=> {
    setup('Login and save state', async({page})=> {
        const homePage = new HomePage(page)
        const garagePage = new GaragePage(page)
        await homePage.navigate()
        const signInPopup = await homePage.openSignInPopup()
        await signInPopup.emailInput.fill(config.userCredentials.username)
        await signInPopup.passwordInput.fill(config.userCredentials.password)
        await signInPopup.signInButton.click()

        await expect(page).toHaveURL(garagePage.garagePageUrl)
        
        await page.context().storageState({
            path: USER_STORAGE_STATE_PATH
        })
    })
})