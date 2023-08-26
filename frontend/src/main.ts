import "./style.css";
import axios from "axios";
import { z } from "zod";
import cors from 'cors';

const PizzaSchema = z.object ({
  id: z.number(),
  name: z.string(),
  toppings: z.string().array(),
  url: z.string(),
})

type Pizza = z.infer<typeof PizzaSchema>

type Order = {
  name: string,
  zipCode: string,
  items: {
    id: number,
    amount: number
  }[]
}

// app state
let isLoading = false
let pizzas: Pizza[] = []
let selectedPizza: Pizza | null = null
let amount = 0
let order: Order | null = null
let isSending = false

// mutation
const getPizzas = async () => {
  isLoading = true

  const response = await axios.get("http://localhost:3333/api/pizza")
  isLoading = false

  const result = PizzaSchema.array().safeParse(response.data)
  if (!result.success)
    pizzas = []
  else
    pizzas = result.data
}


const selectPizza = (id: number) => {
  selectedPizza = pizzas.find(pizza => pizza.id === id) || null
}

const updateAmount = (num: number) => {
  amount = num
}

const updateOrderWithItem = () => {
  order = order ? {
    name: order.name,
    zipCode: order.zipCode,
    items: [
      ...order.items.filter(item => item.id !== selectedPizza!.id),
      { id: selectedPizza!.id, amount }
    ]
  } : {
    name: "",
    zipCode: "",
    items: [
      { id: selectedPizza!.id, amount }
    ]
  }
}

const deleteItem = () => {
  if(order)
    order.items.splice(order.items.findIndex(item => item.id === selectedPizza!.id),1)
         } 

// render
const renderList = (pizzas: Pizza[]) => {
  const container = document.getElementById("list")!

  for (const pizza of pizzas) {
    const pizzaParagraph = document.createElement("p")
    pizzaParagraph.innerText = pizza.name
    pizzaParagraph.id = "" + pizza.id
    container.appendChild(pizzaParagraph)
    pizzaParagraph.addEventListener("click", selectListener)
  }
}

const renderSelected = (pizza: Pizza) => {
  const content = `
    <div>
      <h1>${pizza.name}</h1>
      <p>${pizza.toppings}</p>
      <img src="${pizza.url}" class="h-80 w-80" style="object-fit: cover">
      <input type="number" id="amount" class="text-black" />
      <button id="add" >Add to order</button>
    </div>
  `
  document.getElementById("selected")!.innerHTML = content
  document.getElementById("add")!.addEventListener("click", addListener);
  (document.getElementById("amount") as HTMLInputElement).addEventListener("change", changeListener)
}

const renderOrder = (order: Order) => {
  const content = `
    <div>
      <h1>Your order</h1>
      ${order.items.map(item => `
        <div class="flex">
        <p class="p-2">${item.amount} x ${pizzas.find(pizza => pizza.id === item.id)!.name}</p>
        <button id="remove" class="m-1 p-1 bg-red-800">Remove from order</button>
        </div>
      `).join(" ")}
      <input placeholder="Name" id="orderName" class="text-black m-3" value="${order.name}" type="text">
      <input placeholder="Zip code" class="text-black m-3" id="zipCode" value="${order.zipCode}" type="number">
      <button id="sendOrder">Send order</button>
    </div>
  `
  document.getElementById("order")!.innerHTML = content;
  (document.getElementById("orderName") as HTMLInputElement).addEventListener("change", personListener);
  (document.getElementById("zipCode") as HTMLInputElement).addEventListener("change", personListener);
  (document.getElementById("sendOrder") as HTMLButtonElement).addEventListener("click", sendListener);
  document.querySelectorAll("#remove").forEach((el)=>{
    el.addEventListener("click", deleteListener)
    })
}

// eventListeners

const init = async () => {
  await getPizzas()
  if (pizzas.length)
    renderList(pizzas)
}

const selectListener = (event: Event) => {
  selectPizza(+(event.target as HTMLParagraphElement).id)
  if (selectedPizza)
    renderSelected(selectedPizza)
}

const changeListener = (event: Event) => {
  updateAmount(+(event.target as HTMLInputElement).value)
}

const personListener = () => {
  order!.name = (document.getElementById("orderName") as HTMLInputElement).value
  order!.zipCode = (document.getElementById("zipCode") as HTMLInputElement).value
  if (order)
  renderOrder(order)
}

const deleteListener = () => {
  deleteItem()
  if (order)
  renderOrder(order)
}

const addListener = () => {
 updateOrderWithItem()
  if (order)
    renderOrder(order)
}

const sendListener = () => {
  if (order)
  send(order)
}

//send

async function send(order:Order) {
  
    try {
      isLoading = true
      const response = await axios("http://localhost:3333/api/order", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(order),
      });
      isLoading = false
      const result = await response.data;
      console.log("Success:", result);
      (document.getElementById("sendOrder") as HTMLButtonElement).style.display = "none" // :)
      let message = document.createElement("p");
      document.getElementById("order")!.appendChild(message);
      message.style.backgroundColor="red"
      message.innerHTML = "Order sent, thank you!"
    } catch (error) {
      console.error("Error:", error);
    }
  }


init()
