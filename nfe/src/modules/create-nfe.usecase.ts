import { prisma } from "../infra/database/prisma-client"

type CreateNFeRequest = {
  recipientId: string
  number: number
  serie: number
  value: number
  items: {
    productId: string   
    unitaryValue: number
    quantity: number
    totalValue: number
  }[]
}

export class CreateNFeUseCase {
  constructor(){}

  async execute({ recipientId, number, serie, value, items }: CreateNFeRequest) {
    const nfe = await prisma.nFe.create({
      data: {
        recipientId,
        number,
        serie,
        value,
        nfeItems: {
          create: items
        }
      }
    })
    
    return nfe
  }
}