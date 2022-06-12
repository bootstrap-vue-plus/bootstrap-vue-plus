import { withInstall, withNoopInstall } from '@bootstrap-vue-plus/utils'
import Form from './src/form.vue'
import FormItem from './src/form-item.vue'

export const BvForm = withInstall(Form, {
  FormItem,
})
export default BvForm
export const BvFormItem = withNoopInstall(FormItem)

export * from './src/form'
export * from './src/form-item'
export * from './src/types'

export type FormInstance = InstanceType<typeof Form>
export type FormItemInstance = InstanceType<typeof FormItem>
