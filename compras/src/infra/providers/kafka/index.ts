import { Kafka } from 'kafkajs'
 
const kafka = new Kafka({
  brokers: ['climbing-lacewing-10220-us1-kafka.upstash.io:9092'],
  sasl: {
    mechanism: 'scram-sha-256',
    username: 'Y2xpbWJpbmctbGFjZXdpbmctMTAyMjAkPUUjeyR9hXIl-SYKA3uKFy2wDSMlBUA',
    password: 'ZWU0NzkxNTgtMWI1Yi00YjhmLWFjMmEtZTRkYWJhMmU3N2Vl',
  },
  ssl: true,
})

export { kafka }