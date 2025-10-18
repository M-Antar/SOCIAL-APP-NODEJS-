import { Socket } from "socket.io"
import { VerifyToken } from "../../utils/common/token"
import { UserRepository } from "../../DB/model/user/user.repository"
import { NotFoundException } from "../../utils/common/error"

export const socketAuth = async (socket: Socket, next: Function) => {
  try {
    const { authorization } = socket.handshake.auth
    if (!authorization) throw new Error("No token provided")

    // Remove "Bearer " if exists
    const token = authorization.startsWith("Bearer ")
      ? authorization.split(" ")[1]
      : authorization

    const payload = VerifyToken(token)

    const userRepository = new UserRepository()
    const user = await userRepository.getOne({ _id: payload._id })
    if (!user) throw new NotFoundException("user not found")

    socket.data.user = user
    next()
  } catch (error) {
    next(new Error("invalid token"))
  }
}
