import { test as base, expect as baseExpect} from '@playwright/test'
import GaragePage from '../../src/pageObjects/GaragePage/GaragePage'
import { USER_STORAGE_STATE_PATH } from '../constants'

export const test = base.extend({
    userGaragePage : async ({browser}, use) => {
        const ctx = await browser.newContext({
            storageState: USER_STORAGE_STATE_PATH
        })
        const page = await ctx.newPage()

        const userGaragePage = new GaragePage(page)
        await userGaragePage.navigate()
        await use(userGaragePage)
    }
})
export const expect = baseExpect