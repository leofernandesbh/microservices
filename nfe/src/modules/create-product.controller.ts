import { Request, Response } from "express"
import { CreateProductUseCase } from "./create-product.usecase"

export class CreateProductController {
  async handle(request: Request, response: Response) {
    const { integrationId, code, description } = request.body

    const useCase = new CreateProductUseCase()

    const result = await useCase.execute({
      integrationId,
      code,
      description
    })

    return response.status(201).json(result)
  }
}