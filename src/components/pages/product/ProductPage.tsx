import * as React from 'react'
import { Product, CartItem } from '../../../config/schema/types'
import RightPart from './right-part/RightPart'
import SideImages from './side-images/SideImages'
import { sanitize } from 'dompurify'
import Interweave from 'interweave'
import './style.css'
import { productsId } from '../../../config/fetch'

export interface IProductProps {
    productID: string
    actualCurrency: string
    symbol: string
    cartToggle: boolean
    addNewItemCart: (parameter?:Product, cartItem?: CartItem) => void
    setNotFound: (parameter: boolean) => void
}

export interface State {
    actualImage: string
    cartItemPage: CartItem | null
    isMobile: boolean
    product: Product | null
}

export default class ProductPage extends React.Component<IProductProps, State> {

    constructor(props : IProductProps){
        super(props)
        this.state = {
            actualImage: '',
            cartItemPage: null,
            isMobile: window.innerWidth >= 768 ? false : true,
            product: null
        }
    }

    protected handleButton = (attribute: Product['attributes'][0], a: Product['attributes'][0]['items'][0]): void => {
        const { cartItemPage } = this.state

        this.setState(prev=>{
            const index = cartItemPage?.variation.findIndex( v => v.id === attribute.id )!
            const newVariation = {name: a.value, id: attribute.id}
            if(index >= 0){
                const firsthalf = cartItemPage?.variation.slice(0, index)!
                const secondhalf = cartItemPage?.variation.slice(index + 1)!

                return {
                    ...prev,
                    cartItemPage: {...prev.cartItemPage!,
                    variation: firsthalf.concat(newVariation).concat(secondhalf)!}
                }
            }
            return {
                ...prev,
                cartItemPage: {...prev.cartItemPage!,
                    variation:prev.cartItemPage?.variation.concat(newVariation)!}
            }
        })
    }

    private setImage = (image: string): void => {
        this.setState(prev=>({
            ...prev,
            actualImage: image
        }))
    }

    public readonly setProduct = (product: Product) =>{
        this.setState(prevS => ({
            ...prevS,
            product: product
        }))
    }

    protected fetchAttributes = (image: string): void=> {
        this.setState(prev =>{
            const { product } = this.state

                const textAttributes = product!.attributes.filter(a => a.type==='text')!
                const swatchAttributes = product!.attributes.filter(a => a.type ==='swatch')!

                let arrayText = textAttributes?.map(
                    attribute => ({
                        name: attribute?.items[0]?.value,
                        id: attribute?.id
                    })
                )

                let arraySwatch = swatchAttributes?.map(
                    attribute => ({
                        name: attribute?.items[0]?.value,
                        id: attribute?.id
                    })
                )

                return ({
                    ...prev,
                    cartItemPage: {
                        id: product!.id,
                        variation: [...arraySwatch, ...arrayText],
                        quantity: 1
                    },
                    actualImage: image
                })
        })
    }

    componentDidMount(){
        productsId(this.setProduct, this.props.productID, this.props.setNotFound)
        document.querySelectorAll('img').forEach(img => { // To prevent from displaying any broken image
            img.addEventListener('error', () => { // One of the Jacket's image was broken, for instance.
                img.style.display = 'none'
            })
        })

        window.addEventListener('resize',()=>{
            this.setState(state=>({
                ...state,
                isMobile: window.innerWidth >= 768 ? false : true
            }))
        })

        //Fetch products attributes
        if(this.state.product){
            this.fetchAttributes(this.state.product.gallery[0])
        } 
    }

    componentDidUpdate(prevProps: IProductProps, prevS: State){
       if(prevProps.productID !== this.props.productID){
            this.fetchAttributes(this.state.product!.gallery[0])
            //Without it, if you navigate directly from one PDP to another, the image
            //will not update.
            
            document.querySelectorAll('img').forEach(img => { // To prevent from displaying any broken image
                img.addEventListener('error', () => { // One of the Jacket's image was broken, for instance.
                    img.style.display = 'none'
                })
            })
       }

       if(prevS.product !== this.state.product){
        this.fetchAttributes(this.state.product!.gallery[0])
       }
    }

    public render() {
        const { actualCurrency, symbol, 
                cartToggle, addNewItemCart } = this.props 

        const { actualImage, cartItemPage, isMobile,
                product } = this.state 

        return product !== null && (
        <>
        <div className={cartToggle ? 'overlay' : ''}/>
        <div className='container' key={product.id}>
                
            {
                isMobile 
                ?(
                    <>
                        <div className='product-description'>
                            <div className='main-image'>
                                <img src={actualImage} alt='product'/>
                            </div>
                            
                            <SideImages product={product} setImage={this.setImage}/>

                            <RightPart
                                product={product}
                                handleButton={this.handleButton}
                                symbol={symbol}
                                actualCurrency={actualCurrency}
                                addNewItemCart={addNewItemCart}
                                cartItemPage={cartItemPage}
                            />

                        <div className='description'>
                            <p className='title'>Description:</p>
                            <p className='description-PP'>
                                <Interweave
                                    content={sanitize(product.description)}
                                />
                            </p>
                        </div>

                        </div>
                    </>
                )
                :(
                    <>
                        <div className='whole-content'>
                        <div className='magic-container'>
                        <SideImages product={product} setImage={this.setImage}/>

                        <div className='product-description'>
                            <div className='main-image'>
                                <img src={actualImage} alt='product'/>
                            </div>
                            
                            <RightPart
                                product={product}
                                handleButton={this.handleButton}
                                symbol={symbol}
                                actualCurrency={actualCurrency}
                                addNewItemCart={addNewItemCart}
                                cartItemPage={cartItemPage}
                            />

                        </div>
                        </div>

                        <div className='description'>
                            <p className='title'>Description:</p>
                            <p className='description-PP'>
                                <Interweave
                                    content={sanitize(product.description)}
                                />
                            </p>
                        </div>
                        </div>
                    </>
                )
            }

            
        </div>
        </>
        );
    }
}
