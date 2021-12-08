import * as React from 'react'
import Vector from '../assets/Vector.svg'
import Cart from '../assets/cart.svg'
import './style.css'

export interface IAppProps {
    setToggle: (arg: any) => void
    toggle: boolean
    cartToggle: boolean
    setCartToggle: (arg:any) => void
    actualCurrency: string
    cartItems: number
    symbol: string
}


export default class App extends React.Component<IAppProps> {

    componentDidMount(){

       window.addEventListener('mouseup',(e): void=>{ //So currency menu will close whenver the user click outside.
            const box_target = document.querySelector('.nav-item')! //Currency-menu
            let target_click = e.target as Element

            if(target_click !== box_target && target_click.parentNode !== box_target ){
                this.props.setToggle(false)
            }
       })

       window.addEventListener('mouseup',(e): void=>{ //Cart-menu
            const cart = document.querySelectorAll('.nav-item')[1]!
            const cart_menu = document.querySelector('.cart-menu-const')!
            let target_click = e.target as Element

            if( target_click !== cart 
                && target_click.parentNode !== cart
                && target_click!== cart_menu 
                && !cart_menu.contains(target_click)){

                    this.props.setCartToggle(false)
                }
       })

    }

    public render() {
        return (
            <div className='right-nav'>
                <div className='nav-item'
                    onClick={
                        ()=> this.props.setToggle(!this.props.toggle)
                    }
                >
                    <div className='cifra'> {/**Currency-menu button */}
                        {this.props.symbol}
                    </div>
                    <div>
                        <img src={Vector} alt='' className={this.props.toggle ?'rotate-vector' : 'drop-vector'}/>
                    </div>
                </div>
                <div className='nav-item' //Cart-menu button
                    onClick={
                        ()=> this.props.setCartToggle(!this.props.cartToggle)
                    }
                >
                        <img src={Cart} alt=''
                            width='20px' height='20px'
                        />
                </div>
                <div className={this.props.cartItems > 0 ?'cart-span' :'cart-span-none'}>
                        {this.props.cartItems}
                </div>
            </div>
        );
  }
}
