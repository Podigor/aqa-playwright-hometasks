import { BRANDS } from '../../src/data/brands'
import { MODELS } from '../../src/data/models'
import { test, expect, request as apiRequest} from '../../src/fixtures/customFixtures'
import CarsController from '../../src/controllers/CarsController'

test.describe('Delete Cars API', ()=> {
    let response
    let car
    let requestBody
    let deleteCarResponse
    let body
    let carsController
    let carByIdResponse

    test.describe('Successfull cases', ()=> {

        test('DELETE /cars/{id} - Should be able to delete each existing car', async({apiNewUser}) => {
            for (const key of Object.keys(BRANDS)) {
                const brand = BRANDS[key]
                for (const model of Object.values(MODELS[brand.title])) {
                    await test.step('Add all existing cars to user garage and delete these cars', async () => {
                        requestBody = {
                            "carBrandId": brand.id,
                            "carModelId": model.id,
                            "mileage": Math.floor(Math.random() * 100)
                        }
                        response = await apiNewUser.cars.createCar(requestBody)
                        car = await response.json()
                        deleteCarResponse = await apiNewUser.cars.deleteCar(car.data.id)
                        body = await deleteCarResponse.json()
                        
                        expect(deleteCarResponse.status()).toBe(200)
                        expect(body.status).toBe('ok')
                        expect(body.data).toEqual({"carId": car.data.id})

                        carByIdResponse = await apiNewUser.cars.getUserCar(car.data.id)
                        expect(await carByIdResponse.json()).toEqual({ status: 'error', message: 'Car not found' })
                    })
                }
            }
        })
    })
    test.describe('Unsuccessfull cases', ()=> {

        test("DELETE /cars/{id} - Should return 401 status code for not authenticated request", async({apiNewUser})=>{
            await test.step('Add car to the garage', async () => {
                const request = await apiRequest.newContext()
                carsController = new CarsController(request) 
                requestBody = {
                    "carBrandId": BRANDS.Audi.id,
                    "carModelId": MODELS.Audi.A6.id,
                    "mileage": Math.floor(Math.random() * 100)
                }
                response = await apiNewUser.cars.createCar(requestBody)
                car = await response.json()
            })
            await test.step('Try to delete existing car by unauthorized user', async () => {
                deleteCarResponse = await carsController.deleteCar(car.data.id)
                expect(deleteCarResponse.status()).toBe(401)
                expect(await deleteCarResponse.json()).toEqual({ status: 'error', message: 'Not authenticated' })
            })
        })
        test("DELETE /cars/{id} - Should return 404 status code for non-existing car", async({apiNewUser})=>{
                deleteCarResponse = await apiNewUser.cars.deleteCar(0)
                expect(deleteCarResponse.status()).toBe(404)
                expect(await deleteCarResponse.json()).toEqual({ status: 'error', message: 'Car not found' })
            })
        })
    }) 