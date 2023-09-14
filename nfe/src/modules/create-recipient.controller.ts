import { Request, Response } from "express"
import { CreateRecipientUseCase } from "./create-recipient.usecase"

export class CreateRecipientController {
  async handle(request: Request, response: Response) {
    const { integrationId, name, email } = request.body

    const useCase = new CreateRecipientUseCase()

    try{
      const result = await useCase.execute({ integrationId, name, email })

      return response.status(201).json(result)
    } catch(error){
      return response.status(400).json(error)
    }
  }
}