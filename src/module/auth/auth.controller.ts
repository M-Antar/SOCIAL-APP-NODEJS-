import { Router } from "express";
import { AuthService } from "./auth.service";
import { isValid } from "../../middlewear/auth/validation.middlewear";
import * as authValidation from "./auth.validation"

const AuthRouter = Router()
const authService = new AuthService()
AuthRouter.use("/register",isValid(authValidation.registerSchema ),authService.register)
export default AuthRouter