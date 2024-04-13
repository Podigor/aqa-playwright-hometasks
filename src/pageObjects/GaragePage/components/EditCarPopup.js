import BaseComponent from "../../../components/BaseComponent";
import RemoveCarPopup from "./RemoveCarPopup";


export default class EditCarPopup extends BaseComponent {

    constructor(page) {
        super(page, page.locator('app-edit-car-modal'))
        this.removeCarBtn = this.container.locator('.btn-outline-danger')
    }

    async openRemoveCarPopup() {
        await this.removeCarBtn.click()
        return new RemoveCarPopup(this._page)
      }
}