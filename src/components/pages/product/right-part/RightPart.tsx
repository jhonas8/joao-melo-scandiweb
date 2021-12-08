import { Component } from 'react'
import { Product, CartItem } from '../../../../config/schema/types'

interface Props {
    product: Product
    handleButton: (attribute: Product['attributes'][0], a: Product['attributes'][0]['items'][0])=> void
    symbol: string
    actualCurrency: string
    addNewItemCart: (parameter?: Product, cartItem?: CartItem) => void
    cartItemPage: CartItem | null
}

export default class RightPart extends Component<Props> {

    render() {
        const { product, handleButton, symbol,
                actualCurrency, addNewItemCart, cartItemPage } = this.props
        return (
            <div className='right-part-PP'>
                        <div className='title-PP'>
                            <p className='product-brand'>{product.brand}</p>
                            <p>{product.name}</p>
                        </div>

                        <div className='variations-container-PP'>
                            {   product.attributes.length > 0
                                &&product.attributes.map(
                                    attribute => (
                                        <div className='variations-PP' key={attribute.id}>
                                            <p>{attribute.name}:</p>
                                            <div className='variations-all'>
                                                {
                                                    attribute.type ==='swatch'
                                                    ?(
                                                        attribute.items.map(
                                                            a => <div className={`variation-button-PP swatch
                                                                ${cartItemPage?.variation.find(
                                                                    v => v.id === 'Color'
                                                                    && v.name === a.value
                                                                ) ? 'selected-swatch' : ''}`}
                                                                style={{backgroundColor: a.value}}
                                                                onClick={(e)=> {
                                                                    handleButton(attribute, a)
                                                                    const div = e.target as HTMLElement
                                                                    document.querySelectorAll('.swatch').forEach(el=>{
                                                                        let element = el as HTMLElement
                                                                        if(element===div) return div.classList.add('selected-swatch')
                                                                        el.classList.remove('selected-swatch')
                                                                    })
                                                                }}
                                                                key={a.id}
                                                            />
                                                        )
                                                    )
                                                    :(
                                                        attribute.items.map(
                                                            a=> <div className={`variation-button-PP 
                                                                                ${cartItemPage?.variation.find(
                                                                                    v => v.name === a.value
                                                                                        && v.id === attribute.id
                                                                                ) ?'selected' :''}`}
                                                                    key={a.id}
                                                                    onClick={()=> handleButton(attribute, a)}
                                                            >
                                                                    {a.value}
                                                                </div>
                                                        )   
                                                    )
                                                }
                                            </div>
                                        </div>
                                    )
                                )
                            }
                        </div>
                        {product.attributes.length > 0 &&<div className='price-margin'/>}
                        <div className='price-PP'>
                            <p>Price:</p>
                            {symbol}
                            {product.prices.find(price=>price.currency===actualCurrency)
                            ?.amount}
                        </div>

                        <div className={`button-PP ${!product.inStock && 'no-stock'}`}
                            onClick={()=>addNewItemCart(product, cartItemPage!)}
                        >
                            Add to Cart
                        </div>
                        
                    </div>
        )
    }
}
