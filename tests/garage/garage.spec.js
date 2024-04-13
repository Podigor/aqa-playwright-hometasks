import { test, expect } from '../../src/fixtures/customFixtures'
import {CARS} from '../../src/data/cars'

test.describe('Garage', ()=> {

    let addCarPopup
    let editFirstCarPopup
    let removeCarPopup

        test.afterEach(async ({userGaragePage})=> {
            editFirstCarPopup = await userGaragePage.openFirstEditCarPopup()
            await editFirstCarPopup.waitLoaded()
            removeCarPopup = await editFirstCarPopup.openRemoveCarPopup()
            await removeCarPopup.removeCar()
        })   
            test.only('should be able to add car', async ({userGaragePage})=>{
                await expect(userGaragePage.addCarBtn).toBeVisible()
                addCarPopup = await userGaragePage.openAddCarPopup()
                await addCarPopup.waitLoaded()
                await addCarPopup.addCar(CARS.BMW_X5_WITH_MILEAGE_1000km)
                await expect(userGaragePage.carName.first()).toHaveText(`${CARS.BMW_X5_WITH_MILEAGE_1000km.brand} ${CARS.BMW_X5_WITH_MILEAGE_1000km.model}`)
                await expect(userGaragePage.carMileage.first()).toHaveValue(CARS.BMW_X5_WITH_MILEAGE_1000km.mileage)
            })
})