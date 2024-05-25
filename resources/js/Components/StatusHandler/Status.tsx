import { message } from 'antd'

const onSuccess = (msg: string) => {
  message.success(msg)
}

const onError = (msg: string) => {
  message.error(msg)
}

export { onSuccess, onError }
