import { Request, Response, NextFunction, RequestHandler } from "express"
import { ZodType } from "zod"
import { BadRequestException } from "../../utils/common/enum/error"

export const isValid = (schema: ZodType): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = { ...req.body, ...req.params, ...req.query }

    const result = schema.safeParse(data)

    if (!result.success) {
      const errorMessages = result.error.issues.map(issue => ({
        path: issue.path[0] as string,
        message: issue.message,
      }))

      throw new BadRequestException("Validation Error", errorMessages)
    }

    next()
  }
}
