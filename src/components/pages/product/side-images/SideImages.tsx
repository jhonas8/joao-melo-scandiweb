import { Component } from 'react'
import { Product } from '../../../../config/schema/types'
import './style.css'

interface Props {
    product: Product
    setImage: (image: string) => void
}

export default class SideImages extends Component<Props> {

    componentDidMount(){
        document.querySelectorAll('img').forEach(img => { // To prevent from displaying any broken image
            img.addEventListener('error', () => { // One of the Jacket's image was broken, for instance.
                img.style.display = 'none'
            })
        })
    }

    render() {
        const { product, setImage } = this.props
        return (
            <div className='side-images'>
                    {
                        product.gallery.map(
                            image => <div className='image-product-side' key={image}>
                                        <img src={image} alt='side-product'
                                            onClick={()=>setImage(image)}
                                        /> 
                                    </div>
                        )
                    }
                </div>
        )
    }
}
