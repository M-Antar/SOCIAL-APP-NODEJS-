import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../../DB/model/user/user.repository";
import { VerifyToken } from "../../utils/common/token";
import { NotFoundException } from "../../utils/common/error";

export const isAuth = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.headers.authorization)
        const authHeader = req.headers.authorization as string
        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" })
        }

        const token = authHeader.split(" ")[1] // remove Bearer
        const payload = VerifyToken(token as string)

        const userRepository = new UserRepository()
        const user = await userRepository.getOne(
            { _id: payload._id },
            {},
            { populate: [{ path: "friends", select: "firstName lastName" }] }
        )

        if (!user) {
            throw new NotFoundException("User Not Found")
        }

        req.user = user
        console.log("✅ Auth middleware passed:", user._id)
        next()
    }
}
