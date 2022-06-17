import { toString } from '../strings'

export const isTag = (tag: unknown, name: unknown) =>
  toString(tag).toLowerCase() === toString(name).toLowerCase()
