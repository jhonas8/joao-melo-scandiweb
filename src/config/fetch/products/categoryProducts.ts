import { client } from "../../client-graphql"
import { gql } from "@apollo/client"

class categoryProducts {
    public readonly fetch: (set: any, category: string) => void

    constructor(){
        this.fetch = (set: any, category: string) => {
                client.query({
                    query: gql`
                    {
                        category(input:{title:"${category}"}){
                            products{
                                id name gallery category inStock brand description
                                prices {
                                    amount currency
                                }                            
                                attributes {
                                    id name type 
                                    items{
                                        displayValue value id 
                                    }
                                } 
                            }
                        }
                    }`
                }).then(value =>{
                    const products = value.data.category.products!
                    if(products) return set(products)
                })
        }
    }
}

export default new categoryProducts().fetch