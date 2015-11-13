# redux-make-mori
Redux middleware to coerce native javascript types into the equivalent Mori types.  Works with both [Flux Standard Actions](https://github.com/acdlite/flux-standard-action) non-standard actions.

If an action is submitted without a `type` key, it will be forwarded.

### Install
`npm install -S redux-make-mori`

### Usage

```javascript
import makeMori from 'redux-make-mori';

... applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
      makeMori
    );
```
