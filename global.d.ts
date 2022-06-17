// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    BvBadge: typeof import('bootstrap-vue-plus')['BvBadge']
    BvButton: typeof import('bootstrap-vue-plus')['BvButton']
    BvButtonGroup: typeof import('bootstrap-vue-plus')['BvButtonGroup']
    BvConfigProvider: typeof import('bootstrap-vue-plus')['BvConfigProvider']
    BvEmpty: typeof import('bootstrap-vue-plus')['BvEmpty']
    BvForm: typeof import('bootstrap-vue-plus')['BvForm']
    BvFormItem: typeof import('bootstrap-vue-plus')['BvFormItem']
    BvIcon: typeof import('bootstrap-vue-plus')['BvIcon']
    BvLink: typeof import('bootstrap-vue-plus')['BvLink']
  }

  interface ComponentCustomProperties {
    $message: typeof import('bootstrap-vue-plus')['BvMessage']
  }
}

export {}
