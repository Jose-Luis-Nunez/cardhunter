const complete = `
╔══════════════════════════════════╗
║ Combination: 1                   ║
╚══════════════════════════════════╝
💰 Total card cost: €9.10 with delivery: €15.10

🛒 Edeka (2 items):
  ➤ Glurak VMAX: €9.00
  ➤ Super Angel: €0.05

🛒 Aldi (1 items):
  ➤ Nestball: €0.05

╔══════════════════════════════════╗
║ Combination: 2                   ║
╚══════════════════════════════════╝
💰 Total card cost: €9.11 with delivery: €15.11

🛒 Edeka (1 items):
  ➤ Glurak VMAX: €9.00

🛒 Aldi (2 items):
  ➤ Nestball: €0.05
  ➤ Super Angel: €0.06

╔══════════════════════════════════╗
║ Combination: 3                   ║
╚══════════════════════════════════╝
💰 Total card cost: €9.12 with delivery: €15.12

🛒 Edeka (2 items):
  ➤ Glurak VMAX: €9.00
  ➤ Super Angel: €0.05

🛒 Rossmann (1 items):
  ➤ Nestball: €0.07

╔══════════════════════════════════╗
║ Combination: 4                   ║
╚══════════════════════════════════╝
💰 Total card cost: €10.11 with delivery: €16.11

🛒 Netto (1 items):
  ➤ Glurak VMAX: €10.00

🛒 Aldi (2 items):
  ➤ Nestball: €0.05
  ➤ Super Angel: €0.06
`.trim();

const moreExpensiveItemToReduceTotalCost = `
╔══════════════════════════════════╗
║ Combination: 4                   ║
╚══════════════════════════════════╝
💰 Total card cost: €10.11 with delivery: €16.11

🛒 Netto (1 items):
  ➤ Glurak VMAX: €10.00

🛒 Aldi (2 items):
  ➤ Nestball: €0.05
  ➤ Super Angel: €0.06
`.trim();

const bestCombinationSameShop = `
╔══════════════════════════════════╗
║ Combination: 1                   ║
╚══════════════════════════════════╝
💰 Total card cost: €9.10 with delivery: €15.10

🛒 Edeka (2 items):
  ➤ Glurak VMAX: €9.00
  ➤ Super Angel: €0.05

🛒 Aldi (1 items):
  ➤ Nestball: €0.05
`.trim();

const secondBestCombinationSameShop = `
╔══════════════════════════════════╗
║ Combination: 2                   ║
╚══════════════════════════════════╝
💰 Total card cost: €9.11 with delivery: €15.11

🛒 Edeka (1 items):
  ➤ Glurak VMAX: €9.00

🛒 Aldi (2 items):
  ➤ Nestball: €0.05
  ➤ Super Angel: €0.06
`.trim();

module.exports = {
    complete,
    moreExpensiveItemToReduceTotalCost,
    bestCombinationSameShop,
    secondBestCombinationSameShop,
};
