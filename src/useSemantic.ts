import { useRef } from 'react'
import isEqual from 'react-fast-compare'

export default <T>(dataObject): T => {
    const ref = useRef(dataObject)

    if (!isEqual(ref.current, dataObject)) {
        ref.current = dataObject
    }

    return ref.current
}
