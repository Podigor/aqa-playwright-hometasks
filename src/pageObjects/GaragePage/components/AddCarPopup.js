import BaseComponent from "../../../components/BaseComponent";


export default class AddCarPopup extends BaseComponent {

    constructor(page) {
        super(page, page.locator('app-add-car-modal'))
        this.brandDropdown =  this.container.locator('#addCarBrand')
        this.modelDropdown =  this.container.locator('#addCarModel')
        this.mileageInput =  this.container.locator('#addCarMileage')
        this.addBtn = this.container.locator('.btn-primary')
    }
    async addCar({brand, model, mileage}) {
        await this.brandDropdown.selectOption({ label: brand })
        await this.modelDropdown.selectOption({ label: model })
        await this.mileageInput.fill(mileage)
        await this.addBtn.click()
      }
}