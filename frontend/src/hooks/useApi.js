import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Generic data-fetching hook.
 *
 * @param {Function} apiFn   - Service function that returns a Promise (Axios response).
 * @param {any[]}    [deps]  - Dependencies that re-trigger the fetch when changed.
 * @param {object}   [opts]
 * @param {boolean}  [opts.immediate=true] - Whether to fetch on mount.
 *
 * @returns {{ data, loading, error, refetch }}
 *
 * @example
 * const { data: students, loading, error, refetch } = useApi(
 *   () => studentsApi.getAll({ status: 'active' }),
 *   [filter],
 * )
 */
export function useApi(apiFn, deps = [], { immediate = true } = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(immediate)
  const [error, setError] = useState(null)

  // Keep ref to latest apiFn to avoid stale closure issues
  const apiFnRef = useRef(apiFn)
  useEffect(() => { apiFnRef.current = apiFn })

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await apiFnRef.current()
      setData(res.data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps -- deps handled via outer effect

  useEffect(() => {
    if (immediate) fetch()
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error, refetch: fetch }
}
