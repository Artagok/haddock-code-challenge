import { Item } from "./interfaces/item";
import { OrderHandler } from "./interfaces/orderHandler";

import ITEMS from "./config/items.json";
import DISCOUNTS from "./config/discounts.json";

export default class MyOrderHandler implements OrderHandler {
  items: Item[];
  total: number;

  constructor() {
    this.items = [];
    this.total = 0;
  }

  add = (id: number, quantity: number) => {
    this.items.push({
      id,
      name: ITEMS.find((i) => i.id === id)?.name ?? "",
      quantity,
      price: ITEMS.find((i) => i.id === id)?.price ?? -1,
    });
  };

  getTotal = () => {
    // Apply discounts in specified order (ascending by priority)
    DISCOUNTS.sort((a, b) => a.priority - b.priority).forEach((discount) => {
      this.total += this.discountFunctions[discount.id].call(this, discount);
    });
    return `${this.total.toFixed(2)}€`;
  };

  discountFunctions = {
    menuPack: ({ packs }: { packs: { items: number[]; price: number }[] }) => {
      // For eack menu pack
      let total = 0;
      packs.forEach((pack) => {
        const menu = this.items.filter((i) => pack.items.includes(i.id));
        // If all items included in the menu pack are present in current order
        if (menu.length === pack.items.length) {
          // Get the smallest (min) number of group we can make
          // and subtract this quantity to items in the current order
          const min = Math.min(...menu.map((i) => i.quantity));
          this.items.forEach((i) => {
            i.quantity -= pack.items.includes(i.id) ? min : 0;
          });
          // Accumulate min * pack price
          total += min * pack.price;
        }
      });
      return total;
    },
    xFor1: ({ items, X }: { items: number[]; X: number }) => {
      // For each item in X-for-1 discount
      let total = 0;
      items.forEach((item) => {
        // Make as many groups of X quantity as possible
        const idx = this.items.findIndex((i) => i.id === item);
        if (idx !== -1) {
          // Get integer and reminder part of current item quantity / X
          const qtty = this.items[idx].quantity;
          const [integer, reminder] = [Math.floor(qtty / X), qtty % X];
          // Accumulate price and set item's quantity to the reminder
          // which could not be grouped in promo, and is a leftover
          total += integer * this.items[idx].price;
          this.items[idx].quantity = reminder;
        }
      });
      return total;
    },
    spendXsaveY: ({ X, Y }: { X: number; Y: number }) => {
      // Account for the leftover items, which didn't get any promotion
      // before checking if X amount is met
      let leftover = this.items.reduce(
        (acc, val) => acc + val.quantity * val.price,
        0
      );
      // Return Y discount if total price amounts to X or more
      return (leftover -= this.total + leftover >= X ? Y : 0);
    },
  };
}
