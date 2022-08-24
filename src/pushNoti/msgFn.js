export const convertTemp = (temperature) => {
  if (temperature === "room") {
    return "상온";
  } else if (temperature === "refrigerating") {
    return "냉장";
  } else {
    return "냉동";
  }
};
