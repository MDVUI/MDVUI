import { useGlobalConfig } from '@mdvui/hooks/use-global-config'

interface PopupManager {
  zIndex: number
  getInitialZIndex: () => number
  nextZIndex: () => number
}

export const PopupManager: PopupManager = {
  zIndex: 0,
  getInitialZIndex() {
    return useGlobalConfig()
  },
  nextZIndex() {

  },
}
