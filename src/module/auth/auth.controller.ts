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
AuthRouter.post("/send-otp", authService.sendOtp);
AuthRouter.patch("/update-password", isValid(authValidation.updatePasswordSchema) ,authService.updatePass);
AuthRouter.patch("/update-basic",isAuth(),isValid(authValidation.updateBasicSchema), authService.updateBasic);
AuthRouter.patch("/update-email", isValid(authValidation.updateEmailSchema),authService.updateEmail);



export default AuthRouter