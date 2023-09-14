import { prisma } from "../infra/database/prisma-client"
import { KafkaProducer } from "../infra/providers/kafka/producer"

type CreatePurchaseRequest = {
  customerId: string
  value: number
  items: {
    productId: string
    quantity: number
    totalValue: number
  }[]
}

export class CreatePurchaseUseCase {
  constructor(){}

  async execute({ customerId, value, items }: CreatePurchaseRequest) {
    const purchase = await prisma.purchase.create({
      data: {
        customerId,
        value,
        purcharseItems: {
          create: items
        }
      }
    })

    const kafkaProducer = new KafkaProducer()

    await kafkaProducer.execute("new-purchase", {
      id: purchase.id,
      customerId: purchase.customerId,
      value: purchase.value,
      items
    })
    
    return purchase
  }
}