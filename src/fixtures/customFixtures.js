import { test as base, expect as baseExpect, request as baseRequest} from '@playwright/test'
import GaragePage from '../../src/pageObjects/GaragePage/GaragePage'
import { USER_STORAGE_STATE_PATH } from '../constants'

export const test = base.extend({
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
    },
    request: async ({}, use)=>{
        const req = await request.newContext({
            storageState: USER_STORAGE_STATE_PATH
        })
        await use(req)

        await req.dispose()
    },
})
export const expect = baseExpect

export const request = baseRequest