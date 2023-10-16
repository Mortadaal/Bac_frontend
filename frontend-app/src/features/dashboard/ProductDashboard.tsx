import { Grid, List } from "semantic-ui-react";
import { Products } from "../../app/models/products";
import ProductList from "./ProductList";

interface Props{
    products:Products[];
}

export default function productDashboard({products}:Props) {
    return (
        <Grid>
            <Grid.Column width={10}>
               <ProductList products={products}/>
            </Grid.Column>
        </Grid>
    )
}