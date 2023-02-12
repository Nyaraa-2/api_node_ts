import { body, check, checkSchema, oneOf } from "express-validator"
import { PetCategory } from "~/appTypes/pet"
export const PetValidator = () => {
    return [
        body('name')
            .notEmpty()
            .trim()
            .toLowerCase()
            .isLength({ min: 5, max: 25 })
            .withMessage("The animal's name must contain a minimum of 5 characters and a maximum of 25"),
        oneOf([
            check('type').toLowerCase().isIn(['cat' as PetCategory, 'dog' as PetCategory])], "Le type de l'animal ne peut qu'être un 'chien' ou un 'chat'")
    ]
}

export const PatchPetValidator =
    checkSchema({
        id: {
            in: ['params'],
            errorMessage: 'ID is wrong',
            isInt: true,
        }
    })
