import { prisma } from "../infra/database/prisma-client"

type CreateProductRequest = {
  integrationId: string,
  code: string
  description: string
}

export class CreateProductUseCase {
  constructor() {}

  async execute({ integrationId, code, description }: CreateProductRequest) {
    const product = await prisma.product.create({
      data: {
        integrationId,
        code,
        description
      }
    })

    return product
  }
}