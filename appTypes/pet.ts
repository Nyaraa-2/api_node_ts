export type PetCategory = 'cat' | 'dog'

export interface Pet {
  id: number
  name: string
  type: PetCategory
}

export type HumanCategory = 'male | female'
export interface Human {
  id: number
  name : string
  type : HumanCategory
}