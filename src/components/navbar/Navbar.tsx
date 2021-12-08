import { Component } from 'react'
import { Link } from 'react-router-dom'
import LeftNav from './leftNav/LeftNav'
import RighNav from './rightNav/RightNav'
import CurrencyMenu from './currencyMenu/Menu'
import CartMenu from './cartMenu/Menu'
import Logo from './assets/a-logo.svg'
import { CartItem, Product } from '../../config/schema/types'
import './style.css'

class Navbar extends Component<nav.props, nav.state> { 
    
    constructor(props: nav.props) {
        super(props)

        this.state = {
            params: new URL(window.location.href).pathname,
            currencyToggle: false,
        }
    }   

    private setParams = (arg: string) : void =>{
        this.setState({
            ...this.state,
            params: arg,
        })
    }

    private setToggle = (arg: boolean) : void =>{
        this.setState({
            ...this.state,
            currencyToggle: arg,
        })
    }

    public render(){
        const { categories, currencies, actualCurrency,
            setCurrency, cartToggle, setCartToggle,
            cart, changeCart, symbol, cartProducts,
            findCartIndex } = this.props
        
        const { params, currencyToggle } = this.state
        const symbols = ['$','£','A$','¥','₽']
        const isActive = (category: string): string => params.includes(category) //in case the user just type the URL, instead of navigate to it.
                                                        ? 'active'
                                                        : ''
        let cartTotalItem: number = 0
        for( let a of cart ){
            cartTotalItem = cartTotalItem + a.quantity
        }

        return(
            <>
                <nav className='navbar'>
                    <LeftNav
                        isActive={isActive}
                        categories={categories}
                        setParams={this.setParams}
                   />
                    
                    <Link to='/' className='pointer-logo' onClick={()=>{
                        this.setParams('')
                        }}> 
                        <div className='icon'>
                            <img src={Logo} alt='logo'/>
                        </div>
                    </Link>

                    <RighNav
                        setToggle={this.setToggle}
                        toggle={currencyToggle}
                        cartToggle={cartToggle}
                        setCartToggle={setCartToggle}
                        actualCurrency={actualCurrency}
                        cartItems={cartTotalItem}
                        symbol={symbol}
                    />

                </nav>
                    <CurrencyMenu 
                        currencies={currencies}
                        setCurrency={setCurrency}
                        isActive={currencyToggle}
                        symbols={symbols}
                    />
                    <CartMenu
                        cartToggle={cartToggle}
                        cart={cart}
                        actualCurrency={actualCurrency}
                        products={cartProducts}
                        changeCart={changeCart}
                        symbol={symbol}
                        findCartIndex={findCartIndex}
                        setCartToggle={setCartToggle}
                    />
            </>
        )
    }
}

export default Navbar

declare namespace nav {
    interface props {
        categories: Array<string>
        currencies: Array<string>
        actualCurrency: string
        setCurrency: any
        cartToggle: boolean
        setCartToggle: (arg:any) => void
        cart: Array<CartItem>
        cartProducts: Array<Product>
        changeCart:(arg: number, arg2?: number, arg3?:{name: string, id: string}) => void
        symbol: string
        findCartIndex: (arg: CartItem) => number
    }
    interface state {
        params: string
        currencyToggle: boolean
    }
}

