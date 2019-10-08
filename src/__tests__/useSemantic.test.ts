import { renderHook } from '@testing-library/react-hooks'
import { useSemantic } from '..'

it('should be equal when two object are same semantic', () => {
    const { result, rerender } = renderHook(
        ({ p1 }) => {
            return useSemantic(p1)
        },
        { initialProps: { p1: { a: 1, b: 2 } } }
    )

    const memoP1 = result.current
    rerender({ p1: { a: 1, b: 2 } })
    expect(result.current).toBe(memoP1)
})

it('should not be equal when two object are different semantic', () => {
    const { result, rerender } = renderHook(
        ({ p1 }) => {
            return useSemantic(p1)
        },
        { initialProps: { p1: { a: 1, b: 2 } } }
    )

    const memoP1 = result.current
    rerender({ p1: { a: 1, b: 3 } })
    expect(result.current).not.toBe(memoP1)
})
