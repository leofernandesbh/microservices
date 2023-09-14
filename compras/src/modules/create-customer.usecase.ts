import { prisma } from "../infra/database/prisma-client"
import { KafkaProducer } from "../infra/providers/kafka/producer"

type CreateCustomerRequest = {
  id: string
  name: string,
  email: string
  password: string
  phone: string
}

export class CreateCustomerUseCase {
  constructor(){}
  
  async execute({ id, name, email, password, phone }: CreateCustomerRequest) {
    const customer = await prisma.customer.findFirst({      
      where: {
        OR: [
          {
            id
          },
          {
            email
          }
        ]
      }

    })

    let customerCreated

    if (!customer) {
      customerCreated = await prisma.customer.create({
        data: {
          id,
          name,
          email,
          password,
          phone
        }
      })
    }else{
      customerCreated = customer
    }    

    const kafkaProducer = new KafkaProducer()

    await kafkaProducer.execute("customer-created", {
      id: customerCreated.id,
      name: customerCreated.name,
      email: customerCreated.email
    })

    return customerCreated
  }
}