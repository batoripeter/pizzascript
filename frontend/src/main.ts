import "./style.css";
import http from "axios";
import { z } from "zod";

const PizzaResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  toppings: z.string(),
  price: z.number(),
  link: z.string(),
});
const PizzaArraySchema = z.array(PizzaResponseSchema);
type PizzaResponse = z.infer<typeof PizzaArraySchema>;

let pizzaName: string[] = [];
let pizzaPrice: number[] = [];
let pizzaPiece: number[] = [];

const pizzaFunction = async () => {
  const response = await http.get("http://localhost:3000/api/pizzas");
  const pizzaFromJson: PizzaResponse = response.data;
  const result = PizzaArraySchema.safeParse(pizzaFromJson);

  if (!result.success) {
    alert("Pizza Error");
  }

  let i = 0;
  while (i < 7) {
    let pizzaNewName = document.createElement("h1") as HTMLParagraphElement;
    pizzaNewName.innerHTML = [i + 1] + ". " + pizzaFromJson[i].name;
    pizzaNewName.setAttribute("id", "pizzaName" + [i]);
    (document.getElementById("pizza-section" + [i]) as HTMLElement).appendChild(pizzaNewName);
    pizzaName.push(pizzaFromJson[i].name)

    let pizzaNewImage = document.createElement("img") as HTMLImageElement;
    pizzaNewImage.src = pizzaFromJson[i].link;
    (document.getElementById("pizza-section" + [i]) as HTMLElement).appendChild(pizzaNewImage);

    let pizzaNewToppings = document.createElement("p") as HTMLParagraphElement;
    pizzaNewToppings.innerHTML = "Toppings: " + pizzaFromJson[i].toppings;
    (document.getElementById("pizza-section" + [i]) as HTMLElement).appendChild(pizzaNewToppings);

    let pizzaNewPrice = document.createElement("p") as HTMLParagraphElement;
    pizzaNewPrice.innerHTML = "Price: " + pizzaFromJson[i].price;
    pizzaNewPrice.setAttribute("id", "pizzaPrice" + [i]);
    (document.getElementById("pizza-section" + [i]) as HTMLElement).appendChild(pizzaNewPrice);
    pizzaPrice.push(+pizzaNewPrice.innerHTML);

    let pizzaNewPieceInput = document.createElement(
      "input"
    ) as HTMLInputElement;
    pizzaNewPieceInput.setAttribute("type", "number");
    pizzaNewPieceInput.setAttribute("id", "pizzaPiece" + [i]);
    (document.getElementById("pizza-section" + [i]) as HTMLElement).appendChild(
      pizzaNewPieceInput
    );
    pizzaPiece.push(+pizzaNewPieceInput.innerHTML);

    i++;
  }
};

pizzaFunction();

console.log(pizzaName.at(0));

const pizzaOneName = pizzaName[0];
const pizzaTwoName = pizzaName[1];
const pizzaThreeName = pizzaName[2];
const pizzaFourName = pizzaName[3];
const pizzaFiveName = pizzaName[4];
const pizzaSixName = pizzaName[5];
const pizzaSevenName = pizzaName[6];
const pizzaOnePrice = pizzaPrice[0];
const pizzaTwoPrice = pizzaPrice[1];
const pizzaThreePrice = pizzaPrice[2];
const pizzaFourPrice = pizzaPrice[3];
const pizzaFivePrice = pizzaPrice[4];
const pizzaSixPrice = pizzaPrice[5];
const pizzaSevenPrice = pizzaPrice[6];

const customerName = document.getElementById("name")! as HTMLInputElement;
const customerZipCode = document.getElementById("zipcode")! as HTMLInputElement;
const customerCity = document.getElementById("city")! as HTMLInputElement;
const customerStreet = document.getElementById("street")! as HTMLInputElement;
const customerHouseNumber = document.getElementById(
  "house"
)! as HTMLInputElement;
const customerEmail = document.getElementById("email")! as HTMLInputElement;
const customerPhoneNumber = document.getElementById(
  "phone"
)! as HTMLInputElement;
const pizzaOneCount = document.getElementById(
  "pizzaPiece0"
)! as HTMLInputElement;
const pizzaTwoCount = document.getElementById(
  "pizzaPiece1"
)! as HTMLInputElement;
const pizzaThreeCount = document.getElementById(
  "pizzaPiece2"
)! as HTMLInputElement;
const pizzaFourCount = document.getElementById(
  "pizzaPiece3"
)! as HTMLInputElement;
const pizzaFiveCount = document.getElementById(
  "pizzaPiece4"
)! as HTMLInputElement;
const pizzaSixCount = document.getElementById(
  "pizzaPiece5"
)! as HTMLInputElement;
const pizzaSevenCount = document.getElementById(
  "pizzaPiece6"
)! as HTMLInputElement;

const CustomerSchema = z.object({
  name: z.string(),
  zipcode: z.string(),
  city: z.string(),
  street: z.string(),
  house: z.string(),
  email: z.string(),
  phone: z.string(),
});

