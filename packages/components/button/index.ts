import { withInstall, withNoopInstall } from '@bootstrap-vue-plus/utils'
import Button from './src/button.vue'
import ButtonGroup from './src/button-group.vue'

export const BvButton = withInstall(Button, {
  ButtonGroup,
})
export const BvButtonGroup = withNoopInstall(ButtonGroup)
export default BvButton

export * from './src/button'
