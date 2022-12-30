import { Item } from "./item";

// Represents an order
interface OrderHandler {
  // === Properties === //
  // Current order items
  items: Item[];
  // Current order total price
  total: number;

  // === Methods === //
  // Adds item with @id with a set @quantity to the items list
  // It also automatically loads price for each item from source (JSON/DB)
  add: (id: number, quantity: number) => void;

  // Returns the current order (items)
  getItems: () => Item[];

  // Returns total price for the order
  // It is important to note that discounts are applied sequentially
  // following their priority value (ascending order, 0: highest priority)
  // 0 - Menu Pack
  // 1 - X-for-1
  // 2 - Spend X save Y
  getTotal: () => string;

  // Object grouping all discount functions
  discountFunctions: {
    // Set of items that go together and amount to a specific set price
    // Once taken into account, they do no longer participate in following discounts
    // Works for multiple menu packs, not just one (Extensibility)
    menuPack: ({
      packs,
    }: {
      packs: { items: number[]; price: number }[];
    }) => number;
    // Group items in groups of X, X-1 items are free.
    // i.e: 2-for-1, every 2, 1 is free; 3-for-1, every 3, 2 are free, etc.
    // Works for any X (Extensibility)
    xFor1: ({ items, X }: { items: number[]; X: number }) => number;
    // Last discount to be applied, as it only takes into account the resulting
    // total price after every item-specific discounts have been applied
    // Return Y discount if total price amounts to X or more
    // Works for any X and any Y (Extensibility)
    spendXsaveY: ({ X, Y }: { X: number; Y: number }) => number;
  };
}

export { OrderHandler };
