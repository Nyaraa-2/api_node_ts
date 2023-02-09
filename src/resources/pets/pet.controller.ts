import { Router } from "express";
import { BadRequestException, NotFoundException } from "~/utils/exception";
import { PetService } from "./pet.service";

const PetController = Router()
const service = new PetService()

PetController.get('/', (req, res) => {
    return res.status(200).json(service.findAll())
})

PetController.get('/:id', (req, res) => {
    const id = Number(req.params.id)
  
    if (!Number.isInteger(id)) {
      throw new BadRequestException('ID non valide')
    }
  
    const pet = service.findOne(id)
  
    if (!pet) {
      throw new NotFoundException('Animal introuvable')
    }
  
    return res
      .status(200)
      .json(pet)
  })

  PetController.post('/', (req, res) => {
    const createdPet = service.create(req.body)
  
    return res
      .status(201)
      .json(createdPet)
  })

  PetController.patch('/:id', (req, res) => {
    const id = Number(req.params.id)
  
    if (!Number.isInteger(id)) {
      throw new BadRequestException('ID invalide')
    }
  
    const updatedPet = service.update(req.body, id)
  
    return res
      .status(201)
      .json(updatedPet)
  })

  PetController.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
  
    if (!Number.isInteger(id)) {
      throw new BadRequestException('ID invalide')
    }
  
    return res
      .status(204)
      .json(service.delete(id))
  })

export { PetController }