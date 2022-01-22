import { withInstall, withInstallFn } from '@mdvui/utils/withInstall'
import Message from './src/Message.vue'
import MessageMethod from './src/message-method'

const MMessage = withInstall(Message, 'Message')
export default MMessage
export const MvMessageFn = withInstallFn(MessageMethod, '$message')
