export default function formatCurrency(num) {
  return '$' + Number(num.toFixed(1)).toLocaleString() + ' ';
}

export function calculateTotal(cartItems) {
  return cartItems.reduce((a, c) => a + c.price * c.count, 0);
}