import { useEffect, useState } from 'react'
import { coursesApi } from '@/services/api/courses'

export function useCourses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetchCourses() {
    setLoading(true)
    try {
      const res = await coursesApi.getAll()
      setCourses(res.data?.data ?? res.data ?? [])
      setError(null)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  async function createCourse(data) {
    const res = await coursesApi.create(data)
    await fetchCourses()
    return res
  }

  async function updateCourse(id, data) {
    const res = await coursesApi.update(id, data)
    await fetchCourses()
    return res
  }

  return {
    courses,
    loading,
    error,
    refetch: fetchCourses,
    createCourse,
    updateCourse,
  }
}
