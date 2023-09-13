import { prisma } from "../infra/database/prisma-client"

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
    
    return purchase
  }
}