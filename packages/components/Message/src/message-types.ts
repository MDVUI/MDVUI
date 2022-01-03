export type AlertTipType = 'success' |'error'| 'info' | 'warning'
export type AlertTipPos = 'top' | 'right' | 'bottom' | 'left' | 'right-top' | 'right-bottom' | 'left-top' | 'left-bottom'
export interface IMessageProps {
  type?: AlertTipType
  pos?: AlertTipPos
  duration?: number
}
