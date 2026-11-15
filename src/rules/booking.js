export const MAX_PARTY = 6;
export const MIN_SUBTOTAL = 1500;
export const TRANSFER_FEE = 600;
export function validateQuantity(quantity, seats) {
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_PARTY)
    return {
      valid: false,
      message: "Choose between 1 and 6 attendees per experience.",
    };
  if (!Number.isInteger(seats) || quantity > seats)
    return {
      valid: false,
      message:
        seats === 0
          ? "This departure is fully booked. Remove it or choose another experience."
          : `Only ${seats} spots remain. Reduce the attendee count.`,
    };
  return { valid: true, message: "" };
}
export function validateEligibility(age, minimumAge) {
  return Number.isInteger(age) && age >= minimumAge && age <= 100;
}
export function calculateSummary(lines, pickup = "self") {
  const attendees = lines.reduce((n, line) => n + line.quantity, 0);
  const subtotal = lines.reduce(
    (n, line) => n + line.quantity * (line.item?.price ?? 0),
    0,
  );
  const fee = pickup === "f6" && lines.length ? TRANSFER_FEE : 0;
  return { attendees, subtotal, fee, total: subtotal + fee };
}
export function validateBooking(lines, form) {
  const errors = {};
  if (form.name.trim().length < 2 || form.name.trim().length > 80)
    errors.name = "Enter a name between 2 and 80 characters.";
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) ||
    form.email.length > 150
  )
    errors.email = "Enter an email such as explorer@example.com.";
  const minimumAge = Math.max(
    0,
    ...lines.map((line) => line.item?.minAge ?? 0),
  );
  if (!validateEligibility(Number(form.age), minimumAge))
    errors.age = `The youngest attendee must be ${minimumAge}–100 years old for this plan.`;
  if (!["self", "f6"].includes(form.pickup))
    errors.pickup = "Choose a supported meeting option.";
  if (!form.accepted)
    errors.accepted = "Acknowledge that this is a simulated booking.";
  if (!lines.length)
    errors.plan = "Add at least one experience before continuing.";
  for (const line of lines) {
    if (!line.item)
      errors.plan =
        "An experience is no longer listed. Remove it from your plan.";
    else {
      const result = validateQuantity(line.quantity, line.item.seats);
      if (!result.valid) errors.plan = result.message;
    }
  }
  if (
    lines.length &&
    calculateSummary(lines, form.pickup).subtotal < MIN_SUBTOTAL
  )
    errors.minimum =
      "The experience subtotal must be at least PKR 1,500, before transfer fees. Add an attendee or another experience.";
  return errors;
}
