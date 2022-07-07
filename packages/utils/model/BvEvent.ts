export interface BvEventProps {
  type: string
  cancelable: boolean
  nativeEvent: any
  target: any
  relatedTarget: any
  vueTarget: any
  componentId: string | null
}

const defaultBvEventProps: BvEventProps = {
  type: '',
  cancelable: false,
  nativeEvent: null,
  target: null,
  relatedTarget: null,
  vueTarget: null,
  componentId: null,
}

export class BvEvent {
  public type: string
  private cancelable: boolean
  private nativeEvent: any
  private target: any
  private relatedTarget: any
  private vueTarget: any
  private componentId: string | null
  private defaultPrevented = false

  constructor(type = '', eventInit: BvEventProps = defaultBvEventProps) {
    if (!type) {
      throw new Error("Failed to construct 'BvEvent'. 1 argument required.")
    }
    this.type = eventInit.type || type
    this.cancelable = eventInit.cancelable
    this.nativeEvent = eventInit.nativeEvent
    this.target = eventInit.target
    this.relatedTarget = eventInit.relatedTarget
    this.vueTarget = eventInit.vueTarget
    this.componentId = eventInit.componentId
  }

  public preventDefault() {
    if (this.cancelable) {
      this.defaultPrevented = true
    }
  }

  public prevented(): boolean {
    return this.defaultPrevented
  }
}
