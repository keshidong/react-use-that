import { useState as useStateBasic, useRef, useEffect } from 'react'

const NOOP = () => {}
const useState = (initState) => {
    const [state, setState] = useStateBasic(initState)
    const callbackKeeperRef = useRef([])

    useEffect(() => {
        while (true) {
            const cbKeeper = callbackKeeperRef.current.shift()
            if (!cbKeeper) {
                break
            }

            cbKeeper.cb(cbKeeper.next, cbKeeper.current)
        }
    }, [state])

    return [state, (s, callback) => {
        if (typeof callback !== 'function') {
            throw new Error('The second argument must be a function')
        }
        if (callback) {
            // aviod react bat setState
            callbackKeeperRef.current.push({
                cb: callback,
                current: state,
                next: s,
            })
        }
        setState(s)
    }]
}

export default useState
