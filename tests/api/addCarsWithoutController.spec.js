
import moment from 'moment'
import { BRANDS } from '../../src/data/brands'
import { MODELS } from '../../src/data/models'
import { test, expect, request as apiRequest} from '../../src/fixtures/customFixtures'
import { USER_STORAGE_STATE_PATH } from '../../src/constants'


test.describe('Cars API', ()=> {

    const carsApiRequestPath = '/api/cars'

        test.describe('Successfull car creation', ()=> {

            test.afterAll(async ()=> {
                const request = await apiRequest.newContext({
                    storageState: USER_STORAGE_STATE_PATH
                })

                const carsResponse = await request.get(carsApiRequestPath)
                const cars = await carsResponse.json()

                await Promise.all(
                    cars.data.map((car) => request.delete(`${carsApiRequestPath}/${car.id}`))
                )
            })

            test('Create all cars', async ({request})=>{

            for (const key of Object.keys(BRANDS)) {

                const brand = BRANDS[key]

                    for (const model of Object.values(MODELS[brand.title])) {

                        await test.step(`Create car with brand "${brand.title}" and model ${model.title}`, async ()=>{
                            const requestBody = {
                                "carBrandId": brand.id,
                                "carModelId": model.id,
                                "mileage": Math.floor(Math.random() * 100)
                            }
                            const startTime = new Date()
                            const response = await request.post(carsApiRequestPath, {
                                data: requestBody
                            })

                            const body = await response.json()
                            const expected = {
                                "id": expect.any(Number),
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

                            expect(response.status()).toBe(201)
                            expect(body.status).toBe('ok')
                            expect(body.data).toEqual(expected)

                            const timeDifference = 3
                            expect(moment(body.data.updatedMileageAt).diff(startTime, 'seconds')).toBeLessThanOrEqual(timeDifference)
                            expect(moment(body.data.carCreatedAt).diff(startTime, 'seconds')).toBeLessThanOrEqual(timeDifference)
                        })
                    }
                }
            })
        })
        test.describe('Unsuccessfull cars creation', ()=> {
            test("should return 401 status code for not authenticated request", async()=>{
                const request = await apiRequest.newContext()
                const requestBody = {
                        "carBrandId": BRANDS.Audi.id,
                        "carModelId": MODELS.Audi.A6.id,
                        "mileage": Math.floor(Math.random() * 100)
                    }
                const response = await request.post(carsApiRequestPath, {
                    data: requestBody
                })
                expect(response.status()).toBe(401)
                expect(await response.json()).toEqual({ status: 'error', message: 'Not authenticated' })
            })
            test("should return 404 status code for not existing brand", async({request})=>{
                const requestBody = {
                        "carBrandId": 0,
                        "carModelId": MODELS.Audi.A6.id,
                        "mileage": Math.floor(Math.random() * 100)
                    }
                const response = await request.post(carsApiRequestPath, {
                    data: requestBody
                })
                expect(response.status()).toBe(404)
                expect(await response.json()).toEqual({ status: 'error', message: 'Brand not found' })
            })
            test("should return 404 status code for not existing model", async({request})=>{
                const requestBody = {
                        "carBrandId": BRANDS.Audi.id,
                        "carModelId": 0,
                        "mileage": Math.floor(Math.random() * 100)
                    }
                const response = await request.post(carsApiRequestPath, {
                    data: requestBody
                })
                expect(response.status()).toBe(404)
                expect(await response.json()).toEqual({ status: 'error', message: 'Model not found' })
            })
            test("should return 400 status code for invalid brand", async({request})=>{
                const requestBody = {
                        "carBrandId": "abc",
                        "carModelId": MODELS.Audi.A6.id,
                        "mileage": Math.floor(Math.random() * 100)
                    }
                const response = await request.post(carsApiRequestPath, {
                    data: requestBody
                })
                expect(response.status()).toBe(400)
                expect(await response.json()).toEqual({ status: 'error', message: 'Invalid car brand type' })
            })
            test("should return 400 status code for invalid model", async({request})=>{
                const requestBody = {
                        "carBrandId": BRANDS.Audi.id,
                        "carModelId": "abc",
                        "mileage": Math.floor(Math.random() * 100)
                    }
                const response = await request.post(carsApiRequestPath, {
                    data: requestBody
                })
                expect(response.status()).toBe(400)
                expect(await response.json()).toEqual({ status: 'error', message: 'Invalid car model type' })
            })
            test("should return 400 status code for invalid mileage", async({request})=>{
                const requestBody = {
                        "carBrandId": BRANDS.Audi.id,
                        "carModelId": MODELS.Audi.A6.id,
                        "mileage": "abc"
                    }
                const response = await request.post(carsApiRequestPath, {
                    data: requestBody
                })
                expect(response.status()).toBe(400)
                expect(await response.json()).toEqual({ status: 'error', message: 'Invalid mileage type' })
            })
            test("should return 400 status code for missing brand", async({request})=>{
                const requestBody = {
                        "carModelId": MODELS.Audi.A6.id,
                        "mileage": Math.floor(Math.random() * 100)
                    }
                const response = await request.post(carsApiRequestPath, {
                    data: requestBody
                })
                expect(response.status()).toBe(400)
                expect(await response.json()).toEqual({ status: 'error', message: 'Car brand id is required' })
            })
            test("should return 400 status code for missing model", async({request})=>{
                const requestBody = {
                        "carBrandId": BRANDS.Audi.id,
                        "mileage": Math.floor(Math.random() * 100)
                    }
                const response = await request.post(carsApiRequestPath, {
                    data: requestBody
                })
                expect(response.status()).toBe(400)
                expect(await response.json()).toEqual({ status: 'error', message: 'Car model id is required' })
            })
            test("should return 400 status code for missing mileage", async({request})=>{
                const requestBody = {
                        "carBrandId": BRANDS.Audi.id,
                        "carModelId": MODELS.Audi.A6.id
                    }
                const response = await request.post(carsApiRequestPath, {
                    data: requestBody
                })
                expect(response.status()).toBe(400)
                expect(await response.json()).toEqual({ status: 'error', message: 'Mileage is required' })
            })
        })      
    })