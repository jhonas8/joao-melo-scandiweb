import * as React from 'react'
import './style.css'
import { Link } from 'react-router-dom'

export default class NotFound extends React.Component<{}> {
  public render() {
    return (
      <div className='container'>
        <div className='notfound'>
          <h1>
              404 ERROR!
          </h1>
          <p>
            Looks like it's the only thing we can't offer you. Go to <Link to='/'>homepage</Link>.
          </p>
        </div>
      </div>
    );
  }
}
