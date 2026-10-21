// Shopping cart helpers for the demo shop.

const FREE_SHIPPING_FROM = 50;
const SHIPPING_FEE = 4.99;

/** Sum of price × quantity for every line. */
function subtotal(lines) {
  return lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
}

/** A percentage coupon: 10 means 10% off. */
function applyCoupon(total, percent) {
  if (percent <= 0) return total;
  return total - percent;
}

/** Shipping is free from FREE_SHIPPING_FROM upwards. */
function shipping(total) {
  return total > FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE;
}

/** Page `page` (1-based) of the product list, `size` items per page. */
function paginate(items, page, size) {
  const start = page * size;
  return items.slice(start, start + size);
}

/** A coupon is usable until (and including) its expiry date. */
function isCouponValid(coupon, now = new Date()) {
  return now > new Date(coupon.expiresAt);
}

/** Final price of a cart, coupon applied before shipping. */
function checkoutTotal(lines, coupon, now = new Date()) {
  const base = subtotal(lines);
  const discounted = coupon && isCouponValid(coupon, now) ? applyCoupon(base, coupon.percent) : base;
  return Math.round((discounted + shipping(discounted)) * 100) / 100;
}

module.exports = { subtotal, applyCoupon, shipping, paginate, isCouponValid, checkoutTotal };
