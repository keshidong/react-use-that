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
    const { rerender } = renderHook(({ count }) => useDidMount(mockCallback, [count]), { initialProps: { count: 0 }})

    rerender({ count: 1 })

    expect(mockCallback).toHaveBeenCalledTimes(1)
})

it('should run clean-up provided on unmount', () => {
    const mockEffectCleanup = jest.fn()
    const mockEffectCallback = jest.fn().mockReturnValue(mockEffectCleanup)

    const { unmount } = renderHook(() => useDidMount(mockEffectCallback, []))
    expect(mockEffectCleanup).not.toHaveBeenCalled()

    unmount()
    expect(mockEffectCleanup).toHaveBeenCalledTimes(1)
})
