import { Request, Response } from "express"
import { CreatePurchaseUseCase } from "./create-purchase.usecase"

export class CreatePurchaseController {
  async handle(request: Request, response: Response) {
    const { customerId, value, items } = request.body

    const useCase = new CreatePurchaseUseCase()

    const result = await useCase.execute({ customerId, value, items })

    return response.status(201).json(result)
  }
}