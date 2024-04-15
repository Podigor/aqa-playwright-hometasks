import BasePage from "../BasePage"
import AddCarPopup from "./components/AddCarPopup"
import EditCarPopup from "./components/EditCarPopup"


export default class GaragePage extends BasePage{

    constructor(page) {
        super(page, '/panel/garage')
        this.addCarBtn = page.getByRole('button', { name: 'Add car' })
        this.editCarIcon = page.locator('.icon-edit')
        this.carName = page.locator('.car_name.h2')
        this.carMileage = page.locator('[name="miles"]')
    }

    get garagePageUrl() {
        return this._url
    }

    async openAddCarPopup() {
        await this.addCarBtn.click()
        return new AddCarPopup(this._page)
    }

    async openFirstEditCarPopup() {
        await this.editCarIcon.first().click()
        return new EditCarPopup(this._page)
    }
}