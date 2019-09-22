import {renderHook} from '@testing-library/react-hooks'
import {useCurrent} from '..'

it('should current value with respect to the latest render function exec', () => {
    const {result, rerender} = renderHook(
        ({count}) => {
            const getCurrent = useCurrent(count)

            return {getCurrent}
        },
        {initialProps: {count: 0}}
    )
    expect(result.current.getCurrent()).toEqual(0)
    rerender({count: 1})
    expect(result.current.getCurrent()).toEqual(1)
})

it('should get current value function is a constant reference', () => {
    const {result, rerender} = renderHook(
        ({count}) => {
            const getCurrent = useCurrent(count)

            return {getCurrent}
        },
        {initialProps: {count: 0}}
    )
    const lastRenderRef = result.current.getCurrent
    rerender({count: 1})
    expect(result.current.getCurrent).toBe(lastRenderRef)
})
