import { pets } from '../../data'
import { BadRequestException, NotFoundException } from '../../utils/exception'
import type { Pet } from '../../appTypes/pet'
import { db } from '~/config'
import { isNil } from 'ramda'
import dbQuery from '~/utils/dbQuery'
import message from '~/utils/errorMessage'
export class PetService {
  pets: Pet[] = pets
  async findAll(): Promise<Pet[]> {
    try {
      const query = await db.query(dbQuery.getAll)
      return query.rows
    } catch (error) {
      throw new BadRequestException(` ${error}`)
    }
  }

  async findOne(id: number): Promise<Pet | null> {
    if (!Number.isInteger(id)) {
      throw new BadRequestException(message.invalidId)
    }
    const query = await db.query(dbQuery.getById, [`${id}`])
    return query.rows.length > 0 ? query.rows : new NotFoundException(message.animalNotFound)
  }

  async update(petData: Partial<Pet>, id: number): Promise<Pet | undefined> {
    const query = await db.query(dbQuery.getById, [`${id}`])
    if (query.rows.length === 0) {
      throw new NotFoundException(message.animalNotFound)
    }
    const petFind: Pet = query.rows[0];
    if (!isNil(petFind)) {
      petFind.name = isNil(petData.name) ? petFind.name : petData.name
      petFind.type = isNil(petData.type) ? petFind.type : petData.type
      const { rows } = await db.query(dbQuery.updateById, [petFind.name, petFind.type, `${id}`])
      return rows;
    }
  }

  async create(petData: Omit<Pet, 'id'>): Promise<Pet> {
    const { name, type } = { ...petData }
    try {
      const query = await db.query(dbQuery.create, [name, type])
      return query.rows
    } catch (error) {
      throw new BadRequestException(`${message.database} ${error}`)
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const { rows } = await db.query(dbQuery.getById, [`${id}`])
      rows.length > 0 ? await db.query(dbQuery.deleteById, [`${id}`]) : new NotFoundException(message.animalNotFound)
    } catch (error) {
      throw new BadRequestException(`${message.database} ${error}`)
    }
  }
}
