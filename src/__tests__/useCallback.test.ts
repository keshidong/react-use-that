import { renderHook } from '@testing-library/react-hooks'
import { useCallback } from '..'

afterEach(() => {
    jest.resetAllMocks()
})

it('should keep same ref after props/state change', () => {
    const { result, rerender } = renderHook(
        ({ count }) => {
            return useCallback(() => {}, [count])
        },
        { initialProps: { count: 0 } }
    )

    const ref1 = result.current
    rerender({ count: 1 })

    expect(result.current).toBe(ref1)
})

it('should have same output with React/useCallback after props/state change', () => {
    const { result, rerender } = renderHook(
        ({ count }) => {
            return useCallback(() => count, [count])
        },
        { initialProps: { count: 0 } }
    )
    expect(result.current()).toEqual(0)
    rerender({ count: 1 })
    expect(result.current()).toEqual(1)
})
