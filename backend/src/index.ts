import express from "express"
import type { Request, Response } from "express"
import cors from "cors"
/* import fs from "fs/promises" */
import fs from "fs"
import { z } from "zod"

/* const fileUpload = require("express-fileupload"); */
const server = express()
const app = express()
server.use(cors())
/* 
app.use(fileUpload()) */

app.use(express.static('database'))

const PizzaSchema = z.object ({

  id: z.string(),
  name: z.string(),
  toppings: z.string().array(),
  url: z.string(),

}).array()
type Pizzas = z.infer<typeof PizzaSchema>

server.get("/", async (req: Request, res: Response) => {
 
  const pizzaData = await JSON.parse(fs.readFileSync('database/pizza.json', 'utf-8'))
  console.log(pizzaData)
  
  const result = PizzaSchema.safeParse(req.query)
  if (!result.success){
    return res.json(pizzaData)
  }
 
  return res.json(result.data)
 
})



/* app.use("/database/pictures", express.static("dist/assets")) */


server.listen(3333) 











/* type User = {
  id: number
  name: string
  age: number
}

const parse = (data: string): User[] => data
    .split("\n")
    .filter(row => !!row)
    .map(row => ({
      id: +row.split(",")[0],
      name: row.split(",")[1],
      age: +row.split(",")[2],
    }))

const stringify = (data: User[]): string => data
    .map(user => `${user.id},${user.name},${user.age}`)
    .join("\n")

const QuerySchema = z.object({
  name: z.string(),
})

// REST API - GET (method) /api/users (path) -> array
// GET /api/users?name=John   /api/users?age=30&name=John  -> array
server.get("/api/users", async (req: Request, res: Response) => {

  const userData = await fs.readFile("./database/users.txt", "utf-8")
  const users = parse(userData)

  const result = QuerySchema.safeParse(req.query)
  if (!result.success)
    return res.json(users)


  let filteredUsers = users.filter(user => user.name.includes(query.name))

  res.json(filteredUsers)
})

// GET /api/users/15 (id!!!!) path variable -> 1 object / HTTP404
server.get("/api/users/:id", async (req: Request, res: Response) => {
  const id = +req.params.id

  const userData = await fs.readFile("./database/users.txt", "utf-8")
  const users = parse(userData)
  let filteredUser = users.find(user => user.id === id)

  if (!filteredUser)
    return res.sendStatus(404)

  res.json(filteredUser)
})

const CreationSchema = z.object({
  name: z.string(),
  age: z.string(),
  id: z.string(),
})

// POST /api/users - works, but not best practice yet
server.post("/api/users", async (req: Request, res: Response) => {

  const result = CreationSchema.safeParse(req.query)
  if (!result.success)
    return res.sendStatus(400)

  const userData = await fs.readFile("./database/users.txt", "utf-8")
  const users = parse(userData)
  users.push({ name: result.data.name, age: +result.data.age, id: +result.data.id })
  await fs.writeFile("./database/users.txt", stringify(users), "utf-8")

  res.sendStatus(200)
})

// DELETE /api/users/15 (id!!!!) path variable -> HTTP200
server.delete("/api/users/:id", async (req: Request, res: Response) => {
  const id = +req.params.id

  const userData = await fs.readFile("./database/users.txt", "utf-8")
  const users = parse(userData)
  let filteredUsers = users.filter(user => user.id !== id)

  await fs.writeFile("./database/users.txt", stringify(filteredUsers), "utf-8")

  res.sendStatus(200)
})

server.listen(3333)
 */