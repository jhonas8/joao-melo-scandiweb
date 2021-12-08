type Price = {
  currency: string
  amount: number
}

type Attribute = {
  displayValue: string
  value: string
  id: string
}

type AttributeSet = {
  id: string
  name: string
  type: string
  items: Attribute[]
}

type Product = {
  id: string
  name: string
  inStock: boolean
  gallery: string[]
  description: string
  category: string
  attributes: AttributeSet[]
  prices: Price[]
  brand: string
}

type CartItem = {
  id: string,
  variation: Array<{name: string, id: string}>,
  quantity: number 
}

export type { Product, CartItem }


/**
 * It was easier than retrieve the schema from GraphQl
 */