import { client } from '../client-graphql'
import { gql } from '@apollo/client'

class currencies {
    public readonly fetchCurrencies : (set: any)=> Promise<void>

    constructor(){
        this.fetchCurrencies = async(set: any): Promise<void> =>{
        const { data: { currencies } } = await client.query({
                query:gql`
                {
                    currencies
                }
                `
            })
            set(currencies)
        }
    }
}
export default new currencies().fetchCurrencies