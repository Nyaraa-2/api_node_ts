import cors from "cors";
import express from "express";
import { PetController } from '../src/resources/pets/pet.controller'
import { config } from "./config";
import { ExceptionsHandler } from "./middlewares/exceptions.handler";
import { UnknownRoutesHandler } from "./middlewares/unknowRoutes.handler";

const app = express()
app.use(express.json())
app.use(cors())

app.use('/pet', PetController)
app.get('/', (req, res) => res.send('🏠'))
app.all('*', UnknownRoutesHandler)
app.use(ExceptionsHandler)

app.listen(config.API_PORT, () => console.log(config.API_PORT))