import { Component } from 'react'
import right from '../assets/right.svg'
import left from '../assets/left.svg'
import './style.css'

interface Props {
    gallery: Array<string>
}
interface State {
    actualIndex: number
    gallery: Array<string>
}

export default class Carousel extends Component<Props, State> {

    constructor(props:Props){
        super(props)
        this.state ={ 
            actualIndex: 0,
            gallery: this.props.gallery
        }
    }

    protected passImage = (number: 1 | -1 | 0) => {
        this.setState(prev => ({
            ...prev,
            actualIndex: prev.actualIndex + number
        }))
    }

    render() {
        const { actualIndex, gallery } = this.state

        return (
            <div className='carousel'>
                <div className='arrow-button-right'
                                    onClick={()=>{
                                        this.setState(prev=>({
                                            ...prev,
                                            actualIndex: prev.actualIndex + 1
                                        }))
                                    }}
                                >
                                    <img 
                                        alt='arrow' 
                                        src={right} 
                                        className={`right ${actualIndex===(gallery.length-1) ? 'none' : ''}`}                 
                                    />
                                </div>

                                <div className='arrow-button-left'
                                    onClick={()=>{
                                        this.setState(prev=>({
                                            ...prev,
                                            actualIndex: prev.actualIndex - 1
                                        }))
                                    }}
                                >
                                    <img 
                                        alt='arrow' 
                                        src={left} 
                                        className={`left ${actualIndex===0 ? 'none' : ''}`}
                                    />
                                </div>
                {
                    gallery.map(
                        (image, imageIndex) =>(
                            <div className='carousel-item'
                                key={imageIndex}
                            >
                                <img 
                                    src={image} 
                                    alt='carousel'
                                    className={`image-carousel ${imageIndex === actualIndex
                                                                    ?'active-image': ''}`}
                                    onError={()=>{ //Dealing with possible broken images
                                        this.setState(state=>({
                                            ...state,
                                            gallery: state.gallery.slice(0,imageIndex)
                                                        .concat(state.gallery.slice(imageIndex+1))
                                        }))
                                    }}
                                />
                                
                            </div>
                        )
                    )
                }
            </div>
        )
    }
}
