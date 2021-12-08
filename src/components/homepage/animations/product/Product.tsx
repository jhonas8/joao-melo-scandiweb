import * as React from 'react'
import CartIcon from '../../products/assets/Circle.svg'
import { CartItem, Product } from '../../../../config/schema/types'
import { Link } from 'react-router-dom'
import './style.css'

export interface IProductProps {
  product: Product
  index: number
  actualCurrency: string
  symbol: string
  page: string
  addNewItemCart: (parameter: Product, cartItem?: CartItem) => void
}

export default class ProductComponent extends React.Component<IProductProps, {update: 0 | 1 }> {
  
  constructor(props:IProductProps){
    super(props)
    this.state={
      update: 0
    }
  }
  
  componentDidMount(){
    const text = document.querySelectorAll('.product-card')! as NodeListOf<HTMLElement>
    text.forEach(
        (letter, index) => {
            letter.style.animation= `move-product 0.8s forwards ${(0.7 + index)/10}s`
        }
    )
  }
  componentDidUpdate(prevprops: IProductProps){
    const text = document.querySelectorAll('.product-card')! as NodeListOf<HTMLElement>
    text.forEach(
        (letter, index) => {
            if(letter.style.animation || letter.style.animation === '') letter.style.animation =''
            letter.style.animation= `move-product 0.8s forwards ${(0.7 + index)/10}s`
        }
    )

    if(prevprops.page !==  this.props.page){
        this.setState(pS =>({
            update: pS.update===0 ? 1 : 0 //It will guarantee the animation will always work properly. Try comment this code block to see how the animation will behave.
        }))
    }
  }
  
  public render() {
    const { actualCurrency, symbol, product, index, addNewItemCart } = this.props
    return (
      <div key={this.state.update}>
        <div className={`product-card ${!product.inStock && 'no-events'}`} key={index}>
            <Link to={`/product/${product.id}`} className='footer-none-decoration'>
            <div className={product.inStock ? 'none' : 'overlay-noStock'}>
              <div>
                <p>Out of Stock</p>
              </div>
            </div>
            <div className='card-image'>
                <img
                    src={product.gallery[0]}
                    alt={product.name}
                />
            </div>
            <div className='text-card'>
                <h6>{product.name}</h6>
                <p>
                    {symbol}
                    {product.prices.find(price => price.currency === actualCurrency)?.amount}
                </p>
            </div>
            </Link>
              <div className='cart-icon-card'
                onClick={()=> addNewItemCart(product)}
              >
                  <img
                      src={CartIcon}
                      alt='cart icon'
                  />
              </div>
        </div>
      </div>
    );
  }
}
/**
 * @private
 * Since this component basicly is a 'card', I haven't separeted into two different components.
 */
