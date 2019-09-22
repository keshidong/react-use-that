import { useRef, useEffect } from 'react'

export default (): (() => boolean) => {
    const ref = useRef(false)
    useEffect(() => {
        ref.current = true
        return () => {
            ref.current = false
        }
    }, [])
    return () => ref.current
}
