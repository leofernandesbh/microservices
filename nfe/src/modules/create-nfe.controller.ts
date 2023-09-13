import { Request, Response } from "express"
import { CreateNFeUseCase } from "./create-nfe.usecase"

export class CreateNFeController {
  async handle(request: Request, response: Response) {
    const { recipientId, number, serie, value, items } = request.body

    const useCase = new CreateNFeUseCase()

    const result = await useCase.execute({ recipientId, number, serie, value, items })

    return response.status(201).json(result)
  }
}