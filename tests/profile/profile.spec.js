
import { test, expect } from '../../src/fixtures/customFixtures'
import ProfilePage from '../../src/pageObjects/ProfilePage/ProfilePage'
import { PROFILE_MOCK_RESPONSE } from '../../src/pageObjects/ProfilePage/fixutres/profiles'

test.describe('Profile', ()=> {
            test ('should be able to see profile name with mocked response body ', async ({page})=>{

                await page.route('/api/users/profile', async route => {
                    return route.fulfill({
                        status: 200,
                        body: JSON.stringify(PROFILE_MOCK_RESPONSE)
                    })
                })
                const userProfilePage = new ProfilePage(page)
                await userProfilePage.navigate()
                await expect(userProfilePage.profileName).toBeVisible()
                await expect(userProfilePage.profileName).toHaveText(`${PROFILE_MOCK_RESPONSE.data.name} ${PROFILE_MOCK_RESPONSE.data.lastName}`)
            })
})