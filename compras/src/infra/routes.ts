import { Router } from "express"
import { CreateCustomerController } from "../modules/create-customer.controller"
import { CreateProductController } from "../modules/create-product.controller"
import { CreatePurchaseController } from "../modules/create-purchase.controller"

const router = Router()

router.post("/customer", (request, response) => {
  new CreateCustomerController().handle(request, response)
})

router.post("/product", (request, response) => {
  new CreateProductController().handle(request, response)
})

router.post("/purchase", (request, response) => {
  new CreatePurchaseController().handle(request, response)
})

export {router}