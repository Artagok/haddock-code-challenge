## Haddock Code Challenge

- 👦 **Author**: Pau Núñez Amorós
- 📆 **Date**: 30/12/2022
- 💬 **Language**: TypeScript

### 🚀 How to run it

1. Either clone the repo (`git clone https://github.com/Artagok/haddock-code-challenge.git`) or use degit (`degit artagok/haddock-code-challenge`), which downloads it to the current directory.
2. Once in the directory (where `package.json` is located) just run `npm test`.

### ❓ Important information

#### 📄 Files (most important in **bold**)

- **`index.ts`** - Point of entry, executes all tests from a JSON file sequentially
- **`orderHandler.ts`** - Logic of the module
- `config/` - Contains configurable JSON files (items and discounts)
- `interfaces/` - TS interfaces for structured types
- `tests/` - Contains a list of tests to be run
- `utils/` - Utilities and helper functions

#### 🔧 Discount execution order

I found that the most logical order of execution for the discounts is the following:

1. **Menu Pack**:
   Set of items that go together and amount to a specific set price.
   Once taken into account, they do no longer participate in following discounts.

2. **X-for-1**:
   Group items in groups of X, X-1 items are free. i.e: 2-for-1, every 2 items, 1 is free; 3-for-1, every 3 items, 2 are free, etc.

3. **Spend X save Y**:
   Last discount to be applied, as it only takes into account the resulting total price after every item-specific discounts have been applied. Return Y discount if total price amounts to X or more.

#### ↕️ Extensibility

The code is written to be **highly extensible** (logic has been generalized to include a wider range of use cases than those requested on the instructions) and **easily configurable** (right now from JSON files, but sourcing from a DB would require no change in the logic).

0. Totally **new discounts** can be added in the config and, once defined, they are automatically applied, since discounts are all run in a loop (ordered ascending by their `priority` prop).

1. **Menu Pack**:
   Works for any number of menu packs, not just the one established on the instructions (`12` + `21` + `37`).

2. **X-for-1**:
   Works for any X. So it is possible to have 3-for-1 promotions, etc.

3. **Spend X save Y**:
   Works for any X and any Y, not just -5€ when reaching an order of 20€ o more, as established on the instructions.

#### ➕ Extra

It is strongly recommended to run the code using **`bash/Git bash`** as the output to the console when running the test list is colored and formatted for it.
