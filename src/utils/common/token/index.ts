import jwt, { SignOptions, Secret, JwtPayload } from "jsonwebtoken"
import { devConfig } from "../../../config/env/dev.config"
import { IPayload } from "../interface"


export const GenerateToken = ({
  payload,
  secretKey = devConfig.JWT_SECRET as string,
  options,
}: {
  payload: object
  secretKey?: string
  options?: SignOptions
}) => {
  return jwt.sign(payload, secretKey as Secret, options)
}

export const VerifyToken = (
  token: string,
  secretKey?: string
) => {
  const finalSecret = secretKey ?? (devConfig.JWT_SECRET as string);
  return jwt.verify(token, finalSecret) as IPayload;
};
