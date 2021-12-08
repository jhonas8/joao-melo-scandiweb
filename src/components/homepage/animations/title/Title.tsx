import * as React from 'react'
import './style.css'

export interface IAnimatedTextProps {
    text: string
}

export default class AnimatedText extends React.Component<IAnimatedTextProps, {update: 0 | 1}> {

    constructor(props: IAnimatedTextProps){
        super(props)
        this.state ={
            update: 0
        }
    }

    componentDidMount(){
        const text = document.querySelectorAll('.animated-container-text span')! as NodeListOf<HTMLElement>
        text.forEach(
            (letter, index) => {
                letter.style.animation= `move-text 0.55s forwards ${(0.5 + index)/10}s`
            }
        )
    }
    componentDidUpdate(prevprops: IAnimatedTextProps){
        const text = document.querySelectorAll('.animated-container-text span')! as NodeListOf<HTMLElement>
        text.forEach(
            (letter, index) => {
                if(letter.style.animation || letter.style.animation === '') letter.style.animation =''
                letter.style.animation= `move-text 0.55s forwards ${(0.5 + index)/10}s`
            }
        )

        if(prevprops.text !==  this.props.text){
            this.setState(pS =>({
                update: pS.update===0 ? 1 : 0 //It will guarantee the animation will always work properly. Try comment this code block to see how the animation will behave.
            }))
        }
    }
    
  public render() {
    const { text } = this.props
    return (
        <div className='animated-container-text' key={this.state.update}>
            {
                text.split("").map(
                    (char, index) => char !== ' '
                    ?<span key={index}>
                        {char}
                    </span>
                    :<span key={index}>
                        &nbsp;
                    </span>
                )
            }
        </div>
    );
  }
}
