import BasePage from "../BasePage"


export default class GaragePage extends BasePage{

    constructor(page) {
        super(page, '/panel/garage')
    }

    get garagePageUrl() {
        return this._url
    }
}