import { test as base, expect as baseExpect} from '@playwright/test'
import GaragePage from '../../src/pageObjects/GaragePage/GaragePage'
import { USER_STORAGE_STATE_PATH } from '../constants'
import HomePage from '../pageObjects/HomePage/HomePage'

export const test = base.extend({
    homePage: async ({page}, use)=>{
        const homePage = new HomePage(page)
        await use(homePage)
    },
    page: async ({browser}, use)=>{
        const ctx = await browser.newContext({
            storageState: USER_STORAGE_STATE_PATH
        })
        const page = await ctx.newPage()

        await use(page)

        await ctx.close()
    },
    userGaragePage: async ({page}, use)=>{
        const userGaragePage = new GaragePage(page)
        await userGaragePage.navigate()

        await use(userGaragePage)
    }
})
export const expect = baseExpect