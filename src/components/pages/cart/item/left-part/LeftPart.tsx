import { Component } from 'react'
import { CartItem, Product } from '../../../../../config/schema/types'
import './style.css'
import CartMenu from '../../../../navbar/cartMenu/Menu'

interface Props {
    product: Product
    cartItem: CartItem
    actualCurrency: string
    symbol: string
    index: number
    changeCart:(arg: number, arg2?: number, arg3?: {name: string, id: string}) => void
}
interface State {
    actualColor: string   
}

export default class LeftPart extends Component<Props, State> {

    constructor(props: Props){
        super(props)
        this.state = { 
            actualColor: this.props.cartItem.variation.find(v => v.id==='Color')?.name!
        }
    }

    private isSelected = (item:CartItem, i: Product['attributes'][0]['items'][0]) => item.variation
        .find( variation => variation.name === i.value) 
        ? 'selected-button' : ''           
        
    componentDidUpdate(prev: Props){
        if(prev.cartItem.variation!==this.props.cartItem.variation){
            this.setState({
                ...this.state,
                actualColor: this.props.cartItem.variation.find(v => v.id==='Color')?.name!
            })
        }
    }

    render() {
        const { productTitle } = new CartMenu()
        const { product, cartItem, actualCurrency, symbol, changeCart, index } = this.props
        const { actualColor } = this.state
        return (
            <div className='left-part-container'>
                <div className='cart-page-title'>
                    <p className='h2'>
                        {product.brand}
                    </p>
                    <p className='h3'>
                        {product.name} &nbsp;
                        {productTitle(product, cartItem)}
                    </p>
                </div>

                <div className='price-cart'>
                    <p>
                        {symbol}
                        {[product.prices.find(p=>p.currency===actualCurrency)?.amount!]
                            .map( price => Math.round(((price * cartItem.quantity) + Number.EPSILON)*100)/100)
                            //Summing to EPSILON garantuees we're always rounding the number up, in case of 
                            //it has the format of [integer] + 0.XX5 (I.E.:4.385; 105.265 etc)
                        }
                    </p>
                </div>
                <div className='buttons-container'>
                    {
                        product.attributes.filter( a => a.type === 'text'
                                                && cartItem.variation.find(v => v.id===a.id))
                        ?.map(
                            attribute => attribute.items
                            .filter(
                                item => item.displayValue !== 'Yes'
                                && item.displayValue !== 'No'
                            )
                            .map(
                                item => (
                                    <div className={`button-cart-page ${this.isSelected(cartItem, item)}`}
                                        onClick={()=>changeCart(index,undefined,{name:item.value!, id:attribute.id!})}
                                    >
                                        {item.value}
                                    </div>
                                )
                            )
                        )        
                    }
                    { //Color square
                    product.attributes.filter(
                        product => product.type ==='swatch'
                    )
                    .filter(
                        attribute => attribute.id === 'Color'
                        
                    )?.map(
                        attribute => attribute.items.map(
                            (color, index) => {
                                let notColor = attribute.items.filter(item => item.value!==color.value)

                                return color.value === actualColor &&
                                <div className='color-cart-menu'
                                            style={{backgroundColor: actualColor}}
                                            key={index}
                                        >
                                <div className='content-color' key={index}>
                                    
                                    <div className='vertical-colors animated-block'>
                                        {
                                            notColor.slice(0,2).map(
                                                nC => <div
                                                        className='color-option-select'
                                                        style={{backgroundColor:nC.value}}
                                                        onClick={()=>{
                                                            this.setState(prev=>({
                                                            ...prev,
                                                            actualColor: nC.value
                                                        }))
                                                        changeCart(this.props.index, undefined, {id:'Color', name:nC.value})
                                                    }}
                                                      />
                                            )
                                        }
                                    </div>
                                    <div className='horizontal-colors animated-block'>
                                        {
                                            notColor.slice(2,4).map(
                                                nC => <div
                                                        className='color-option-select'
                                                        style={{backgroundColor:nC.value}}
                                                        onClick={()=>{
                                                            this.setState(prev=>({
                                                            ...prev,
                                                            actualColor: nC.value
                                                        }))
                                                        changeCart(this.props.index, undefined, {id:'Color', name:nC.value})
                                                    }}
                                                      />
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            }
                        )
                    )
                }
                </div>
            </div>
        )
    }
}
