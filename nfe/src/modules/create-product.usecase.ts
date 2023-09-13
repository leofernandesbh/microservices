import { prisma } from "../infra/database/prisma-client"

type CreateProductRequest = {
  code: string
  description: string
}

export class CreateProductUseCase {
  constructor() {}

  async execute({ code, description }: CreateProductRequest) {
    const product = await prisma.product.create({
      data: {
        code,
        description
      }
    })

    return product
  }
}