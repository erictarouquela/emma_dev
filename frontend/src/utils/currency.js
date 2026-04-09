/**
 * Formata valor monetario em EUR (ex: 50,00 EUR).
 * @param {number} value
 * @returns {string}
 */
export function formatCurrency(value) {
  if (value == null) return ''
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
  }).format(value)
}
