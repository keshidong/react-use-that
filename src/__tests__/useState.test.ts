import { renderHook, act } from '@testing-library/react-hooks'
import { useState } from '..'

it('should has same function with React/useState', () => {
    const { result } = renderHook(() => {
        const [count, setCount] = useState(0)

        return { count, setCount }
    })

    expect(result.current.count).toEqual(0)
    act(() => {
        result.current.setCount(1)
    })
    expect(result.current.count).toEqual(1)
    act(() => {
        result.current.setCount(2)
    })
    expect(result.current.count).toEqual(2)
})

it('should callback be called when didUpdate', () => {
    // todo
})

it('should callback be called once', () => {
    const mockCallback = jest.fn()

    const { result } = renderHook(() => {
        const [count, setCount] = useState(0)

        return { count, setCount }
    })

    act(() => {
        result.current.setCount(1, mockCallback)
    })
    act(() => {
        result.current.setCount(2)
    })
    expect(mockCallback).toBeCalledTimes(1)
})

it('should callback be called with correct order', () => {
    const mockCallback1 = jest.fn()
    const mockCallback2 = jest.fn()

    const { result } = renderHook(() => {
        const [count, setCount] = useState(0)

        return { count, setCount }
    })

    act(() => {
        result.current.setCount(1, mockCallback1)
    })
    expect(mockCallback1).toBeCalledTimes(1)
    act(() => {
        result.current.setCount(2, mockCallback2)
    })
    expect(mockCallback2).toBeCalledTimes(1)
})
