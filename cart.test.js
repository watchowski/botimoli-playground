const test = require('node:test');
const assert = require('node:assert');
const { applyCoupon, shipping, paginate, isCouponValid, checkoutTotal } = require('./cart');

test('applyCoupon takes percent off', () => {
  assert.strictEqual(applyCoupon(200, 10), 180);
  assert.strictEqual(applyCoupon(200, 0), 200);
});

test('paginate is 1-based', () => {
  const items = [1, 2, 3, 4, 5];
  assert.deepStrictEqual(paginate(items, 1, 2), [1, 2]);
  assert.deepStrictEqual(paginate(items, 3, 2), [5]);
});
