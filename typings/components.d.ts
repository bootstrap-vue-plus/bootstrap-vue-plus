// For this project development
import '@vue/runtime-core'

declare module '@vue/runtime-core' {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    BvBadge: typeof import('../packages/bootstrap-vue-plus')['BvBadge']
    BvButton: typeof import('../packages/bootstrap-vue-plus')['BvButton']
    BvButtonGroup: typeof import('../packages/bootstrap-vue-plus')['BvButtonGroup']
    BvConfigProvider: typeof import('../packages/bootstrap-vue-plus')['BvConfigProvider']
    BvEmpty: typeof import('../packages/bootstrap-vue-plus')['BvEmpty']
    BvForm: typeof import('../packages/bootstrap-vue-plus')['BvForm']
    BvFormItem: typeof import('../packages/bootstrap-vue-plus')['BvFormItem']
    BvIcon: typeof import('../packages/bootstrap-vue-plus')['BvIcon']
    BvLink: typeof import('../packages/bootstrap-vue-plus')['BvLink']
  }

  interface ComponentCustomProperties {
    $message: typeof import('../packages/bootstrap-vue-plus')['BvMessage']
  }
}

export {}
