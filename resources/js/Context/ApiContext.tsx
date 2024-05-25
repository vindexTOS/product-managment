import { CategoryType } from '@/types/category'
import { Product } from '@/types/product'
import { router } from '@inertiajs/react'
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
  productSingle: Product | any
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
  | { type: 'get_single_product'; payload: Product }
  | { type: 'trigger_GetSingleProduct'; payload: string }

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
    productSingle: {},
  }
  //   get categorys

  const GetCategory = (payload: GetCategoryType) => {
    const { page, perPage, search } = payload
    axios
      .get('/api/category', {
        params: { page, per_page: perPage, search },
      })
      .then((response) => {
        dispatch({ type: 'get_category', payload: response.data.data })
        dispatch({ type: 'set_category_total', payload: response.data.total })
      })
      .catch((error) => {
        console.error('Error:', error.response.data)
      })
  }

  const GetProducts = () => {
    axios
      .get('/api/product')
      .then((response) => {
        dispatch({ type: 'get_products', payload: response.data.data.data })
      })
      .catch((error) => {
        console.error('Error:', error.response.data)
      })
  }

  const GetSingleProduct = (id: string) => {
    axios
      .get(`/api/product/${id}`)
      .then((response) => {
        dispatch({ type: 'get_single_product', payload: response.data.data })
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
        GetProducts()
        return { ...state }
      case 'get_single_product':
        return { ...state, productSingle: action.payload }
      case 'trigger_GetSingleProduct':
        GetSingleProduct(action.payload)
        return { ...state }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    GetCategory({ page: 1, perPage: 50, search: '' })

    GetProducts()
  }, [])

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
