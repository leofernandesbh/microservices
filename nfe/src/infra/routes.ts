import { Router } from "express"
import { CreateNFeController } from "../modules/create-nfe.controller"
import { CreateProductController } from "../modules/create-product.controller"
import { CreateRecipientController } from "../modules/create-recipient.controller"

const router = Router()

router.post("/recipient", (request, response) => {
  new CreateRecipientController().handle(request, response)
})

router.post("/product", (request, response) => {
  new CreateProductController().handle(request, response)
})

router.post("/nfe", (request, response) => {
  new CreateNFeController().handle(request, response)
})

export {router}