import { prisma } from "../infra/database/prisma-client"

type CreateCustomerRequest = {
  name: string,
  email: string
  password: string
  phone: string
}

export class CreateCustomerUseCase {
  constructor(){}
  
  async execute({ name, email, password, phone }: CreateCustomerRequest) {
    const customer = await prisma.customer.findFirst({
      where: {
        email
      }
    })

    if (customer) {
      throw new Error("Customer already exists")
    }

    const customerCreated = await prisma.customer.create({
      data: {
        name,
        email,
        password,
        phone
      }
    })

    return customerCreated
  }
}