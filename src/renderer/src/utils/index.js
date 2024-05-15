import clsx from 'clsx'
import { twMerge } from './twMerge'

export const cn = (...args) => {
  return twMerge(clsx(...args))
}
