import { prisma } from "../infra/database/prisma-client"

type CreateProductRequest = {
  code: string
  description: string
  salePrice: number
  stock: number
}

export class CreateProductUseCase {
  constructor() {}

  async execute({ code, description, salePrice, stock }: CreateProductRequest) {
    const product = await prisma.product.create({
      data: {
        code,
        description,
        salePrice,
        stock
      }
    })

    return product
  }
}