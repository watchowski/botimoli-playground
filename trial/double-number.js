#!/usr/bin/env node
// Prints a number doubled.
// Usage: node trial/double-number.js <number>
// Example: node trial/double-number.js 4   -> prints 8

const USAGE = 'Usage: node trial/double-number.js <number>';

const input = process.argv[2];

if (input === undefined) {
  console.error(`Error: no number given. ${USAGE}`);
  process.exit(1);
}

const value = Number(input);

if (input.trim() === '' || !Number.isFinite(value)) {
  console.error(`Error: "${input}" is not a number. ${USAGE}`);
  process.exit(1);
}

console.log(value * 2);