type Customer = z.infer<typeof CustomerSchema>;

const PizzaSchema = z.object({
  pizzaname: z.string(),
  piece: z.string(),
  price: z.string(),
});

type Pizza = z.infer<typeof PizzaSchema>;

const OrderSchema = z.object({
  customer: z.object({
    customername: z.string(),
    zipcode: z.string(),
    city: z.string(),
    street: z.string(),
    house: z.string(),
    email: z.string(),
    phone: z.string(),
  }),
  date: z.string(),
  pizza: z.array(z.string()),
  totalprice: z.number(),
});

type Order = z.infer<typeof OrderSchema>;

let amountArray: number[] = [];
let pizzaOrders: Pizza[] = [];
let priceSum = 0;
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const today = `${year}-${month}-${day}`.toString();

document.getElementById("addtoorder")!.addEventListener("click", () => {
  const customerData: Customer = {
    name: customerName.value,
    zipcode: customerZipCode.value,
    city: customerCity.value,
    street: customerStreet.value,
    house: customerHouseNumber.value,
    email: customerEmail.value,
    phone: customerPhoneNumber.value,
  };

  document.getElementById("outname")!.textContent = customerData.name;
  document.getElementById("outaddress")!.textContent =
    customerData.zipcode +
    " " +
    customerData.city +
    " " +
    customerData.street +
    " " +
    customerData.house;
  document.getElementById("outemail")!.textContent = customerData.email;
  document.getElementById("outphone")!.textContent = customerData.phone;

  const pizzaOrder: Pizza[] = [
    {
      pizzaname: "" + pizzaOneName,
      piece: "" + pizzaOneCount,
      price: "" + pizzaOnePrice,
    },
    {
      pizzaname: "" + pizzaTwoName,
      piece: "" + pizzaTwoCount,
      price: "" + pizzaTwoPrice,
    },
    {
      pizzaname: "" + pizzaThreeName,
      piece: "" + pizzaThreeCount,
      price: "" + pizzaThreePrice,
    },
    {
      pizzaname: "" + pizzaFourName,
      piece: "" + pizzaFourCount,
      price: "" + pizzaFourPrice,
    },
    {
      pizzaname: "" + pizzaFiveName,
      piece: "" + pizzaFiveCount,
      price: "" + pizzaFivePrice,
    },
    {
      pizzaname: "" + pizzaSixName,
      piece: "" + pizzaSixCount,
      price: "" + pizzaSixPrice,
    },
    {
      pizzaname: "" + pizzaSevenName,
      piece: "" + pizzaSevenCount,
      price: "" + pizzaSevenPrice,
    },
  ];

  pizzaOrder.forEach((pizzaData) => {
    const count = parseInt(pizzaData.piece);
    if (count > 0) {
      const multiply = count * parseInt(pizzaData.price);
      const nameElement = document.createElement("h2");
      nameElement.textContent = pizzaData.pizzaname;
      document.getElementById("pizzaordername")!.appendChild(nameElement);
      const pieceElement = document.createElement("h2");
      pieceElement.textContent = pizzaData.piece + " pc";
      document.getElementById("pizzaorderpiece")!.appendChild(pieceElement);
      const priceElement = document.createElement("h2");
      priceElement.textContent = multiply.toString() + " Ft";
      document.getElementById("pizzaorderprice")!.appendChild(priceElement);

      let newOrder = {
        pizzaname: pizzaData.pizzaname,
        piece: pizzaData.piece,
        price: pizzaData.price,
      };
      pizzaOrders.push(newOrder);

      amountArray.push(multiply);
    }
  });

  function sumAmountArray(numbers: number[]): number {
    let sum = 0;
    for (const num of numbers) {
      sum += num;
    }
    return sum;
  }

  priceSum = sumAmountArray(amountArray);

  if (priceSum !== 0) {
    const totalPriceElement = document.createElement("h2");
    totalPriceElement.textContent = priceSum.toString() + " Ft";
    document.getElementById("totalprice")!.appendChild(totalPriceElement);
  }

  const orderCheck = document.getElementById("ordercheck")!;
  orderCheck.removeAttribute("style");

  const orderButton = document.getElementById("order")!;
  orderButton.removeAttribute("style");
});

document.getElementById("order")!.addEventListener("click", () => {
  async function postJSON(data: any) {
    try {
      const response = await http("http://localhost:3000/api/orders", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      });

      console.log(data);

      const result = await response.data;
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const orderData: Order = {
    customer: {
      customername: customerName.value,
      zipcode: customerZipCode.value,
      city: customerCity.value,
      street: customerStreet.value,
      house: customerHouseNumber.value,
      email: customerEmail.value,
      phone: customerPhoneNumber.value,
    },
    date: today,
    pizza: pizzaOrders,
    totalprice: priceSum,
  };

  postJSON(orderData);
});
