import { useRef, useEffect, useCallback } from 'react'

export default (): (() => boolean) => {
    const ref = useRef<boolean>(false)
    useEffect(() => {
        ref.current = true
        return () => {
            ref.current = false
        }
    }, [])
    return useCallback(() => ref.current, [])
}
