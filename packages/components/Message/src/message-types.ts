export type MessageType = 'success' |'error'| 'info' | 'warning'

export interface IMessageProps {
  type?: MessageType
  duration?: number
}
