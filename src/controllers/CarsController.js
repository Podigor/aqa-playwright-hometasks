import BaseController from "./BaseController.js";


export default class CarsController extends BaseController{

    #GET_ALL_CAR_BRANDS_PATH = '/api/cars/brands'
    #GET_CAR_BRAND_PATH = '/api/cars/brands/#'
    #GET_ALL_CAR_MODELS_PATH = '/api/cars/models'
    #GET_CAR_MODEL_PATH = '/api/cars/models/#'
    #GET_USER_ALL_CARS_PATH = '/api/cars'
    #CREATE_CAR_PATH = '/api/cars'
    #GET_USER_CAR_PATH = '/api/cars/#'
    #UPDATE_USER_CAR_PATH = '/api/cars/#'
    #DELETE_USER_CARS_PATH = '/api/cars/#'

    async getAllCarBrands(){
        return this._request.get(this.#GET_ALL_CAR_BRANDS_PATH)
    }
    async getCarBrand(id){
        return this._request.get(this.#GET_CAR_BRAND_PATH.replace('#', id))
    }
    async getAllCarModels(){
        return this._request.get(this.#GET_ALL_CAR_MODELS_PATH)
    }
    async getCarModel(id){
        return this._request.get(this.#GET_CAR_MODEL_PATH.replace('#', id))
    }
    async getUserAllCars(){
        return this._request.get(this.#GET_USER_ALL_CARS_PATH)
    }
    async createCar(data){
        return this._request.post(this.#CREATE_CAR_PATH, {data})
    }
    async getUserCar(id){
        return this._request.get(this.#GET_USER_CAR_PATH.replace('#', id))
    }
    async updateUserCar(id, data){
        return this._request.put(this.#UPDATE_USER_CAR_PATH.replace('#', id), {data})
    }
    async deleteCar(id){
        return this._request.delete(this.#DELETE_USER_CARS_PATH.replace('#', id))
    }
}