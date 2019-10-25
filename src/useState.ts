import { useState as useStateBasic, useRef, useEffect } from 'react'
import objectIs from './utils/objectIs'

type EffectCallback = () => void
type Dispatch<A, B> = (value: A, callback?: B) => void
type SetStateAction<S> = S | ((prevState: S) => S)

interface CallbackKeeper {
    cb: EffectCallback
}

interface MutableRefObject<T> {
    current: T
}

function useState<S extends any | undefined = undefined>(
    initialState: S
): [S, Dispatch<SetStateAction<S>, EffectCallback>] {
    const [state, setState] = useStateBasic(initialState)
    const callbackKeeperRef: MutableRefObject<CallbackKeeper[]> = useRef([])

    useEffect(() => {
        while (true) {
            const cbKeeper = callbackKeeperRef.current.shift()
            if (!cbKeeper) {
                break
            }

            cbKeeper.cb()
        }
        // `state` use for corresponding to state and effect
    }, [state])

    return [
        state,
        (s, callback?: EffectCallback) => {
            setState(prevState => {
                const currentState =
                    typeof s === 'function'
                        ? (() => {
                              const sCb = s as (prevState: S | undefined) => S
                              return sCb(prevState)
                          })()
                        : s

                if (callback) {
                    if (typeof callback !== 'function') {
                        throw new Error('The second argument must be a function')
                    }

                    if (objectIs(prevState, currentState)) {
                        callback()
                    } else {
                        // aviod react bat setState
                        const cbKeeper = {
                            cb: callback,
                        }
                        callbackKeeperRef.current.push(cbKeeper)
                    }
                }

                return currentState
            })
        },
    ]
}

export default useState
