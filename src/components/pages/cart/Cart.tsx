import { Component } from 'react'
import { CartItem, Product } from '../../../config/schema/types'
import { Link } from 'react-router-dom'
import Item from './item/CartItem'
import  Title  from '../../homepage/animations/title/Title'
import './style.css'

interface Props {
    cart: CartItem[]
    cartProducts: Product[]
    actualCurrency: string
    symbol: string
    cartToggle: boolean
    changeCart:(arg: number, arg2?: number, arg3?: {name: string, id: string}) => void
}

export default class Cart extends Component<Props> {

    render() {
        const { cart, actualCurrency, cartProducts,
                symbol, changeCart, cartToggle } = this.props

        return cartProducts && (
            <>
            <div className={cartToggle ? 'overlay' : ''}/>
            <div className='container'>
                <div className='cart-container'>
                    <h2 className='title'>
                        <Title text='Cart'/>
                    </h2>
                    {
                        cart.length === 0 && (
                            <div className='empty-cart'>
                                Your cart is empty.&nbsp;<Link to='/'>Add something!</Link> 
                            </div>
                        )
                    }
                    {
                        cartProducts
                        .map(
                            cart_product => cart
                                ?.map(
                                    (cart_item, index) =>
                                    cart_item.id === cart_product.id
                                    ?<Item 
                                        key={index}
                                        product={cart_product}
                                        cartItem={cart_item}
                                        actualCurrency={actualCurrency}
                                        symbol={symbol}
                                        changeCart={changeCart}
                                        index={index}
                                    />
                                    : null
                                )
                        )
                    }
                </div>
            </div>
            </>
        )
    }
}
