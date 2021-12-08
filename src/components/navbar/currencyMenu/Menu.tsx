import { Component } from 'react'
import './style.css'

export interface IAppProps {
    currencies: Array<string>
    setCurrency: any
    isActive: boolean
    symbols: Array<string>
}

export default class App extends Component<IAppProps> {
  public render() {
    const { currencies, setCurrency, symbols } = this.props
    return (
      <div className={`menu-card ${this.props.isActive ? 'activeToggle' : ''}`}>
        {
            currencies && currencies.map(
                (currency, index) => (
                    <div className='currency' key={index} 
                      onClick={()=>{
                        setCurrency(currency,symbols[index])
                      }}
                    >
                      <p>
                        {symbols[index]} { currency }
                      </p>
                    </div>
                )
            )
        }
      </div>
    );
  }
}
