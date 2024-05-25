export interface Image {
  id: number
  url: string
  product_id: number
  created_at: string
  updated_at: string
}

export interface Category {
  id: number
  name: string
  created_at: string | null
  updated_at: string | null
}

export interface ProductMetaData {
  id: number
  product_id: number
  category_id: number
  created_at: string
  updated_at: string
  category: Category
}
export interface ProductCard {
  id: number
  name: string
  description: string
  price: string
  created_at: string
  updated_at: string
}
export interface Product extends ProductCard {
  created_at: string
  updated_at: string
  images: Image[]
  product_meta_datas: ProductMetaData[]
}

export interface PaginationLinks {
  url: string | null
  label: string
  active: boolean
}

export interface PaginationData {
  current_page: number
  data: Product[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: PaginationLinks[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}
