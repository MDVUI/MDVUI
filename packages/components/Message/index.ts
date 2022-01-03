import { withInstall, withInstallFn } from '@mdvui/utils/withInstall'
import Message from './src/Message.vue'
import MessageMethod from './src/message-method'

const MvMessage = withInstall(Message, 'Message')
export default MvMessage
export const MvMessageFn = withInstallFn(MessageMethod, '$message')
