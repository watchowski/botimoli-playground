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

test('shipping is free from 50 upwards', () => {
  assert.strictEqual(shipping(49.99), 4.99);
  assert.strictEqual(shipping(50), 0);
  assert.strictEqual(shipping(80), 0);
});

test('coupon valid through the whole expiry day (date-only)', () => {
  const c = { expiresAt: '2026-10-21' };
  assert.strictEqual(isCouponValid(c, new Date('2026-10-21T23:59:59Z')), true);
  assert.strictEqual(isCouponValid(c, new Date('2026-10-22T00:00:00Z')), false);
});

test('coupon with full timestamp is valid up to and including it', () => {
  const c = { expiresAt: '2026-10-21T12:00:00Z' };
  assert.strictEqual(isCouponValid(c, new Date('2026-10-21T12:00:00Z')), true);
  assert.strictEqual(isCouponValid(c, new Date('2026-10-21T12:00:01Z')), false);
});

test('checkoutTotal applies valid coupon before shipping, ignores expired', () => {
  const lines = [{ price: 20, quantity: 3 }];
  const now = new Date('2026-10-21T10:00:00Z');
  assert.strictEqual(checkoutTotal(lines, { percent: 25, expiresAt: '2026-10-21' }, now), 49.99);
  assert.strictEqual(checkoutTotal(lines, { percent: 25, expiresAt: '2026-10-20' }, now), 60);
});
