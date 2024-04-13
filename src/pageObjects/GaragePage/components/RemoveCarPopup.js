import BaseComponent from "../../../components/BaseComponent";
import GaragePage from "../GaragePage";


export default class RemoveCarPopup extends BaseComponent {

    constructor(page) {
        super(page, page.locator('app-remove-car-modal'))
        this.removeBtn = this.container.locator('.btn-danger')
    }

    async removeCar() {
        await this.removeBtn.click()
        return new GaragePage(this._page)
      }
}