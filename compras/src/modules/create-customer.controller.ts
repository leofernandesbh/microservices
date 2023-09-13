import { Request, Response } from "express"
import { CreateCustomerUseCase } from "./create-customer.usecase"

export class CreateCustomerController {
  async handle(request: Request, response: Response) {
    const {name, email, password, phone} = request.body

    const useCase = new CreateCustomerUseCase()

    try{
      const result = await useCase.execute({name, email, password, phone})

      return response.status(201).json(result)
    } catch(error){
      return response.status(400).json(error)
    }
  }
}