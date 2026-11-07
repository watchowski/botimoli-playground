// Prints a number doubled.
// Usage: node trial/double-number.js <number>
// Example: node trial/double-number.js 4   -> prints 8

const USAGE = 'Usage: node trial/double-number.js <number>';

// Plain decimal only: optional minus sign, digits, optional fraction.
const PLAIN_DECIMAL = /^-?\d+(\.\d+)?$/;

function fail(message) {
  console.error(`Error: ${message} ${USAGE}`);
  process.exitCode = 1;
}

// String() writes very small numbers in exponent form (1e-7); spell those out.
// Results stay far below 1e21, so only negative exponents can occur.
function plainDecimal(n) {
  const match = /^(-?)(\d)(?:\.(\d+))?e-(\d+)$/.exec(String(n));
  if (!match) return String(n);
  const [, sign, lead, rest = '', exponent] = match;
  return `${sign}0.${'0'.repeat(Number(exponent) - 1)}${lead}${rest}`;
}

function main(args) {
  if (args.length !== 1) {
    return fail('give exactly one number.');
  }
  const input = args[0];
  if (!PLAIN_DECIMAL.test(input)) {
    return fail(`"${input}" is not a plain decimal number such as 4, -2.5 or 0.75.`);
  }
  const value = Number(input);
  if (Math.abs(value) > Number.MAX_SAFE_INTEGER) {
    return fail(`"${input}" is too large. The limit is ${Number.MAX_SAFE_INTEGER}.`);
  }
  // String(-0) is "0", so a negative zero prints as 0.
  console.log(plainDecimal(value * 2));
}

main(process.argv.slice(2));
