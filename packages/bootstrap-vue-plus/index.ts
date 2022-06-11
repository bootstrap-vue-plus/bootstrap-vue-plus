import installer from './defaults'
export * from '@bootstrap-vue-plus/components'
export * from '@bootstrap-vue-plus/constants'
export * from '@bootstrap-vue-plus/directives'
export * from '@bootstrap-vue-plus/hooks'
export * from '@bootstrap-vue-plus/tokens'
export * from './make-installer'

export const install = installer.install
export const version = installer.version
export default installer

export { default as dayjs } from 'dayjs'
