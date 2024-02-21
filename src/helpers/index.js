function currencyFormat(num) {
  return (
    "Rp" +
    parseInt(num)
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
  );
}
function decimalFormat(num) {
  return (
    "" +
    parseInt(num)
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
  );
}

export default {
  currencyFormat,
  decimalFormat,
};
