import { CategoryType } from '@/types/category'
import { Product } from '@/types/product'
import { UploadFile } from 'antd'
import axios from 'axios'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react'

type Cell = {
  state: State
  dispatch: React.Dispatch<Action>
}
interface ApiContextProviderProps {
  children: ReactNode
}
interface GetCategoryType {
  page: number
  perPage: number
  search: string
}
interface State {
  categoryData: CategoryType[]
  categoryTotal: number
  categoryCurrentPage: number
  categoryPageSize: number
  categorySearch: string
  UploadFile: UploadFile[]
  productData: Product[]
}

type Action =
  | { type: 'get_category'; payload: CategoryType[] }
  | { type: 'set_category_total'; payload: number }
  | { type: 'set_category_current'; payload: number }
  | { type: 'set_category_page_size'; payload: number }
  | { type: 'set_category_search'; payload: string }
  | { type: 'triggere_GetCategory'; payload: GetCategoryType }
  | { type: 'set_images'; payload: UploadFile[] }
  | { type: 'get_products'; payload: Product[] }
  | { type: 'trigger_GetProduct' }

const Context = createContext<null | Cell>(null)

export const ApiContextProvider = ({ children }: ApiContextProviderProps) => {
  const initialState: State = {
    categoryData: [],
    categoryTotal: 0,
    categoryCurrentPage: 1,
    categoryPageSize: 50,
    categorySearch: '',
    // images
    UploadFile: [],
    // products
    productData: [],
  }
  //   get categorys
  const GetCategory = async (payload: GetCategoryType) => {
    const { page, perPage, search } = payload
    axios
      .get('/category', {
        params: { page, per_page: perPage, search },
      })
      .then((response) => {
        if (response.data.data.length <= 0) {
          dispatch({
            type: 'get_category',
            payload: [
              {
                id: 1,
                name: 'NO CATEGORIES ',
              },
            ],
          })
        }
        dispatch({ type: 'get_category', payload: response.data.data })
        dispatch({ type: 'set_category_total', payload: response.data.total })
      })
      .catch((error) => {
        console.error('Error:', error.response.data)
      })
  }

  const GetProduct = async () => {
    axios
      .get('/product')
      .then((response) => {
        console.log(response)
        dispatch({ type: 'get_products', payload: response.data.data.data })
      })
      .catch((error) => {
        console.error('Error:', error.response.data)
      })
  }

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'get_category':
        return { ...state, categoryData: action.payload }
      case 'set_category_total':
        return { ...state, categoryTotal: action.payload }
      case 'set_category_current':
        return { ...state, categoryCurrentPage: action.payload }
      case 'set_category_page_size':
        return { ...state, categoryPageSize: action.payload }
      case 'set_category_search':
        return { ...state, categorySearch: action.payload }
      case 'triggere_GetCategory':
        GetCategory(action.payload)
        return { ...state }
      //   images
      case 'set_images':
        return { ...state, UploadFile: action.payload }
      // products
      case 'get_products':
        return { ...state, productData: action.payload }
      case 'trigger_GetProduct':
        GetProduct()
        return { ...state }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  if (state.categoryData.length <= 0) {
    GetCategory({ page: 1, perPage: 50, search: '' })
  }

  if (state.productData.length <= 0) {
    GetProduct()
  }

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}

export const UseApiContext = () => {
  const context = useContext(Context)
  if (!context) {
    throw new Error('not wrapped context ')
  }
  return context
}
