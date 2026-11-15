import test from "node:test";
import assert from "node:assert/strict";
import {
  validateQuantity,
  validateEligibility,
  calculateSummary,
  validateBooking,
} from "./booking.js";
test("ordinary quantity is valid", () =>
  assert.deepEqual(validateQuantity(3, 10), { valid: true, message: "" }));
test("exact six-attendee boundary is valid", () =>
  assert.equal(validateQuantity(6, 10).valid, true));
test("above six-attendee boundary is rejected", () =>
  assert.equal(validateQuantity(7, 10).valid, false));
test("zero, negative, fractional and nonnumeric quantities fail", () => {
  for (const q of [0, -1, 1.5, NaN, "2"])
    assert.equal(validateQuantity(q, 10).valid, false);
});
test("exact inventory is valid; restored over-capacity selection is rejected", () => {
  assert.equal(validateQuantity(2, 2).valid, true);
  assert.equal(validateQuantity(3, 2).valid, false);
  assert.match(validateQuantity(1, 0).message, /fully booked/);
});
test("age boundary is inclusive", () => {
  assert.equal(validateEligibility(16, 16), true);
  assert.equal(validateEligibility(15, 16), false);
});
const form = {
  name: "Demo Explorer",
  email: "explorer@example.com",
  age: "18",
  pickup: "self",
  accepted: true,
};
test("minimum subtotal is inclusive; transfer fee cannot satisfy it", () => {
  const lines = [{ quantity: 1, item: { price: 1500, seats: 6, minAge: 12 } }];
  assert.deepEqual(validateBooking(lines, form), {});
  lines[0].item.price = 1499;
  assert.match(
    validateBooking(lines, { ...form, pickup: "f6" }).minimum,
    /1,500/,
  );
});
test("summary charges transfer once per plan", () =>
  assert.deepEqual(
    calculateSummary(
      [
        { quantity: 2, item: { price: 1800 } },
        { quantity: 1, item: { price: 1200 } },
      ],
      "f6",
    ),
    { attendees: 3, subtotal: 4800, fee: 600, total: 5400 },
  ));
test("removed and sold-out items prevent completion", () => {
  assert.ok(validateBooking([{ quantity: 1, item: null }], form).plan);
  assert.ok(
    validateBooking(
      [{ quantity: 1, item: { price: 1800, seats: 0, minAge: 12 } }],
      form,
    ).plan,
  );
});
