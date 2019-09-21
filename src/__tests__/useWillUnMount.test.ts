import { renderHook } from '@testing-library/react-hooks'
import { useWillUnMount } from '..'

afterEach(() => {
    jest.resetAllMocks()
})

const mockCallback = jest.fn()
it('should run clean-up provided on unmount', () => {
    const { unmount } = renderHook(() => useWillUnMount(mockCallback, []))
    expect(mockCallback).not.toHaveBeenCalled()

    unmount()
    expect(mockCallback).toHaveBeenCalledTimes(1)
})
