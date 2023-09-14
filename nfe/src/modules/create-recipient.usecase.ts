import { prisma } from "../infra/database/prisma-client"

type CreateRecipientRequest = {
  integrationId: string,
  name: string,
  email: string  
}

export class CreateRecipientUseCase {
  constructor(){}
  
  async execute({ integrationId, name, email }: CreateRecipientRequest) {
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
        integrationId,
        name,
        email,
      }
    })

    return recipientCreated
  }
}