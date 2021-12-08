import * as React from 'react'
import { Product, CartItem } from '../../../../config/schema/types'
import './style.css'

export default class LeftPart extends React.Component<ILeftPartProps, State> {

constructor(props: ILeftPartProps){
    super(props)
    this.state = { 
        actualColor: this.props.item.variation.find(v => v.id==='Color')?.name!
    }
}
  
protected handleColor = (nC: {id: string, name: string}): void => {
    const index = this.props.findCartIndex(this.props.item)
    
    if(index === -1) return
    
    this.props.changeCart(index, undefined, nC)
} 
componentDidUpdate(prev: ILeftPartProps){
    if(prev.item.variation!==this.props.item.variation){
        this.setState({
            ...this.state,
            actualColor: this.props.item.variation.find(v => v.id==='Color')?.name!
        })
    }
}                      
  
public render() {
    const { symbol, titleKey, productItem, 
        productTitle, changeCart, item, 
        actualCurrency, itemIndex } = this.props  
    const { actualColor } = this.state

    return (
         <div className='left-part-item'>
            <div className='left-part-text'>
                <div className='item-title' key={titleKey!}>{productItem.brand}<br/> {productItem.name} {productTitle(productItem, item)}
                </div>
                <div className='item-price'>
                    {symbol}
                    {[productItem.prices
                        .find(price => price.currency === actualCurrency)]
                        .map(price => Math.round((price?.amount! + Number.EPSILON)*100)/100)                                                                   
                    } 
                </div>
            </div>
            <div className='item-options'>
                {
                    productItem.attributes.filter(
                        product => product.type ==='text'
                    )
                    .filter(
                        attribute => item.variation.filter(
                            variation => variation.id === attribute.id
                        )
                    )
                    .map(
                        attributeItem => (
                            attributeItem.items.map(
                                i =>   i.displayValue !== 'Yes' && i.displayValue !== 'No' 
                                        ?<div className={`variation ${item.variation.find( variation => variation.name === i.value) 
                                                                                                        ? 'selected-variation' : ''}`}
                                            onClick={()=>changeCart(itemIndex,undefined,{name:i.value!, id:attributeItem.id!})}
                                        >
                                        
                                            <div>
                                                {i.value.slice(0,4)}
                                            </div>
                                        
                                        </div>
                                        :null                      
                            )
                        )
                    )
                }
                {
                    item.variation.filter(
                        v => v.name === 'Yes' || v.name === 'No'
                    )?.map(
                        v =><div className={`variation ${v.name === 'Yes' ? 'selected-variation' : ''}`}
                                onClick={()=>changeCart(itemIndex, undefined, 
                                    {name: v.name === 'Yes' ? 'No' : 'Yes', id:v.id})}
                            >
                                <div>
                                    {   v.id.toLocaleLowerCase().includes('usb')
                                            ?'USB'
                                            :v.id.toLocaleLowerCase().includes('touch')
                                            ?'ID'
                                            :v.id.slice(0,5)
                                    }
                                </div>

                            </div>
                    )
                }
                { //Color square
                    productItem.attributes.filter(
                        product => product.type ==='swatch'
                    )
                    .filter(
                        attribute => attribute.id === 'Color'
                        
                    )?.map(
                        attribute => attribute.items.map(
                            color => {
                                let notColor = attribute.items.filter(item => item!==color)

                                return color.value === actualColor &&
                                <div className='color-cart-menu'
                                            style={{backgroundColor: actualColor}}
                                        >
                                <div className='content-color'>
                                    
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
                                                        changeCart(itemIndex, undefined, {id:'Color', name:nC.value})
                                                    }}
                                                      />
                                            )
                                        }
                                    </div>
                                    <div className='horizontal-colors animated-block'>
                                        {
                                            notColor.slice(2,4).map(
                                                nC =><div
                                                        className='color-option-select'
                                                        style={{backgroundColor:nC.value}}
                                                        onClick={()=>{
                                                                this.setState(prev=>({
                                                                ...prev,
                                                                actualColor: nC.value
                                                            }))
                                                            changeCart(itemIndex, undefined, {id:'Color', name:nC.value})
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
    );
  }
}

export interface ILeftPartProps {
    symbol: string
    titleKey: 0 | 1
    productTitle: (productItem: Product, item: CartItem)=> string | undefined
    productItem: Product
    actualCurrency: string
    item: CartItem
    changeCart: (arg: number, arg2?: number, arg3?: {name: string, id: string}) => void
    findCartIndex: (arg: CartItem) => number
    itemIndex: number
}

export interface State {
    actualColor: string
}