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

// Doubles a string of digits exactly: from the last digit to the first, carrying as needed.
// The text is never turned into a binary number, so no digit is lost at any length.
function doubleDigits(digits) {
  const out = [];
  let carry = 0;
  for (let i = digits.length - 1; i >= 0; i--) {
    const twice = Number(digits[i]) * 2 + carry;
    out.push(twice % 10);
    carry = Math.floor(twice / 10);
  }
  if (carry) out.push(carry);
  return out.reverse().join('');
}

function main(args) {
  if (args.length !== 1) {
    return fail('give exactly one number.');
  }
  const input = args[0];
  if (!PLAIN_DECIMAL.test(input)) {
    return fail(`"${input}" is not a plain decimal number such as 4, -2.5 or 0.75.`);
  }
  const negative = input.startsWith('-');
  const [intPart, fracPart = ''] = (negative ? input.slice(1) : input).split('.');
  // Doubling keeps the same number of decimal places, so the point stays where it was.
  const doubled = doubleDigits(intPart + fracPart);
  const split = doubled.length - fracPart.length;
  // No leading zeros in the whole part (a single "0" stays), no trailing zeros in the fraction.
  const whole = doubled.slice(0, split).replace(/^0+(?=\d)/, '');
  const fraction = doubled.slice(split).replace(/0+$/, '');
  // A negative zero prints as 0.
  const isZero = whole === '0' && fraction === '';
  const sign = negative && !isZero ? '-' : '';
  console.log(fraction ? `${sign}${whole}.${fraction}` : `${sign}${whole}`);
}

main(process.argv.slice(2));
