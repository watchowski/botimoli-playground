// Adds two numbers given on the command line and prints their sum.
// Usage: node trial/add-numbers.js <number> <number>
// Example: node trial/add-numbers.js 2 3   -> prints 5

const usage = 'Usage: node trial/add-numbers.js <number> <number>';
const args = process.argv.slice(2);

if (args.length !== 2) {
  console.error(`Expected 2 numbers but got ${args.length}. ${usage}`);
  process.exit(1);
}

const numbers = args.map((text) => {
  const value = Number(text);
  if (text.trim() === '' || Number.isNaN(value)) {
    console.error(`"${text}" is not a number. ${usage}`);
    process.exit(1);
  }
  return value;
});

console.log(numbers[0] + numbers[1]);
