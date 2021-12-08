import * as React from 'react'
import { CartItem } from '../../../../config/schema/types'
import './style.css'

export interface ICenterPartProps {
    itemIndex: number
    item: CartItem
    changeCart:(arg: number, arg2?: number, arg3?: {name: string, id: string}) => void
}

export default class CenterPart extends React.Component<ICenterPartProps> {
  public render() {
    const { changeCart, itemIndex, item } = this.props
    return (
      <>
        <div className='center-part-item'>
            <div className='plus-minus'
                onClick={()=>changeCart(itemIndex, 1)}
            >
                <div className='signal' > {/**Plus signal */}
                    <div className='vertical'/> {/**I know I could export the SVG from Figma, but decided to keep this one whole native. */}
                    <div className='horizontal'/>
                </div>
            </div>
            <div className='quantity-cart-item'>
                {item.quantity}
            </div>
            <div className='plus-minus'
                onClick={()=>changeCart(itemIndex, -1)}
            >
                <div className='signal'>
                    <div className='horizontal'/> {/**Minus signal */}
                </div>
            </div>
        </div>
      </>
    );
  }
}
