import { pets } from "~/data";
import { BadRequestException, NotFoundException } from "~/utils/exception";
import { Pet } from "~~/appTypes/pet";

export class PetService {
    pets: Pet[] = pets
    findAll(): Pet[] {
        return this.pets
    }

    findOne(id: number): Pet | undefined {
        if (!Number.isInteger(id)) {
            throw new BadRequestException('ID non valide')
        }
        return this.pets.find(p => p.id === id)
    }

    update(petData: Partial<Pet>, id: number): Pet | undefined {
        const index = this.pets.findIndex(pet => pet.id === id)
        if (index === -1) {
          throw new NotFoundException('Animal introuvable')
        }
        if(petData.id){
            delete petData.id;
        }
        this.pets[index] = { ...this.pets[index], ...petData }
        return this.pets[index]
    }

    create(petData: Omit<Pet, 'id'>): Pet {
        const newPet: Pet = {
          ...petData,
          id: Math.floor(Math.random() * 100)
        }
        this.pets.push(newPet)
        return newPet
    }

    delete(id: number) {
        this.pets = this.pets.filter(pet => pet.id !== id)
      }
}