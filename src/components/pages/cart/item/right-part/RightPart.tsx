import React, { Component } from 'react'
import { CartItem, Product } from '../../../../../config/schema/types'
import Carousel from './carousel/Carosuel'
import minus from './assets/minus-square.svg'
import plus from './assets/plus-square.svg'
import './style.css'

interface Props {
    product: Product
    cartItem: CartItem
    index: number
    changeCart:(arg: number, arg2?: number, arg3?: {name: string, id: string}) => void
}
interface State {
    
}

export default class RightPart extends Component<Props, State> {

    render() {
        const { product, cartItem, changeCart, index } = this.props
        return (
            <div className='right-part-cartItem'>
                <div className='buttons-right-part'> 
                    <img alt='plus' src={plus}
                        onClick={()=>changeCart(index,1)}
                    />
                    <p>{cartItem.quantity}</p>
                    <img alt='minus' src={minus}
                        onClick={()=>changeCart(index,-1)}
                    />
                </div>
                <Carousel gallery={product.gallery}/>
            </div>
        )
    }
}
