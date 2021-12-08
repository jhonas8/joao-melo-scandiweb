import React, { Component } from 'react'
import { CartItem, Product } from '../../../../config/schema/types'
import LeftPart from './left-part/LeftPart'
import RightPart from './right-part/RightPart'
import './style.css'

interface Props {
    product: Product
    cartItem: CartItem 
    actualCurrency: string
    symbol: string
    index: number
    changeCart:(arg: number, arg2?: number, arg3?: {name: string, id: string}) => void
}
interface State {
    
}

export default class Item extends Component<Props, State> {

    render() {
        const { product, cartItem, actualCurrency, symbol, changeCart, index } = this.props
        console.log(index, cartItem)
        return (
            <div className='cart-item-page'>
                <LeftPart 
                    product={product} 
                    cartItem={cartItem}
                    actualCurrency={actualCurrency}
                    symbol={symbol}
                    changeCart={changeCart}
                    index={index}
                />
                <RightPart
                    product={product}
                    cartItem={cartItem}
                    changeCart={changeCart}
                    index={index}
                />
            </div>
        )
    }
}
