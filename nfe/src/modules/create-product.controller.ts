import { Request, Response } from "express"
import { CreateProductUseCase } from "./create-product.usecase"

export class CreateProductController {
  async handle(request: Request, response: Response) {
    const { code, description } = request.body

    const useCase = new CreateProductUseCase()

    const result = await useCase.execute({
      code,
      description
    })

    return response.status(201).json(result)
  }
}