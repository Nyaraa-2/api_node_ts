import { NotFoundException } from "~/utils/exception"

export const UnknownRoutesHandler = () => {
    throw new NotFoundException(`La ressource demandée n'existe pas`)
}