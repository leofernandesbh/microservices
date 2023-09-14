import { kafka } from "."

export class KafkaProducer {
  async execute(topic: string, message: any){
    const producer = kafka.producer()

    await producer.connect()
    
    await producer.send({
      topic,
      messages: [
        { value: JSON.stringify(message) }
      ]
    })

    console.log('📤'.concat(` MESSAGE SENT TO TOPIC ${topic}`))
    console.log('📎'.concat(' MESSAGE: ').concat(JSON.stringify(message)))

    await producer.disconnect()
  }
}