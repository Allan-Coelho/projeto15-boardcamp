function dayToMilliseconds(days) {
  return days * 24 * 60 * 60 * 1000;
}

function millisecondsToDays(milliseconds) {
  return milliseconds / 1000 / 60 / 60 / 24;
}

export { dayToMilliseconds, millisecondsToDays };
