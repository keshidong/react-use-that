import { useRef, useEffect } from 'react'
import useCallback from './useCallback'

export default (fn, deps) => {
    const cb = useCallback(fn, deps)
    useEffect(() => { cb() }, [])
}
