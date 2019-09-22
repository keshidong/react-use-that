import { renderHook } from '@testing-library/react-hooks'
import { useCallback } from '..'

afterEach(() => {
    jest.resetAllMocks()
})

it('should keep same ref after props/state change', () => {
    let cbRef
    const { rerender } = renderHook(
        ({ count }) => {
            cbRef = useCallback(() => {}, [count])
        },
        { initialProps: { count: 0 } }
    )

    const ref1 = cbRef
    rerender({ count: 1 })

    expect(cbRef).toBe(ref1)
})

it('should have same output with React/useCallback after props/state change', () => {
    let frezzeRefCb
    const { rerender } = renderHook(
        ({ count }) => {
            frezzeRefCb = useCallback(() => count, [count])
        },
        { initialProps: { count: 0 } }
    )
    expect(frezzeRefCb()).toEqual(0)
    rerender({ count: 1 })
    expect(frezzeRefCb()).toEqual(1)
})
