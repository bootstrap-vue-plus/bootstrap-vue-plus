import { withInstall } from '@bootstrap-vue-plus/utils'
import Form from './src/form'
import FormDatalist from './src/form-datalist'
import FormInvalidFeedback from './src/form-invalid-feedback'
import FormText from './src/form-text'
import FormValidFeedback from './src/form-valid-feedback'

export const BvForm = withInstall(Form)
export const BvFormDatalist = withInstall(FormDatalist)
export const BvFormInvalidFeedback = withInstall(FormInvalidFeedback)
export const BvFormText = withInstall(FormText)
export const BvFormValidFeedback = withInstall(FormValidFeedback)
export default BvForm

export * from './src/form'
export * from './src/form-datalist'
export * from './src/form-invalid-feedback'
export * from './src/form-text'
export * from './src/form-valid-feedback'
export * from './src/props'
