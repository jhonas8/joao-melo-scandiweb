import { client } from '../client-graphql'
import { gql } from '@apollo/client'

class categories {
    public readonly fetchCategories : (set: any)=> Promise<boolean>

    constructor(){
        this.fetchCategories = async(set: any): Promise<boolean> =>{
        const { data: { categories } } = await client.query({
                query:gql`
                {
                    categories{
                        name
                    }
                }
                `
            })
            set(categories.map((category: any) => category.name)) //For our frontend structure, the __type property is useless
            return true
        }
    }
}
export default new categories().fetchCategories