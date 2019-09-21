import { renderHook } from '@testing-library/react-hooks'
import { useCallback } from '..'

const mockCallback = jest.fn()

afterEach(() => {
    jest.resetAllMocks()
})

it('should keep same ref after props/state change', () => {
    let cbRef
    const { rerender } = renderHook(
        ({ count }) => {
            cbRef = useCallback(mockCallback, [count])
        },
        { initialProps: { count: 0 } }
    )

    const ref1 = cbRef
    rerender({ count: 1 })

    expect(cbRef).toBe(ref1)
})
