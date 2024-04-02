import BaseComponent from '../../../components/BaseComponent'
import HomePage from '../../HomePage/HomePage'

export default class RemoveAccountPopup extends BaseComponent {

    constructor(page) {
      super(page, page.locator('app-remove-account-modal'))
      this.removeBtn = this.container.getByRole('button', {name: 'Remove'})
    }

    async removeAccount() {
        await this.removeBtn.click()
        return new HomePage(this._page)
      }
  }