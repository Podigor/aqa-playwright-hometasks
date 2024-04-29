import CarsController from '../../src/controllers/CarsController'
import { BRANDS } from '../../src/data/brands'
import { MODELS } from '../../src/data/models'
import { test, expect, request as apiRequest} from '../../src/fixtures/customFixtures'

test.describe('Get Cars API - Models and Brands', ()=> {
    let response
    let body

    const cars = [
        BRANDS.Audi,
        BRANDS.BMW,
        BRANDS.Ford,
        BRANDS.Porsche,
        BRANDS.Fiat,
    ]
    const models = [
        MODELS.Audi.TT,
        MODELS.Audi.R8,
        MODELS.Audi.Q7,
        MODELS.Audi.A6,
        MODELS.Audi.A8,
        MODELS.BMW[3],
        MODELS.BMW[5],
        MODELS.BMW.X5,
        MODELS.BMW.X6,
        MODELS.BMW.Z3,
        MODELS.Ford.Fiesta,
        MODELS.Ford.Focus,
        MODELS.Ford.Fusion,
        MODELS.Ford.Mondeo,
        MODELS.Ford.Sierra,
        MODELS.Porsche[911],
        MODELS.Porsche.Cayenne,
        MODELS.Porsche.Panamera,
        MODELS.Fiat.Palio,
        MODELS.Fiat.Ducato,
        MODELS.Fiat.Panda,
        MODELS.Fiat.Punto,
        MODELS.Fiat.Scudo
    ]
    test.describe('Successfull cases for authorized requests', ()=> {
     
        test('GET car/brands - Should return all car brands for authorized user', async ({apiNewUser})=>{
            response = await apiNewUser.cars.getAllCarBrands()
            body = await response.json()

            expect(response.status()).toBe(200)
            expect(body.status).toBe('ok')
            expect(body.data).toEqual(cars)
        })

        for (const key of Object.keys(BRANDS)) {
            test(`GET car/brands/{id} - Should return car brand by id:${key} for authorized user`, async ({apiNewUser})=>{
                response = await apiNewUser.cars.getCarBrand(BRANDS[key].id)
                body = await response.json()

                expect(response.status()).toBe(200)
                expect(body.status).toBe('ok')
                expect(body.data).toEqual(BRANDS[key])
            })
        }
        
        test('GET car/models - Should return all car models for authorized user', async ({apiNewUser})=>{
            response = await apiNewUser.cars.getAllCarModels()
            body = await response.json()

            expect(response.status()).toBe(200)
            expect(body.status).toBe('ok')
            expect(body.data).toEqual(models)
        })

        for (const key of Object.keys(BRANDS)) {
            const brand = BRANDS[key]
            for (const model of Object.values(MODELS[brand.title])) {
                test(`GET car/models/{id} - Should return car model by id for authorized user - ${brand.title} and ${model.title}`, async ({apiNewUser})=>{
                    response = await apiNewUser.cars.getCarModel(model.id)
                    body = await response.json()

                    expect(response.status()).toBe(200)
                    expect(body.status).toBe('ok')
                    expect(body.data).toEqual(model)
                })
            }
        }
    })    
})
    test.describe('Successfull cases for unauthorized requests', ()=> {
        let carsController
        test.beforeEach(async ()=> {
            const request = await apiRequest.newContext()
            carsController = new CarsController(request)  
            })

            test('GET car/brands - Should return all car brands for unauthorized user', async ()=>{
                response = await carsController.getAllCarBrands()
                body = await response.json()

                expect(response.status()).toBe(200)
                expect(body.status).toBe('ok')
                expect(body.data).toEqual(cars)
            })

            for (const key of Object.keys(BRANDS)) {
                test(`GET car/brands/{id} - Should return car brand by id:${key} for unauthorized user`, async ()=>{
                    response = await carsController.getCarBrand(BRANDS[key].id)
                    body = await response.json()

                    expect(response.status()).toBe(200)
                    expect(body.status).toBe('ok')
                    expect(body.data).toEqual(BRANDS[key])
                })
            }

            test('GET car/models - Should return all car models for unauthorized user', async ()=>{
                response = await carsController.getAllCarModels()
                body = await response.json()

                expect(response.status()).toBe(200)
                expect(body.status).toBe('ok')
                expect(body.data).toEqual(models)
            })

            for (const key of Object.keys(BRANDS)) {
                const brand = BRANDS[key]
                for (const model of Object.values(MODELS[brand.title])) {
                    test(`GET car/models/{id} - Should return car model by id for unauthorized user - ${brand.title} and ${model.title}`, async ()=>{
                        response = await carsController.getCarModel(model.id)
                        body = await response.json()

                        expect(response.status()).toBe(200)
                        expect(body.status).toBe('ok')
                        expect(body.data).toEqual(model)
                    })
                }
            }
        })
    test.describe('Unsuccessfull cases', ()=> {

        test('GET car/brands/{id} - Should return 404 code for non-existing brand id ', async ({apiNewUser})=>{
            response = await apiNewUser.cars.getCarBrand(0)
            body = await response.json()

            expect(response.status()).toBe(404)
            expect(body.status).toBe('error')
            expect(body.message).toBe('No car brands found with this id')   
        })

        test('GET car/models/{id} - Should return 404 code for non-existing model id ', async ({apiNewUser})=>{
            response = await apiNewUser.cars.getCarModel(0)
            body = await response.json()

            expect(response.status()).toBe(404)
            expect(body.status).toBe('error')
            expect(body.message).toBe('No car models found with this id')   
        })
    })