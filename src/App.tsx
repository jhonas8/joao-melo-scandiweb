import { Component } from 'react'
import { categories, currencies } from './config/fetch'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { CartPage, Homepage, Navbar, Notfound, ProductPage } from './components'
import { Product, CartItem } from './config/schema/types'

export default class App extends Component<{}, State> {
  
  constructor(props: {}){
    super(props) 

    this.state = {
      categories: null,
      cart: [],
      currencies: null,
      actualCurrency: 'USD',
      cartToggle: false,
      symbol: '$',
      cartProducts: [],
      isThereAProduct: true
    }
  }
  
  public readonly setCategories = (parameter: any): void =>{
    this.setState({
      ...this.state,
      categories: parameter,
    })
  }

  public readonly setCurrencies = (parameter: string[] ): void =>{
    this.setState({
      ...this.state,
      currencies: parameter,
    })
  }

  public readonly setCurrency = (parameter: string, parameter2: string): void =>{
    this.setState({
      ...this.state,
      actualCurrency: parameter,
      symbol: parameter2,
    })
  }

  public readonly setCartToggle = (parameter: boolean ): void =>{
    this.setState({
      ...this.state,
      cartToggle: parameter,
    })
  }
  public readonly setCartProducts = (parameter: Product[]): void =>{
    this.setState({
      ...this.state,
      cartProducts: parameter,
    })
  }
  public readonly setNotFound = (parameter: boolean): void =>{
    this.setState({
      ...this.state,
      isThereAProduct: parameter,
    })
  }

  public readonly addNewItemCart = (parameter?: Product, cartItem?: CartItem): void =>{
    const { cart } = this.state

    if(parameter && cartItem === undefined){
      const textAttributes = parameter?.attributes.filter(a => a.type==='text')!
      const swatchAttributes = parameter?.attributes.filter(a => a.type ==='swatch')!

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
      const itemCart: CartItem = {id:parameter.id, quantity:1, variation:[...arraySwatch, ...arrayText]}
      const index = cart.findIndex(c => c.id === itemCart.id
                                    && c.variation.filter(
                                      v=> itemCart.variation.find( iC => iC.id === v.id 
                                                                  && iC.name === v.name)
                                      ).length === itemCart.variation.length
                                    ) //if the number of matched attributes is equal to the total number
                                    //of attributes, then the two compared products are identical.
      if(index >= 0) return this.changeCart(index, 1)

      return this.setState(prevS =>({
        ...prevS,
        cart: [...prevS.cart, itemCart],
        cartProducts: prevS.cartProducts?.includes(parameter)
        ?prevS.cartProducts : [...prevS.cartProducts!, parameter]
      }))

    } 
    if(cartItem && parameter){
      const index = cart.findIndex(c => c.id === cartItem.id
        && c.variation.filter(
          v=> cartItem.variation.find( iC => iC.id === v.id 
                                      && iC.name === v.name)
          ).length === cartItem.variation.length
        )

        if(index >= 0) return this.changeCart(index, 1)

        this.setState(prevS =>({
          ...prevS,
          cart: [...prevS.cart, cartItem],
          cartProducts: prevS.cartProducts?.includes(parameter)
                        ?prevS.cartProducts : [...prevS.cartProducts!, parameter]
        }))
    }
  }

