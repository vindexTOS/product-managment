import axios from 'axios'
import { onError, onSuccess } from '../Components/StatusHandler/Status'

export const PostProduct = async (formData: any) => {
  try {
    const response = await axios.post('/api/product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    onSuccess(response.data.message)
  } catch (error) {
    const err: any = error
    onError(err.response.data.message)

    console.error('Error:', err.response.data)
  }
}

export const GetProducts = async () => {
  try {
    const response = await axios.get('/api/product')

    return response.data.data.data
  } catch (error) {
    const err: any = error

    onError(err.response.data.message)
  }
}

export const GetSingleProduct = async (id: string) => {
  try {
    const response = await axios.get(`/api/product/${id}`)

    return response.data.data
  } catch (error) {
    const err: any = error

    onError(err.response.data.message)
  }
}
