import * as React from 'react'
import { CartItem, Product } from '../../../config/schema/types'
import ProductComponent from '../animations/product/Product'
import './style.css'

export interface IProductsProps {
    products: Product[]
    actualCurrency: string
    symbol: string
    categoryName: string
    page: string
    addNewItemCart: (parameter: Product,cartItem?: CartItem) => void
}

export default class Products extends React.Component<IProductsProps> {
    public render() {
        const { products, actualCurrency, symbol, categoryName, page, addNewItemCart } = this.props
        return (
        <div className='products-container'>
            {
                products
                .filter( 
                        product => categoryName === 'All Products'
                                    ? product
                                    : product.category === categoryName
                    )
                .sort(
                    (a,b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
                )
                .map(
                    (product, index) =>(
                        <ProductComponent
                            product={product}
                            index={index}
                            actualCurrency={actualCurrency}
                            symbol={symbol}
                            page={page}
                            addNewItemCart={addNewItemCart}
                            key={index}
                        />
                    )
                )
            }
        </div>
        );
    }
}
/**
 * @private
 * Notice, at this point, I could create an animation-component containing the mainly 
 * attributes of a CSS animation, instead of repeat code. However, I decided to keep simple
 * for this amount of animated items.
 */