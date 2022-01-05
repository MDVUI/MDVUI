export type MessageType = 'success' |'error'| 'info' | 'warning'
export type MessagePos = 'top' | 'right' | 'bottom' | 'left' | 'right-top' | 'right-bottom' | 'left-top' | 'left-bottom'

export interface IMessageProps {
  type?: MessageType
  pos?: MessagePos
  duration?: number
}
