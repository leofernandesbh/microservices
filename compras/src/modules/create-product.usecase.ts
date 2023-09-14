import { prisma } from "../infra/database/prisma-client"
import { KafkaProducer } from "../infra/providers/kafka/producer"

type CreateProductRequest = {
  id: string
  code: string
  description: string
  salePrice: number
  stock: number
}

export class CreateProductUseCase {
  constructor() {}

  async execute({ id, code, description, salePrice, stock }: CreateProductRequest) {
    const product = await prisma.product.findFirst({      
      where: {
        id
      }

    })

    let productCreated

    if (!product) {
      productCreated = await prisma.product.create({
        data: {
          id,
          code,
          description,
          salePrice,
          stock
        }
      })
    }else{
      productCreated = product
    }

    const kafkaProducer = new KafkaProducer()

    await kafkaProducer.execute("product-created", {
      id: productCreated.id,
      code: productCreated.code,
      description: productCreated.description
    })

    return productCreated
  }
}