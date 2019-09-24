import { useRef, useCallback, DependencyList } from 'react'

type FunctionType = (...args: any[]) => any

export default <T extends FunctionType>(fn: T, deps: DependencyList): T => {
    const cb = useCallback(fn, deps)

    const ref = useRef((() => {}) as FunctionType)
    ref.current = cb

    return useCallback(((...args) => ref.current(...args)) as T, [])
}
