import { UploadFile } from 'antd'
import axios from 'axios'
import { ReactNode, createContext, useContext, useReducer } from 'react'

type Cell = {
  state: State
  dispatch: React.Dispatch<Action>
}
interface ApiContextProviderProps {
  children: ReactNode
}

interface State {
  UploadFile: UploadFile[]
}

type Action = { type: 'set_images'; payload: UploadFile[] }

const Context = createContext<null | Cell>(null)

export const FileContextProvider = ({ children }: ApiContextProviderProps) => {
  const initialState: State = {
    // images
    UploadFile: [],
  }
  //   get categorys

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'set_images':
        return { ...state, UploadFile: action.payload }

      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}

export const UseFileContext = () => {
  const context = useContext(Context)
  if (!context) {
    throw new Error('not wrapped context ')
  }
  return context
}
