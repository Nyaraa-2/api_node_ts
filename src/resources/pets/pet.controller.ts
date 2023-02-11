import { type Request, type Response, Router } from 'express'
import { validationResult } from 'express-validator'
import { PatchPetValidator, PetValidator } from '../../middlewares/validation/PetValidator'
import { validate } from '../../middlewares/validation/validation'
import { BadRequestException, NotFoundException } from '../../utils/exception'
import { PetService } from './pet.service'

const PetController = Router()
const service = new PetService()

PetController.get('/', async (req: Request, res: Response) => {
  return res.status(200).json(await service.findAll())
})

PetController.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  if (!Number.isInteger(id)) {
    throw new BadRequestException('ID non valide')
  }

  const pet = await service.findOne(id)

  if (pet == null) {
    throw new NotFoundException('Animal introuvable')
  }

  return res
    .status(200)
    .json(pet)
})

PetController.post('/',
  PetValidator(), validate,
  async (req: Request, res: Response, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    } else {
      const createdPet = await service.create(req.body)

      return res
        .status(201)
        .json(createdPet)
    }
  })

PetController.patch('/:id',
  PatchPetValidator,
  validate,
  async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    if (!Number.isInteger(id)) {
      throw new BadRequestException('ID invalide')
    }

    const updatedPet = await service.update(req.body, id)

    return res
      .status(201)
      .json(updatedPet)
  })

PetController.delete('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id)

  if (!Number.isInteger(id)) {
    throw new BadRequestException('ID invalide')
  }

  return res
    .status(204)
    .json(service.delete(id))
})

export { PetController }
