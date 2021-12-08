import { client } from "../../client-graphql"
import { gql } from "@apollo/client"

class idProduct {
    public readonly fetch: (set:any, id: string, no?: any) => Promise<void>

    constructor(){
        this.fetch = async(set:any, id: string, no?: any) => {
            try{

                const { data : { product }} = await client.query({
                    query: gql`
                        {
                            product(id:"${id}"){
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
                    `
                })

                if(product){
                    no(true)
                    return set(product)
                }
                if(product === null) return no(false)
            } 
            catch(e) {
                console.log(e)
            }
        }
    }
}

export default new idProduct().fetch

