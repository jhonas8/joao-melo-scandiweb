import { Component } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

export interface IAppProps {
    categories: Array<string>
    setParams: (arg: string) => void
    isActive: (arg: string) => string
}

export default class App extends Component<IAppProps> {
  public render() {
      const { categories, setParams, isActive } = this.props
    return (
        <div className='left-nav'>
        {
            categories &&(
                categories
                .map(
                    (category, index) => (
                        <Link to={`/category/${category}`} className='pointer-logo' key={index}
                            onClick={()=>{
                                setParams(category)
                            }}
                        >
                            <div className='item'>
                                <div className={`label ${isActive(category)}`}>
                                    {category}
                                </div>
                            </div>
                        </Link>
                    )
                )
            )
        }
    </div>
    )
  }
}