  public readonly changeCart = (index: number, value?: number, variation?: {name: string, id: string}): void =>{
    const firstHalf = this.state.cart?.slice(0, index)
    const secondHalf = this.state.cart?.slice(index + 1)
    const indexProduct = this.state.cartProducts?.findIndex(cp => cp.id === this.state.cart[index].id)!
    const changingElement = this.state.cart![index]
    let changedElement: CartItem

    if(value){
      changedElement = {...changingElement, quantity:changingElement.quantity + value!}
      let newCart = firstHalf!.concat([changedElement].concat(secondHalf!))
      let newCartProducts = this.state.cartProducts
  
      if(changedElement.quantity === 0){
        newCart = firstHalf!.concat(secondHalf!)
        if(!newCart.find(c => c.id === this.state.cart[index].id)){
          newCartProducts = this.state.cartProducts?.slice(0,indexProduct)
                          .concat(this.state.cartProducts?.slice(indexProduct+1))!
        }
      } 
  
      this.setState({
          ...this.state,
          cart: newCart,
          cartProducts: newCartProducts
      })
    }else if(variation){
      const variationIndex = this.state.cart![index].variation.findIndex(v=>v.id === variation.id)
      const firstVariation = this.state.cart![index].variation.slice(0, variationIndex)
      const secondVariation = this.state.cart![index].variation.slice(variationIndex + 1)


      changedElement = {...changingElement, variation: firstVariation.concat(variation).concat(secondVariation)}
      let newCart = firstHalf!.concat([changedElement].concat(secondHalf!))
    
      this.setState({
          ...this.state,
          cart: newCart
      })
    }
  }

  public findCartIndex = (item: CartItem): number =>
    this.state.cart.findIndex( cartItem => cartItem.id === item.id)

  protected fetchProcess = async(): Promise<void> =>{
    categories(this.setCategories)

    currencies(this.setCurrencies)
  }

  componentDidMount(){
    this.fetchProcess()
  }
  
  render() {
    const { categories, actualCurrency, 
          symbol, cartToggle, cart, cartProducts } = this.state

    return categories && actualCurrency.length > 1 && (
      <div>
        <Router>
        <Navbar
          categories={this.state.categories!}
          currencies={this.state.currencies!}
          actualCurrency={this.state.actualCurrency}
          setCurrency={this.setCurrency}
          cartToggle={this.state.cartToggle}
          setCartToggle={this.setCartToggle}
          cart={this.state.cart!}
          changeCart={this.changeCart}
          cartProducts={cartProducts!}
          symbol={this.state.symbol}
          findCartIndex={this.findCartIndex}
        />
          <Switch>
            <Route exact path='/'
                render={()=><Homepage
                categories={categories!}
                cartToggle={cartToggle}
                categoryName='All Products'
                actualCurrency={actualCurrency}
                symbol={symbol}
                addNewItemCart={this.addNewItemCart}
              />}
            />
              <Route path='/category/:categoryName'
                render={(props)=>{
                  const title = categories?.find(category => category === props.match.params.categoryName)
                  return title 
                          ?<Homepage
                            cartToggle={cartToggle}
                            categoryName={title}
                            categories={categories!}
                            actualCurrency={actualCurrency}
                            symbol={symbol}
                            addNewItemCart={this.addNewItemCart}
                          />
                          :<Notfound/>
                }}
              />
              <Route exact path='/cart' 
                render={()=><CartPage
                  cart={cart}
                  cartToggle={cartToggle}
                  actualCurrency={actualCurrency}
                  symbol={symbol}
                  changeCart={this.changeCart}
                  cartProducts={cartProducts!}
                  key={cart.length}
                />}
              />
              <Route path='/product/:productID'
                render={(props)=>{
                  const productID = props.match.params.productID
                  if(!this.state.isThereAProduct) return <Notfound/>

                  return <ProductPage
                            productID={productID}
                            actualCurrency={actualCurrency}
                            symbol={symbol}
                            cartToggle={cartToggle}
                            addNewItemCart={this.addNewItemCart}
                            key={productID}
                            setNotFound={this.setNotFound}
                        />
                  }
                }
              />
              <Route component={Notfound}/>
          </Switch>
        </Router>
      </div>
    )
  }
}



interface State {
  categories: Array<string> | null //Only classes' name
  cart: Array<CartItem> //As the there's no cart system on backend, I'll simulate it on front.
  cartProducts: Array<Product> | null
  currencies: Array<string> | null
  actualCurrency: string
  cartToggle: boolean
  isThereAProduct: boolean
  symbol: string
}
