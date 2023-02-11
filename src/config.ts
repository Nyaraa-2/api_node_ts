import { Pool } from 'pg'
import 'dotenv/config'

export const config = {
    API_PORT: 3000
}

export const db = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
})