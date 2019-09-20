import { useRef, useCallback, DependencyList } from 'react'

export default (fn, deps: DependencyList) => {
    const cb = useCallback(fn, deps)

    const ref = useRef(() => {})
    ref.current = cb

    return useCallback(() => ref.current(), [])
}
