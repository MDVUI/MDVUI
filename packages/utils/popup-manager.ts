import { useGlobalConfig } from '@mdvui/hooks/use-global-config'

interface IPopupManager {
  zIndex: number
  globalInitialZIndex: number
  getInitialZIndex: () => number
  nextZIndex: () => number
}

export const PopupManager: IPopupManager = {
  zIndex: 0,
  globalInitialZIndex: 2000,
  getInitialZIndex() {
    return useGlobalConfig('zIndex').value as number
  },
  nextZIndex() {
    return this.getInitialZIndex() + ++this.zIndex
  },
}
