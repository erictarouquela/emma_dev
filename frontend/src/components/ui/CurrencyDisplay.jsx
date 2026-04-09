import { formatCurrency } from '@/utils/currency'

export function CurrencyDisplay({ amount, className }) {
  return (
    <span className={className}>
      {formatCurrency(amount)}
    </span>
  )
}
