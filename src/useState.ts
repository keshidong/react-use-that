import { useState as useStateBasic, useRef, useEffect } from 'react'

// const NOOP = () => {}
type EffectCallback = () => void
type Dispatch<A, B> = (value: A, callback: B) => void
type SetStateAction<S> = S | ((prevState: S) => S)
interface MutableRefObject<T> {
    current: T
}

function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>, EffectCallback>] {
    const [state, setState] = useStateBasic(initialState)
    const callbackKeeperRef: MutableRefObject<Array<{ cb: EffectCallback }>> = useRef([])

    useEffect(() => {
        while (true) {
            const cbKeeper = callbackKeeperRef.current.shift()
            if (!cbKeeper) {
                break
            }

            cbKeeper.cb()
        }
    }, [state])

    return [
        state,
        (s, callback?: EffectCallback) => {
            if (typeof callback !== 'function') {
                throw new Error('The second argument must be a function')
            }
            if (callback) {
                // aviod react bat setState
                const cbKeeper = {
                    cb: callback,
                }
                callbackKeeperRef.current.push(cbKeeper)
            }
            setState(s)
        },
    ]
}

export default useState