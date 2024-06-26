import { GetCategoryType } from '@/types/query'
import axios from 'axios'
import { onError, onSuccess } from '../Components/StatusHandler/Status'
export const GetCategory = async (payload: GetCategoryType) => {
  const { page, perPage, search } = payload

  try {
    const response = await axios.get('/api/category', {
      params: { page, per_page: perPage, search },
    })

    return response.data.data
  } catch (error) {
    const err: any = error
    onError(err.response.data.message)
  }
}

export const PostCategory = (category: any) => {
  return axios
    .post('/api/category', { category })
    .then((response) => {
      onSuccess(response.data.message)
    })
    .catch((error) => {
      onError(error.response.data.message)
    })
}

export const DeleteCategory = async (id: string) => {
  try {
    const response = await axios.delete(`/api/category/${id}`)
    onSuccess(response.data.message)

    return response
  } catch (error) {
    const err: any = error
    onError(err.response.data.message)
  }
}
