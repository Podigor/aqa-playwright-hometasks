import moment from 'moment'
import { BRANDS } from '../../src/data/brands'
import { MODELS } from '../../src/data/models'
import { test, expect, request as apiRequest} from '../../src/fixtures/customFixtures'
import CarsController from '../../src/controllers/CarsController'

test.describe('Get Cars API - User cars', ()=> {
    let response
    let car
    let requestBody
    let allCarsResponse
    let carByIdResponse
    let body
    let expectedCarData
    let startTime
    const timeDifference = 3

    test.describe('Successfull cases', ()=> {

        test('GET /cars - Should return one car from user garage', async({apiNewUser}) => {
            
            await test.step('Add one car to the garage', async () => {
                requestBody = {
                        "carBrandId": BRANDS.Audi.id,
                        "carModelId": MODELS.Audi.A6.id,
                        "mileage": Math.floor(Math.random() * 100)
                    }
                startTime = new Date()
                response = await apiNewUser.cars.createCar(requestBody)
                car = await response.json()
            })

            await test.step('Should return one car from user garage', async () => {
                allCarsResponse = await apiNewUser.cars.getUserAllCars()
                expectedCarData = {
                    "id": expect.any(Number),
                    "carBrandId": requestBody.carBrandId,
                    "carModelId": requestBody.carModelId,
                    "initialMileage": requestBody.mileage,
                    "updatedMileageAt": expect.any(String),
                    "carCreatedAt": expect.any(String),
                    "mileage": requestBody.mileage,
                    "brand": BRANDS.Audi.title,
                    "model": MODELS.Audi.A6.title,
                    "logo": BRANDS.Audi.logoFilename
                }
                body = await allCarsResponse.json()
                expect(allCarsResponse.status()).toBe(200)
                expect(body.status).toBe('ok')
                expect(body.data).toHaveLength(1)
                expect(body.data[0]).toEqual(expectedCarData)
                expect(moment(body.data.updatedMileageAt).diff(startTime, 'seconds')).toBeLessThanOrEqual(timeDifference)
                expect(moment(body.data.carCreatedAt).diff(startTime, 'seconds')).toBeLessThanOrEqual(timeDifference)
                })
            })

        test('GET /cars - Should return all exsting cars from user garage', async({apiNewUser}) => {
            const userGarage = []
            for (const key of Object.keys(BRANDS)) {
                const brand = BRANDS[key]
                for (const model of Object.values(MODELS[brand.title])) {
                    await test.step('Add all existing cars to user garage', async () => {
                        requestBody = {
                            "carBrandId": brand.id,
                            "carModelId": model.id,
                            "mileage": Math.floor(Math.random() * 100)
                        }
                        response = await apiNewUser.cars.createCar(requestBody)
                        car = await response.json()
                        userGarage.unshift(car.data)
                    })
                }
            }
            await test.step('All existing cars should be returned from user garage', async () => {
                allCarsResponse = await apiNewUser.cars.getUserAllCars()
                body = await allCarsResponse.json()
                expect(allCarsResponse.status()).toBe(200)
                expect(body.status).toBe('ok')
                expect(body.data.sort((a, b)=> a.id - b.id)).toEqual(JSON.parse(JSON.stringify(userGarage)
                .replaceAll(/[0-9]{3}Z/g,"000Z")) //handle an issue with miliseconds substitution with '000'
                .sort((a, b)=> a.id - b.id)) //handle an issue with broken sorting by id of cars in users garage
                })
            })

        test('GET /cars - Should return empty cars list if no cars added to user garage ', async({apiNewUser}) => {
            allCarsResponse = await apiNewUser.cars.getUserAllCars()
            body = await allCarsResponse.json()
            expect(allCarsResponse.status()).toBe(200)
            expect(body.status).toBe('ok')
            expect(body.data).toEqual([])
            })

        test('GET /cars/{id} - Should return all exsting cars by id from user garage', async({apiNewUser}) => {
            for (const key of Object.keys(BRANDS)) {
                const brand = BRANDS[key]
                for (const model of Object.values(MODELS[brand.title])) {
                    await test.step('Add all existing cars to user garage and get user cars by id', async () => {
                        requestBody = {
                            "carBrandId": brand.id,
                            "carModelId": model.id,
                            "mileage": Math.floor(Math.random() * 100)
                        }
                        startTime = new Date()
                        response = await apiNewUser.cars.createCar(requestBody)
                        car = await response.json()
                        expectedCarData = {
                            "id": car.data.id,
                            "carBrandId": requestBody.carBrandId,
                            "carModelId": requestBody.carModelId,
                            "initialMileage": requestBody.mileage,
                            "updatedMileageAt": expect.any(String),
                            "carCreatedAt": expect.any(String),
                            "mileage": requestBody.mileage,
                            "brand": brand.title,
                            "model": model.title,
                            "logo": brand.logoFilename
                        }
                        carByIdResponse = await apiNewUser.cars.getUserCar(car.data.id)
                        body = await carByIdResponse.json()
                        expect(carByIdResponse.status()).toBe(200)
                        expect(body.status).toBe('ok')
                        expect(body.data).toEqual(expectedCarData)
                        expect(moment(body.data.updatedMileageAt).diff(startTime, 'seconds')).toBeLessThanOrEqual(timeDifference)
                        expect(moment(body.data.carCreatedAt).diff(startTime, 'seconds')).toBeLessThanOrEqual(timeDifference)
                    })
                }
            }
        })
    })

    test.describe('Unuccessfull cases', ()=> { 
        let carsController

        test.beforeEach(async ()=> {
            const request = await apiRequest.newContext()
            carsController = new CarsController(request) 
        })

        test("GET /cars - Should return 401 status code for not authenticated request", async()=>{
            allCarsResponse = await carsController.getUserAllCars()
            expect(allCarsResponse.status()).toBe(401)
            expect(await allCarsResponse.json()).toEqual({ status: 'error', message: 'Not authenticated' })
        })

        test("GET /cars/{id} - Should return 401 status code for not authenticated request", async({apiNewUser})=>{
            await test.step('Add one car to the garage', async () => {
                requestBody = {
                        "carBrandId": BRANDS.Audi.id,
                        "carModelId": MODELS.Audi.A6.id,
                        "mileage": Math.floor(Math.random() * 100)
                    }
                startTime = new Date()
                response = await apiNewUser.cars.createCar(requestBody)
                car = await response.json()
            })
            await test.step('Get user car by id for not authorised user', async () => {
            carByIdResponse = await carsController.getUserCar(car.data.id)
            expect(carByIdResponse.status()).toBe(401)
            expect(await carByIdResponse.json()).toEqual({ status: 'error', message: 'Not authenticated' })
            })
        })
        test("GET /cars/{id} - Should return 404 status code for non-existing car id", async({apiNewUser})=>{
            carByIdResponse = await apiNewUser.cars.getUserCar(0)
            expect(carByIdResponse.status()).toBe(404)
            expect(await carByIdResponse.json()).toEqual({ status: 'error', message: 'Car not found' })
        })
    })
})