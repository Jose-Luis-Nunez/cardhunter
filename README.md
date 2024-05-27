# Project to check cards on cardmarket

## Prerequisites

Make sure the following software components are installed on your system:
- [Node.js](https://nodejs.org/) (Version 12 or higher)
- [npm](https://www.npmjs.com/)

## Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Install Jest
npm install --save-dev jest
```

---
### Run the full cardhunter test suite
#### It will fetch the expected cards and provide you the best combination.
```bash
npx playwright test cardhunter.spec.js
```
Customizing Links
You can define the links that cardhunter.spec.js will use to crawl by updating the links.txt file located at:
```bash
https://example.com/card1
https://example.com/card2
```
---
### Run the offline cardhunter
#### If you want to understand the algorithm or you want to extend the current logic you can try out your expected test data agains the offlineHunter.js
```bash
node runOfflineHunter.js`
```

Whenever you run an updated version of the algorithm check to run the new logic agains the give unit test: 

```bash
npx jest
```

