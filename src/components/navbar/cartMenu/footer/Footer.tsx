import * as React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

export interface IFooterProps {
    symbol: string
    totalPrice: number
    setCartToggle: (arg:any) => void
}

export default class Footer extends React.Component<IFooterProps> {
  public render() {
    const { symbol, totalPrice, setCartToggle } = this.props
    return (
      <>
        <div className='menu-cart-footer'>
            <div className='total'>
                Total
            </div>
            <div className='total-number'>
                {symbol + Math.round((totalPrice + Number.EPSILON)*100)/100} 
            </div>
        </div>
        <div className='bottom-buttons'>
          <Link to='/cart' className='footer-none-decoration'>
            <div className='view-bag'
              onClick={()=>setCartToggle(false)}
            >
                View bag
            </div>
          </Link>
            <div className='checkout-menu'
              onClick={()=>setCartToggle(false)}
            >
                Check out
            </div>
        </div>
      </>
    );
  }
}
