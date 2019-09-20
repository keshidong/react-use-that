import { useRef, useCallback } from 'react'

export default (value) => {
    const ref = useRef(null)
    ref.current = value

    return useCallback(() => (ref.current), [])
}
