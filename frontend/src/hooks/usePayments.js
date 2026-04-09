import { useEffect, useState } from 'react'
import { paymentsApi } from '@/services/api/payments'

export function usePayments() {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetchPayments() {
    setLoading(true)
    try {
      const res = await paymentsApi.getAll()
      setPayments(res.data?.data ?? res.data ?? [])
      setError(null)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPayments()
  }, [])

  async function createPayment(data) {
    await paymentsApi.create(data)
    await fetchPayments()
  }

  return { payments, loading, error, refetch: fetchPayments, createPayment }
}
