// For this project development
import '@vue/runtime-core'

declare module '@vue/runtime-core' {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    BvBadge: typeof import('../packages/bootstrap-vue-plus')['BvBadge']
    BvButton: typeof import('../packages/bootstrap-vue-plus')['BvButton']
    BvButtonClose: typeof import('../packages/bootstrap-vue-plus')['BvButtonClose']
    BvButtonGroup: typeof import('../packages/bootstrap-vue-plus')['BvButtonGroup']
    BvButtonToolbar: typeof import('../packages/bootstrap-vue-plus')['BvButtonToolbar']
    BvConfigProvider: typeof import('../packages/bootstrap-vue-plus')['BvConfigProvider']
    BvEmpty: typeof import('../packages/bootstrap-vue-plus')['BvEmpty']
    BvForm: typeof import('../packages/bootstrap-vue-plus')['BvForm']
    BvFormDatalist: typeof import('../packages/bootstrap-vue-plus')['BvFormDatalist']
    BvFormInvalidFeedback: typeof import('../packages/bootstrap-vue-plus')['BvFormInvalidFeedback']
    BvFormText: typeof import('../packages/bootstrap-vue-plus')['BvFormText']
    BvFormValidFeedback: typeof import('../packages/bootstrap-vue-plus')['BvFormValidFeedback']
    BvIcon: typeof import('../packages/bootstrap-vue-plus')['BvIcon']
    BvLink: typeof import('../packages/bootstrap-vue-plus')['BvLink']
    BvListGroup: typeof import('../packages/bootstrap-vue-plus')['BvListGroup']
    BvListGroupItem: typeof import('../packages/bootstrap-vue-plus')['BvListGroupItem']
    BvTransition: typeof import('../packages/bootstrap-vue-plus')['BvTransition']
  }

  interface ComponentCustomProperties {
    $message: typeof import('../packages/bootstrap-vue-plus')['BvMessage']
  }
}

export {}
