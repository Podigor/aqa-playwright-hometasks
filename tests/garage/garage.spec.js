import { test, expect } from '../../src/fixtures/customFixtures'
import {CARS} from '../../src/data/cars'

test.describe('Garage', ()=> {

        test.afterEach(async ({userGaragePage})=> {
            const editFirstCarPopup = await userGaragePage.openFirstEditCarPopup()
            await editFirstCarPopup.waitLoaded()
            const removeCarPopup = await editFirstCarPopup.openRemoveCarPopup()
            await removeCarPopup.removeCar()
        })   
            test.only('should be able to add car', async ({userGaragePage})=>{
                await expect(userGaragePage.addCarBtn).toBeVisible()
                const addCarPopup = await userGaragePage.openAddCarPopup()
                await addCarPopup.waitLoaded()
                await addCarPopup.addCar(CARS.BMW_X5_WITH_MILEAGE_1000km)
                await expect(userGaragePage.carName.first()).toHaveText(`${CARS.BMW_X5_WITH_MILEAGE_1000km.brand} ${CARS.BMW_X5_WITH_MILEAGE_1000km.model}`)
                await expect(userGaragePage.carMileage.first()).toHaveValue(CARS.BMW_X5_WITH_MILEAGE_1000km.mileage)
            })
})