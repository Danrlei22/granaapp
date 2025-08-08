function calculateTotal(data) {
  if (!Array.isArray(data) || data.length === 0) {
    return 0;
  }

  return data.reduce((sum, { amount }) => {
    const parsed = parseFloat(String(amount).replace(",", "."));

    return sum + (isNaN(parsed) ? 0 : parsed);
  }, 0);
}

export default calculateTotal;
