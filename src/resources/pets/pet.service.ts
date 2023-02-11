import { pets } from '../../data'
import { BadRequestException, DataBaseException, NotFoundException } from '../../utils/exception'
import type { Pet } from '../../appTypes/pet'
import { db } from '~/config'

export class PetService {
  pets: Pet[] = pets
  async findAll(): Promise<Pet[]> {
    try {
      const query = await db.query('SELECT id, name, type FROM public.animal')
      return query.rows
    } catch (error) {
      throw new DataBaseException(`Erreur lors de l'insertion en base : ${error}`)
    }
  }

  async findOne(id: number): Promise<Pet | undefined> {
    if (!Number.isInteger(id)) {
      throw new BadRequestException('ID non valide')
    }
    return this.pets.find(p => p.id === id)
  }

  async update(petData: Partial<Pet>, id: number): Promise<Pet | undefined> {
    const index = this.pets.findIndex(pet => pet.id === id)
    if (index === -1) {
      throw new NotFoundException('Animal introuvable')
    }
    if (petData.id != null) {
      delete petData.id
    }
    this.pets[index] = { ...this.pets[index], ...petData }
    return this.pets[index]
  }

  async create(petData: Omit<Pet, 'id'>): Promise<Pet> {
    const { name, type } = { ...petData }
    try {
      const query = await db.query('INSERT INTO public.animal(name, type) VALUES ($1, $2) RETURNING *', [name, type])
      return query.rows
    } catch (error) {
      throw new DataBaseException(`Erreur lors de l'insertion en base : ${error}`)
    }
  }

  delete(id: number): void {
    this.pets = this.pets.filter(pet => pet.id !== id)
  }
}
