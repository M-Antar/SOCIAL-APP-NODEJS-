import { Router } from "express";
import { AuthService } from "./auth.service";
import { isValid } from "../../middlewear/auth/validation.middlewear";
import * as authValidation from "./auth.validation"
import { isAuth } from "../../middlewear/authintication/authintication.middlewear";

const AuthRouter = Router()
const authService = new AuthService()
AuthRouter.post("/register",isValid(authValidation.registerSchema ),authService.register)
AuthRouter.post("/verify-account",authService.verifyAccount)
AuthRouter.post("/login",isValid(authValidation.loginSchema),authService.login)

export default AuthRouter