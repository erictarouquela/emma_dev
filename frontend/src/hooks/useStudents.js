import { useEffect, useState } from 'react'
import { studentsApi } from '@/services/api/students'

export function useStudents() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetchStudents() {
    setLoading(true)
    try {
      const res = await studentsApi.getAll()
      // Handle both { data: [...] } and { data: { data: [...] } } shapes
      setStudents(res.data?.data ?? res.data ?? [])
      setError(null)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  async function createStudent(data) {
    const res = await studentsApi.create(data)
    await fetchStudents() // Refetch to get updated list
    return res
  }

  async function updateStudent(id, data) {
    const res = await studentsApi.update(id, data)
    await fetchStudents()
    return res
  }

  async function deleteStudent(id) {
    await studentsApi.delete(id)
    await fetchStudents()
  }

  return {
    students,
    loading,
    error,
    refetch: fetchStudents,
    createStudent,
    updateStudent,
    deleteStudent,
  }
}
