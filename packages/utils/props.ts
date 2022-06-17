import { identity } from './identity'
import { isArray } from './types'
import { keysOf } from './objects'

type TransformFn = (source: any) => any

// Given an array of properties or an object of property keys,
// plucks all the values off the target object, returning a new object
// that has props that reference the original prop values
export const pluckProps = (
  keysToPluck: Array<any> | Record<string, unknown>,
  objToPluck: any,
  transformFn: TransformFn = identity
) =>
  (isArray(keysToPluck) ? keysToPluck.slice() : keysOf(keysToPluck)).reduce(
    (memo, prop) => {
      memo[transformFn(prop)] = objToPluck[prop]
      return memo
    },
    {}
  )
