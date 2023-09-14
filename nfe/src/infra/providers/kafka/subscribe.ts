import { prisma } from "../../database/prisma-client";
import { getKafkaConsumer } from "./consumer";

type RecipientConsumer = {
  id: string
  name: string
  email: string
}

type ProductConsumer = {
  id: string
  code: string
  description: string
}

type PurchaseConsumer = {
  id: string
  customerId: string
  value: number
  items: {
    productId: string
    quantity: number
    totalValue: number
  }[]
}

export async function subscribeKafkaConsumers() {
  const consumer = await getKafkaConsumer()

  await consumer.subscribe({
    topic: "customer-created",
    fromBeginning: true
  })

  await consumer.subscribe({
    topic: "product-created",
    fromBeginning: true
  })

  await consumer.subscribe({
    topic: "new-purchase",
    fromBeginning: true
  })

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      if (!message.value) {
        return
      }

      const messageToString = message.value.toString()

      if (messageToString) {        
        switch (topic) {
          case "customer-created":  
            const recipientReceived = JSON.parse(messageToString) as RecipientConsumer   
            
            const recipientAlreadyExists = await prisma.recipient.findFirst({
              where: {
                integrationId: recipientReceived.id
              }
            })
            
            if (!recipientAlreadyExists) {
              await prisma.recipient.create({
                data: {
                  integrationId: recipientReceived.id,
                  name: recipientReceived.name,
                  email: recipientReceived.email
                }
              })

              console.log('✅'.concat(` RECIPIENT ${recipientReceived.name} [${recipientReceived.id}] REGISTERED`))  
            }else{
              console.log('❌'.concat(` RECIPIENT ${recipientReceived.id} ALREADY EXISTS`))  
            }            

            break;        
          case "product-created":            
            const productReceived = JSON.parse(messageToString) as ProductConsumer 
            console.log(productReceived.id)
            const productAlreadyExists = await prisma.product.findFirst({
              where: {
                integrationId: productReceived.id
              }
            })

            if (!productAlreadyExists) {
              await prisma.product.create({
                data: {
                  integrationId: productReceived.id,
                  code: productReceived.code,
                  description: productReceived.description
                }
              })

              console.log('✅'.concat(` PRODUCT ${productReceived.code} REGISTERED`))  
            }else{
              console.log('❌'.concat(` PRODUCT ${productReceived.id} ALREADY EXISTS`))
            }
            
            break;
          case "new-purchase":            
            const purchaseReceived = JSON.parse(messageToString) as PurchaseConsumer

            const recipient = await prisma.recipient.findFirst({
              where: {
                integrationId: purchaseReceived.customerId
              }              
            })

            if (!recipient) {
              console.log(`RECIPIENT ${purchaseReceived.customerId} NOT FOUND`)
              return
            }

            let nfeItems: {
              productId: string
              quantity: number
              totalValue: number
            }[] = []

            for (const item of purchaseReceived.items) {
              const product = await prisma.product.findFirst({
                where: {
                  integrationId: item.productId
                }
              })

              if (!product) {
                console.log(`PRODUCT ${item.productId} NOT FOUND`)
                return
              }

              nfeItems.push({
                productId: product.id,
                quantity: item.quantity,
                totalValue: item.totalValue
              })
            }

            await prisma.nFe.create({
              data: {
                number: 1,
                serie: 1,
                value: purchaseReceived.value,
                recipientId: recipient.id,
                nfeItems: {
                  create: nfeItems
                }                
              }
            })

            console.log('✅'.concat(` INVOICE ISSUED FOR PURCHASE ${purchaseReceived.id}`))

            break;
          default:
            console.log(`TOPIC ${topic} NOT IMPLEMENTED`)
            break;
        }
      }
    },
  })
}

subscribeKafkaConsumers()

