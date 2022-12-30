// ================================================== //
// Haddock Code Challenge - 30/12/2022                //
// Autor: Pau Núñez Amorós (pau.nunez@protonmail.com) //
// ================================================== //

import MyOrderHandler from "./orderHandler";
import { OrderHandler } from "./interfaces/orderHandler";

const orderHandler: OrderHandler = new MyOrderHandler();

orderHandler.add(12, 8);
orderHandler.add(21, 1);
orderHandler.add(37, 3);

const total = orderHandler.getTotal();

console.log(total); // 16.00€
console.log(orderHandler.items);
