import { useRef, useCallback } from 'react'

export default (fn, deps) => {
    const cb = useCallback(fn, deps)

    const ref = useRef(() => {})
    ref.current = cb

    return useCallback(() => (ref.current()), [])
}
