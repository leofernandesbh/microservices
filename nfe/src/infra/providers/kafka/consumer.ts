import { Consumer } from "kafkajs"
import { kafka } from "."

let kafkaConsumer: Consumer | null

export async function getKafkaConsumer() {
  if (kafkaConsumer) {
    return kafkaConsumer
  }

  kafkaConsumer = kafka.consumer({
    groupId: 'APP_PURCHASES',
  })  

  await kafkaConsumer.connect()

  return kafkaConsumer
}