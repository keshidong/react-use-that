import { useRef } from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { useDidMount } from '..'

const mockCallback = jest.fn()

afterEach(() => {
    jest.resetAllMocks()
})

it('should call provided callback on mount', () => {
    const { rerender } = renderHook(() => useDidMount(mockCallback, []))
    rerender()

    expect(mockCallback).toHaveBeenCalledTimes(1)
})

it('should not call provided callback on unmount', () => {
    const { unmount } = renderHook(() => useDidMount(mockCallback, []))
    expect(mockCallback).toHaveBeenCalledTimes(1)

    unmount()

    expect(mockCallback).toHaveBeenCalledTimes(1)
})

it('should call provided callback on rerender when state change', () => {
    let state = 0
    const { rerender } = renderHook(() => useDidMount(mockCallback, [state]))

    state = 1
    rerender()

    expect(mockCallback).toHaveBeenCalledTimes(1)
})

it('should call provided callback on rerender when state change', () => {
    let mockcb
    const { result, rerender } = renderHook(
        ({ count }) => {
            const ref = useRef(0)

            mockcb = jest.fn(() => {
                ref.current = count
            })
            useDidMount(mockcb, [count])

            return ref
        },
        { initialProps: { count: 0 } }
    )

    rerender({ count: 1 })

    expect(result.current.current).toEqual(0)
    expect(result.current.current).toEqual(1)
    expect(mockCallback).toHaveBeenCalledTimes(1)
})
