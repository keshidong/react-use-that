import { useState as useStateBasic, useRef, useEffect } from 'react'
import objectIs from './utils/objectIs'

type EffectCallback<S> = ([prevState, currentState]: [S, S]) => void
type Dispatch<A, B> = (value: A, callback?: B) => void
type SetStateAction<S> = S | ((prevState: S) => S)

interface CallbackKeeper<S> {
    cb: EffectCallback<S>
    prevState: S
    currentState: S
}

interface MutableRefObject<T> {
    current: T
}

function useState<S extends undefined = undefined>(
    initialState: S
): [S, Dispatch<SetStateAction<S>, EffectCallback<S>>] {
    const [state, setState] = useStateBasic(initialState)
    const callbackKeeperRef: MutableRefObject<Array<CallbackKeeper<S>>> = useRef([])

    useEffect(() => {
        while (true) {
            const cbKeeper = callbackKeeperRef.current.shift()
            if (!cbKeeper) {
                break
            }

            cbKeeper.cb([cbKeeper.prevState, cbKeeper.currentState])
        }
        // `state` use for corresponding to state and effect
    }, [state])

    return [
        state,
        (s, callback?: EffectCallback<S>) => {
            setState(prevState => {
                const currentState = typeof s === 'function' ? s(prevState) : s

                if (callback) {
                    if (typeof callback !== 'function') {
                        throw new Error('The second argument must be a function')
                    }

                    if (objectIs(prevState, currentState)) {
                        callback([prevState, currentState])
                    } else {
                        // aviod react bat setState
                        const cbKeeper = {
                            cb: callback,
                            prevState,
                            currentState,
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
