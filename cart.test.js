const test = require('node:test');
const assert = require('node:assert');
const { applyCoupon, shipping, paginate, isCouponValid, checkoutTotal } = require('./cart');

test('applyCoupon takes percent off', () => {
  assert.strictEqual(applyCoupon(200, 10), 180);
  assert.strictEqual(applyCoupon(200, 0), 200);
});
