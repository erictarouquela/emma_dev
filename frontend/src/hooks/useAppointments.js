import { useEffect, useState } from 'react'
import { appointmentsApi } from '@/services/api/appointments'

export function useAppointments() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetchAppointments() {
    setLoading(true)
    try {
      const res = await appointmentsApi.getAll()
      // Handle both { data: [...] } and { data: { data: [...] } } shapes
      setAppointments(res.data?.data ?? res.data ?? [])
      setError(null)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  async function createAppointment(data) {
    const res = await appointmentsApi.create(data)
    await fetchAppointments()
    return res
  }

  async function updateAppointment(id, data) {
    const res = await appointmentsApi.update(id, data)
    await fetchAppointments()
    return res
  }

  return {
    appointments,
    loading,
    error,
    refetch: fetchAppointments,
    createAppointment,
    updateAppointment,
  }
}
