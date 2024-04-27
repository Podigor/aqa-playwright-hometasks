import moment from 'moment'
import { BRANDS } from '../../src/data/brands'
import { MODELS } from '../../src/data/models'
import { test, expect, request as apiRequest} from '../../src/fixtures/customFixtures'
import CarsController from '../../src/controllers/CarsController'

test.describe('Edit Cars API', ()=> {
    let response
    let car
    let requestBody
    let updatedRequestBody
    let updateCarResponse
    let body
    let expectedCarData
    let startTime
    let carsController
    const timeDifference = 4

    test.beforeEach(async({apiNewUser})=> {
        requestBody = {
            "carBrandId": BRANDS.Audi.id,
            "carModelId": MODELS.Audi.A6.id,
            "mileage": 12345
        }
        startTime = new Date()
        response = await apiNewUser.cars.createCar(requestBody)
        car = await response.json()
    })
    test.describe('Successfull cases', ()=> {

        test('PUT /cars - Should be able to edit car mileage', async({apiNewUser}) => {
            updatedRequestBody = {
                "carBrandId": BRANDS.Audi.id,
                "carModelId": MODELS.Audi.A6.id,
                "mileage": requestBody.mileage + 1
            }
            updateCarResponse = await apiNewUser.cars.updateUserCar(car.data.id, updatedRequestBody)
            expectedCarData = {
                "id": car.data.id,
                "carBrandId": requestBody.carBrandId,
                "carModelId": requestBody.carModelId,
                "initialMileage": requestBody.mileage,
                "updatedMileageAt": expect.any(String),
                "carCreatedAt": expect.any(String),
                "mileage": updatedRequestBody.mileage,
                "brand": BRANDS.Audi.title,
                "model": MODELS.Audi.A6.title,
                "logo": BRANDS.Audi.logoFilename
            }
            body = await updateCarResponse.json()
            expect(updateCarResponse.status()).toBe(200)
            expect(body.status).toBe('ok')
            expect(body.data).toEqual(expectedCarData)
            expect(moment(body.data.updatedMileageAt).diff(startTime, 'seconds')).toBeLessThanOrEqual(timeDifference)
            expect(moment(body.data.carCreatedAt).diff(startTime, 'seconds')).toBeLessThanOrEqual(timeDifference)
            })

        test('PUT /cars - Should be able to edit car model', async({apiNewUser}) => {
            updatedRequestBody = {
                "carBrandId": BRANDS.Audi.id,
                "carModelId": MODELS.Audi.Q7.id,
                "mileage": requestBody.mileage
            }
            updateCarResponse = await apiNewUser.cars.updateUserCar(car.data.id, updatedRequestBody)
            expectedCarData = {
                "id": car.data.id,
                "carBrandId": requestBody.carBrandId,
                "carModelId": updatedRequestBody.carModelId,
                "initialMileage": requestBody.mileage,
                "updatedMileageAt": expect.any(String),
                "carCreatedAt": expect.any(String),
                "mileage": updatedRequestBody.mileage,
                "brand": BRANDS.Audi.title,
                "model": MODELS.Audi.Q7.title,
                "logo": BRANDS.Audi.logoFilename
            }
            body = await updateCarResponse.json()
            expect(updateCarResponse.status()).toBe(200)
            expect(body.status).toBe('ok')
            expect(body.data).toEqual(expectedCarData)
            expect(moment(body.data.updatedMileageAt).diff(startTime, 'seconds')).toBeLessThanOrEqual(timeDifference)
            expect(moment(body.data.carCreatedAt).diff(startTime, 'seconds')).toBeLessThanOrEqual(timeDifference)
            })

        test('PUT /cars - Should be able to edit car brand and model', async({apiNewUser}) => {
            updatedRequestBody = {
                "carBrandId": BRANDS.BMW.id,
                "carModelId": MODELS.BMW.X5.id,
                "mileage": requestBody.mileage
            }
            updateCarResponse = await apiNewUser.cars.updateUserCar(car.data.id, updatedRequestBody)
            expectedCarData = {
                "id": car.data.id,
                "carBrandId": updatedRequestBody.carBrandId,
                "carModelId": updatedRequestBody.carModelId,
                "initialMileage": requestBody.mileage,
                "updatedMileageAt": expect.any(String),
                "carCreatedAt": expect.any(String),
                "mileage": updatedRequestBody.mileage,
                "brand": BRANDS.BMW.title,
                "model": MODELS.BMW.X5.title,
                "logo": BRANDS.BMW.logoFilename
            }
            body = await updateCarResponse.json()
            expect(updateCarResponse.status()).toBe(200)
            expect(body.status).toBe('ok')
            expect(body.data).toEqual(expectedCarData)
            expect(moment(body.data.updatedMileageAt).diff(startTime, 'seconds')).toBeLessThanOrEqual(timeDifference)
            expect(moment(body.data.carCreatedAt).diff(startTime, 'seconds')).toBeLessThanOrEqual(timeDifference)
            })

        test('PUT /cars - Should be able to edit car brand, model and mileage for each existing car', async({apiNewUser}) => {
            for (const key of Object.keys(BRANDS)) {
                const brand = BRANDS[key]
                for (const model of Object.values(MODELS[brand.title])) {
                    await test.step('Edit all existing cars', async () => {
                        updatedRequestBody = {
                            "carBrandId": brand.id,
                            "carModelId": model.id,
                            "mileage": Number(moment().valueOf().toString().slice(7))
                        }
                        updateCarResponse = await apiNewUser.cars.updateUserCar(car.data.id, updatedRequestBody)
                        expectedCarData = {
                            "id": car.data.id,
                            "carBrandId": updatedRequestBody.carBrandId,
                            "carModelId": updatedRequestBody.carModelId,
                            "initialMileage": requestBody.mileage,
                            "updatedMileageAt": expect.any(String),
                            "carCreatedAt": expect.any(String),
                            "mileage": updatedRequestBody.mileage,
                            "brand": brand.title,
                            "model": model.title,
                            "logo": brand.logoFilename
                        }
                        body = await updateCarResponse.json()
                        
                        expect(updateCarResponse.status()).toBe(200)
                        expect(body.status).toBe('ok')
                        expect(body.data).toEqual(expectedCarData)
                        expect(moment(body.data.updatedMileageAt).diff(startTime, 'seconds')).toBeLessThanOrEqual(timeDifference)
                        expect(moment(body.data.carCreatedAt).diff(startTime, 'seconds')).toBeLessThanOrEqual(timeDifference)
                    })
                }
            }
        })

        test.describe('Successfull cases for missing or wrong brand, model and mileage', ()=> {

            test("PUT /cars - Should ignore incorrect brand id and update mileage", async({apiNewUser})=>{
                updatedRequestBody = {
                    "carBrandId": 0,
                    "carModelId": MODELS.BMW.X5.id,
                    "mileage": requestBody.mileage + 1
                }
                updateCarResponse = await apiNewUser.cars.updateUserCar(car.data.id, updatedRequestBody)
                expectedCarData = {
                    "id": car.data.id,
                    "carBrandId": requestBody.carBrandId,
                    "carModelId": requestBody.carModelId,
                    "initialMileage": requestBody.mileage,
                    "updatedMileageAt": expect.any(String),
                    "carCreatedAt": expect.any(String),
                    "mileage": updatedRequestBody.mileage,
                    "brand": BRANDS.Audi.title,
                    "model": MODELS.Audi.A6.title,
                    "logo": BRANDS.Audi.logoFilename
                }
                body = await updateCarResponse.json()
        
                expect(body.status).toBe('ok')
                expect(body.data).toEqual(expectedCarData)
                expect(moment(body.data.updatedMileageAt).diff(startTime, 'seconds')).toBeLessThanOrEqual(timeDifference)
                expect(moment(body.data.carCreatedAt).diff(startTime, 'seconds')).toBeLessThanOrEqual(timeDifference)
            })
        
            test("PUT /cars - Should ignore incorrect model id and update mileage", async({apiNewUser})=>{
                updatedRequestBody = {
                    "carBrandId": BRANDS.BMW.id,
                    "carModelId": 0,
                    "mileage": requestBody.mileage + 1
                }
                updateCarResponse = await apiNewUser.cars.updateUserCar(car.data.id, updatedRequestBody)
                expectedCarData = {
                    "id": car.data.id,
                    "carBrandId": requestBody.carBrandId,
                    "carModelId": requestBody.carModelId,
                    "initialMileage": requestBody.mileage,
                    "updatedMileageAt": expect.any(String),
                    "carCreatedAt": expect.any(String),
                    "mileage": updatedRequestBody.mileage,
                    "brand": BRANDS.Audi.title,
                    "model": MODELS.Audi.A6.title,
                    "logo": BRANDS.Audi.logoFilename
                }
                body = await updateCarResponse.json()
        
                expect(body.status).toBe('ok')
                expect(body.data).toEqual(expectedCarData)
                expect(moment(body.data.updatedMileageAt).diff(startTime, 'seconds')).toBeLessThanOrEqual(timeDifference)
                expect(moment(body.data.carCreatedAt).diff(startTime, 'seconds')).toBeLessThanOrEqual(timeDifference)
            })
        
            test("PUT /cars - Should ignore missing brand and model id and update mileage", async({apiNewUser})=>{
                updatedRequestBody = {
                    "mileage": requestBody.mileage + 1
                }
                updateCarResponse = await apiNewUser.cars.updateUserCar(car.data.id, updatedRequestBody)
                expectedCarData = {
                    "id": car.data.id,
                    "carBrandId": requestBody.carBrandId,
                    "carModelId": requestBody.carModelId,
                    "initialMileage": requestBody.mileage,
                    "updatedMileageAt": expect.any(String),
                    "carCreatedAt": expect.any(String),
                    "mileage": updatedRequestBody.mileage,
                    "brand": BRANDS.Audi.title,
                    "model": MODELS.Audi.A6.title,
                    "logo": BRANDS.Audi.logoFilename
                }
                body = await updateCarResponse.json()
        
                expect(body.status).toBe('ok')
                expect(body.data).toEqual(expectedCarData)
                expect(moment(body.data.updatedMileageAt).diff(startTime, 'seconds')).toBeLessThanOrEqual(timeDifference)
                expect(moment(body.data.carCreatedAt).diff(startTime, 'seconds')).toBeLessThanOrEqual(timeDifference)
            })

            test("PUT /cars - Should ignore missing mileage and update brand and model id", async({apiNewUser})=>{
                updatedRequestBody = {
                    "carBrandId": BRANDS.BMW.id,
                    "carModelId": MODELS.BMW.X5.id,
                }
                updateCarResponse = await apiNewUser.cars.updateUserCar(car.data.id, updatedRequestBody)
                expectedCarData = {
                    "id": car.data.id,
                    "carBrandId": updatedRequestBody.carBrandId,
                    "carModelId": updatedRequestBody.carModelId,
                    "initialMileage": requestBody.mileage,
                    "updatedMileageAt": expect.any(String),
                    "carCreatedAt": expect.any(String),
                    "mileage": requestBody.mileage,
                    "brand": BRANDS.BMW.title,
                    "model": MODELS.BMW.X5.title,
                    "logo": BRANDS.BMW.logoFilename
                }
                body = await updateCarResponse.json()
        
                expect(body.status).toBe('ok')
                expect(body.data).toEqual(expectedCarData)
                expect(moment(body.data.updatedMileageAt).diff(startTime, 'seconds')).toBeLessThanOrEqual(timeDifference)
                expect(moment(body.data.carCreatedAt).diff(startTime, 'seconds')).toBeLessThanOrEqual(timeDifference)
            })
        })
    })
    test.describe('Unsuccessfull cases', ()=> {

        test.beforeEach(async ()=> {
            const request = await apiRequest.newContext()
            carsController = new CarsController(request) 
        })

        test("PUT /cars - Should return 401 status code for not authenticated request", async()=>{
            updatedRequestBody = {
                "carBrandId": BRANDS.BMW.id,
                "carModelId": MODELS.BMW.X5.id,
                "mileage": requestBody.mileage + 1
            }
            updateCarResponse = await carsController.updateUserCar(car.data.id, updatedRequestBody)
            expect(updateCarResponse.status()).toBe(401)
            expect(await updateCarResponse.json()).toEqual({ status: 'error', message: 'Not authenticated' })
        })

        test("PUT /cars - Should return 404 status code for non-existing car id", async({apiNewUser})=>{
            updatedRequestBody = {
                "carBrandId": BRANDS.BMW.id,
                "carModelId": MODELS.BMW.X5.id,
                "mileage": requestBody.mileage + 1
            }
            updateCarResponse = await apiNewUser.cars.updateUserCar(0, updatedRequestBody)
            expect(updateCarResponse.status()).toBe(404)
            expect(await updateCarResponse.json()).toEqual({ status: 'error', message: 'Car not found' })
        })

        test("PUT /cars - Should return 400 status code for mileage less than initial mileage", async({apiNewUser})=>{
            updatedRequestBody = {
                "carBrandId": BRANDS.BMW.id,
                "carModelId": MODELS.BMW.X5.id,
                "mileage": requestBody.mileage - 1
            }
            updateCarResponse = await apiNewUser.cars.updateUserCar(car.data.id, updatedRequestBody)
            expect(updateCarResponse.status()).toBe(400)
            expect(await updateCarResponse.json()).toEqual({ status: 'error', message: 'New mileage is less then previous entry' })
        })
    })
})