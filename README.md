<h1>
    <br />
    react-use-that
</h1>
<sup>
    <a href="https://www.npmjs.com/package/react-use-that">
       <img src="https://img.shields.io/npm/v/react-use-that.svg" alt="npm package" />
    </a>
    <a href="https://travis-ci.com/keshidong/react-use-that">
      <img src="https://travis-ci.com/keshidong/react-use-that.svg?branch=master" alt="travis master" />
    </a>
  </sup>
<br />
<h3>Basic and powful react hooks</h3>

## Install
<pre>npm i <a href="https://www.npmjs.com/package/react-use-that">react-use-that</a></pre>
  
## Usages
#### useCallback

*"useCallback Hooks"* same as react/useCallback, more powerful than react/usecallback, the reference of useCallback's return value is unchanged.

```javascript
import { useCallback } from 'react-use-that'
export default ({ p }) => {
    const cb = useCallback(() => {
        // ...
    }, [p])
    // do something with cb
}
```

#### useCurrent

*"useCurrent Hooks"* can get the value of the latest render function execution context.


```javascript
import { useCurrent } from 'react-use-that'
export default ({ count }) => {
    const getCount = useCurrent(count)
    
    ...
    // can use getCount in other callback
    getCount() 
}
```

#### useState

*"useState Hooks"* can perform the callback in didUpdate caused by the corresponding setState.

```javascript
import { useState } from 'react-use-that'
export default () => {
    const [count, setCount] = useState(0)
    
    ...
    // place setCount in other callback
    setCount(1, () => {
        // didUpdate
        ...
    }) 
}
```
#### useMount

*"useMount Hooks"* can perform the callback defined by the latest render function context before didMount or willUnmount.
The parameter callback is only executed once in didMount, you don't need to care about redundant execution due to dependency changes.

```javascript
import { useMount } from 'react-use-that'
export default () => {
    useMount(() => {
        // didMount
        
        return () => {
            // the return function is opt
            // willUnmount
        }
    })
}
```


