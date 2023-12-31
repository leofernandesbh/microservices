import { Request, Response } from "express"
import { CreateProductUseCase } from "./create-product.usecase"

export class CreateProductController {
  async handle(request: Request, response: Response) {
    const { id, code, description, salePrice, stock } = request.body

    const useCase = new CreateProductUseCase()

    const result = await useCase.execute({
      id,
      code,
      description,
      salePrice,
      stock
    })

    return response.status(201).json(result)
  }
}