import { useState, useEffect } from 'react'
import { appointmentsApi } from '@/services/api/appointments'
import { paymentsApi } from '@/services/api/payments'
import { enrollmentsApi } from '@/services/api/enrollments'
import { studentsApi } from '@/services/api/students'

export function useDashboard() {
  const [data, setData] = useState({
    appointments: [],
    payments: [],
    enrollments: [],
    students: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetchAll() {
    setLoading(true)
    const [appts, pmts, enrolls, studs] = await Promise.allSettled([
      appointmentsApi.getAll(),
      paymentsApi.getAll(),
      enrollmentsApi.getAll(),
      studentsApi.getAll(),
    ])

    setData({
      appointments:
        appts.status === 'fulfilled'
          ? (appts.value.data?.data ?? appts.value.data ?? [])
          : [],
      payments:
        pmts.status === 'fulfilled'
          ? (pmts.value.data?.data ?? pmts.value.data ?? [])
          : [],
      enrollments:
        enrolls.status === 'fulfilled'
          ? (enrolls.value.data?.data ?? enrolls.value.data ?? [])
          : [],
      students:
        studs.status === 'fulfilled'
          ? (studs.value.data?.data ?? studs.value.data ?? [])
          : [],
    })

    const allFailed = [appts, pmts, enrolls, studs].every(
      (r) => r.status === 'rejected'
    )
    setError(allFailed ? new Error('Falha ao carregar dados') : null)
    setLoading(false)
  }

  useEffect(() => {
    fetchAll()
  }, [])

  const today = new Date().toDateString()
  const todayAppointments = data.appointments.filter(
    (a) => new Date(a.starts_at).toDateString() === today
  )
  const pendingPayments = data.payments.filter((p) => p.status === 'pending')
  const activeEnrollments = data.enrollments.filter(
    (e) => e.status === 'active'
  )

  return {
    data,
    loading,
    error,
    refetch: fetchAll,
    stats: {
      todayAppointments,
      pendingPayments,
      activeEnrollments,
      totalStudents: data.students,
    },
  }
}
