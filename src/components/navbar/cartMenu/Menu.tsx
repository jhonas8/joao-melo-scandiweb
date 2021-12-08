import * as React from 'react'
import { CartItem, Product } from '../../../config/schema/types'
import { Link } from 'react-router-dom'
import './style.css'
import Footer from './footer/Footer'
import LeftPart from './left-part/LeftPart'
import CenterPart from './center-part/CenterPart'

export default class CartMenu extends React.Component<ICartMenuProps> {

    public productTitle: (productItem: Product, item:CartItem) => string | undefined  
    constructor(props?: ICartMenuProps) {
        super(props!)

        this.productTitle = (productItem: Product, item: CartItem): string | undefined => { 
            let title = productItem.attributes.filter(a=>a.type==='swatch')
                                                ?.find(a=> item.variation.find( i => i.id ===a.id))
                                                ?.items.find(i => item.variation.find(it => i.value===it.name))
                                                ?.displayValue  

            let yesNoVariations = productItem.attributes.filter( a => item.variation.find(
                                                                    i => a.id ===i.id
                                                                    && i.name==='Yes'))
                                                                ?.map(a => a.name)
            
            return title ? title + yesNoVariations.join(' & ') : yesNoVariations.join(' & ')
            //As for color, it shows the product's name and then the color variation.
            //Ex.: Iphone Blue
        }
    }

    public render() {
        const { actualCurrency, products, cart, 
                changeCart, symbol, findCartIndex,
                setCartToggle } = this.props
        let titleKey: 0 | 1 = 0
        let totalPrice: number = 0
        
        for(let a of cart){
            const priceItem = products.find(product=>product.id === a.id)
                                        ?.prices.find(price => price.currency === actualCurrency)
                                        ?.amount
            totalPrice = totalPrice + (priceItem! * a.quantity)
        }

         const productTitle = (productItem: Product, item: CartItem): string | undefined => { 
            titleKey = titleKey===0 ?1 :0
            return this.productTitle(productItem, item)
        }

        return(
                <div className={`cart-menu-const ${this.props.cartToggle ? 'cart-menu' : 'none-cart'}`}>
                    <p className='cart-title'>My bag, <span>{cart.length} items.</span></p>
                    
                    {
                        products && cart.map(
                            (item, itemIndex )=> products
                            .filter(
                                product => product.id === item.id
                            )
                            .map(
                                (productItem, index) => (
                                    <div className='cart-item' key={index}>
                                        
                                        <LeftPart
                                            symbol={symbol}
                                            titleKey={titleKey}
                                            productItem={productItem}
                                            productTitle={productTitle}
                                            actualCurrency={actualCurrency}
                                            item={item}
                                            changeCart={changeCart}
                                            itemIndex={itemIndex}
                                            findCartIndex={findCartIndex}
                                        />
                                            
                                        <CenterPart
                                            itemIndex={itemIndex}
                                            item={item}
                                            changeCart={changeCart}
                                        />
                                        
                                        <div className='right-part-item'>
                                            <Link to={`/product/${productItem.id}`}>
                                                <img src={productItem.gallery[0]} alt={productItem.name}/>
                                            </Link>
                                        </div>

                                    </div>
                                )
                            )
                        )
                    }
                    <Footer 
                        symbol={symbol} 
                        totalPrice={totalPrice}
                        setCartToggle={setCartToggle}
                    />
                </div>
        )    
        
  }
}
export interface ICartMenuProps {
    cartToggle: boolean
    cart: Array<CartItem>
    changeCart:(arg: number, arg2?: number, arg3?: {name: string, id: string}) => void
    actualCurrency: string
    products: Array<Product>
    symbol: string
    findCartIndex: (arg: CartItem) => number
    setCartToggle: (arg:any) => void
}

