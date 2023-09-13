import { prisma } from "../infra/database/prisma-client"

type CreateRecipientRequest = {
  name: string,
  email: string  
}

export class CreateRecipientUseCase {
  constructor(){}
  
  async execute({ name, email }: CreateRecipientRequest) {
    const recipient = await prisma.recipient.findFirst({
      where: {
        email
      }
    })

    if (recipient) {
      throw new Error("Recipient already exists")
    }

    const recipientCreated = await prisma.recipient.create({
      data: {
        name,
        email,
      }
    })

    return recipientCreated
  }
}