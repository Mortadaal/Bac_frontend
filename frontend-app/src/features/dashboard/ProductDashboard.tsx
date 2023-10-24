import { Grid } from "semantic-ui-react";
import { Products } from "../../app/models/products";
import ProductList from "./ProductList";
import ProductsEditDetails from "../products/details/ProductsEditDetails";

interface Props{
    products:Products[];

}

export default function productDashboard({products}:Props) {
    return (
        <Grid className="DashbordGrid">
            <Grid.Column width={10}>
               <ProductList products={products}/>
            </Grid.Column>
            <Grid.Column width={6}>
                {products[0]&&
                <ProductsEditDetails/>}
            </Grid.Column>
        </Grid>
    )
}