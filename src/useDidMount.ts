import { useEffect, DependencyList } from 'react'
import useCallback from './useCallback'

export default (fn, deps: DependencyList) => {
    const cb = useCallback(fn, deps)
    useEffect(() => cb(), [])
}
