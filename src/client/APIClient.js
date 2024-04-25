import CarsController from "../controllers/CarsController.js";
import AuthController from "../controllers/AuthController.js";
import {request} from "@playwright/test";
import UsersController from "../controllers/UsersController.js";

export default class APIClient {
    constructor(request) {
        this.auth = new AuthController(request)
        this.cars = new CarsController(request)
        this.users = new UsersController(request)
    }

    static async authenticateWithNewUser(registerData){
        const client = await request.newContext()
        const authController = new AuthController(client)
        await authController.signUp(registerData)
        return new APIClient(client)
    }

    static async authenticate(userData){
        const client = await request.newContext()
        const authController = new AuthController(client)
        await authController.signIn(userData)
        return new APIClient(client)
    }
}