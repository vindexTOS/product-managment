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

export const GetProducts = async (
  page = 1,
  perPage = 10,
  search = '',
  categories = [],
) => {
  try {
    const response = await axios.get('/api/product', {
      params: {
        page,
        per_page: perPage,
        search,
        categories,
      },
    })
    console.log(response.data)
    return response.data
  } catch (error) {
    const err: any = error
    throw new Error(err)
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

export const DeleteProduct = async (id: string) => {
  try {
    const response = await axios.delete(`/api/product/${id}`)
    onSuccess(response.data.message)

    return response
  } catch (error) {
    const err: any = error

    onError(err.response.data.message)
  }
}
