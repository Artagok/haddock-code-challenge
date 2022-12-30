// ================================================== //
// Haddock Code Challenge - 30/12/2022                //
// Autor: Pau Núñez Amorós (pau.nunez@protonmail.com) //
// ================================================== //

import MyOrderHandler from "./orderHandler";
import { OrderHandler } from "./interfaces/orderHandler";

import colorString from "./utils/colorString";

import TESTS from "./tests/tests.json";

// Seconds to wait between each test run
const SECONDS = 1;

// Run all tests sequentially
TESTS.forEach(({ order, expectedPrice }, i) => {
  setTimeout(() => {
    console.log(
      colorString({
        string: `Running test ${i + 1}`,
        backGround: "BgYellow",
        foreGround: "FgBlack",
        bold: true,
        spaceAround: true,
      }),
      ""
    );

    let orderHandler: OrderHandler = new MyOrderHandler();

    order.forEach(({ id, quantity }) => {
      orderHandler.add(id, quantity);
    });

    console.table(orderHandler.getItems());

    const ep = `${expectedPrice.toFixed(2)}€`;
    console.log(
      `Expected total price: ${colorString({
        string: ep,
        bold: true,
        foreGround: "FgYellow",
      })}`
    );

    const total = orderHandler.getTotal();
    console.log(
      `Computed total price: ${colorString({
        string: total,
        bold: true,
        foreGround: "FgYellow",
      })}`
    );

    const pass = ep === total;
    console.log(
      `${pass ? "✔️" : "❌"} ${colorString({
        string: `Test ${i + 1} ${pass ? "passed" : "failed"}`,
        foreGround: pass ? "FgGreen" : "FgRed",
        spaceAround: true,
        bold: true,
      })}`,
      "\n\n"
    );
  }, SECONDS * 1e3 * i + 1);
});
