import * as React from 'react'
import { Product } from '../../config/schema/types'
import { productsCategory } from '../../config/fetch'
import Products from './products/Products'
import AnimatedTitle from './animations/title/Title'
import './style.css'

export default class Home extends React.Component<IHomeProps, State> {

    constructor(props: IHomeProps){
        super(props)
        this.state = {
            productsCategory: [],
        }
    }

    public readonly setProductsCategory = (parameter: Product[]) =>{
        this.setState({
            ...this.state,
            productsCategory: parameter,
        })
    }

    protected allProductsFetch = (prevC?: string) =>{
        const setAllProducts = (parameter: Product[]) =>{
            this.setState(prevS =>({
                ...prevS,
                productsCategory: [...prevS.productsCategory!, ...parameter]
            }))
        }
        for(let c of this.props.categories){
            if(prevC && c !== prevC) return productsCategory(setAllProducts, c)
            productsCategory(setAllProducts, c)
        }
    }

    componentDidMount(){
        if(this.props.categoryName !== 'All Products'){
            productsCategory(this.setProductsCategory, this.props.categoryName)
        }else {
            this.allProductsFetch()
        }
    }

    componentDidUpdate(prevProps: IHomeProps){
        if(prevProps.categoryName !== this.props.categoryName
            && this.props.categoryName !== 'All Products'){
            productsCategory(this.setProductsCategory, this.props.categoryName)
        }
        if(prevProps.categoryName !== this.props.categoryName
            && this.props.categoryName === 'All Products'){
                this.allProductsFetch(prevProps.categoryName)
            }
    }

    public render() {
            const { cartToggle, categoryName, actualCurrency, 
                    symbol, addNewItemCart } = this.props
            const { productsCategory } = this.state

            const title = categoryName[0].toUpperCase().concat(categoryName.slice(1))
            return (
            <>
                <div className={cartToggle ? 'overlay' : ''}/>
                <div className='container'>
                    <div className='title-page'>
                        <AnimatedTitle text={title}/>
                    </div>
                    <Products 
                        products={productsCategory!}
                        actualCurrency={actualCurrency}
                        symbol={symbol}
                        categoryName={categoryName}
                        page={title}
                        addNewItemCart={addNewItemCart}
                    />
                </div>
            </>
            );
    }
}

export interface IHomeProps {
    cartToggle: boolean
    categoryName: string
    actualCurrency: string
    symbol: string
    categories: string[]
    addNewItemCart: (parameter: Product) => void
}

export interface State {
    productsCategory: Product[] | null
}