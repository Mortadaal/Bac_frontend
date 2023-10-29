import { Grid } from "semantic-ui-react";
import { Products } from "../../app/models/products";
import ProductList from "./ProductList";
import ProductsEditDetails from "../products/details/ProductsEditDetails";

interface Props{
    products:Products[];
    selectedProduct:Products|undefined;
    selectProduct:(id:number)=>void;
    cancelSelectProduct:()=>void;
    editMode:boolean;
    openForm:()=>void;
    closeForm:()=>void;
}

export default function ProductDashboard({products,selectedProduct,selectProduct,cancelSelectProduct,openForm}:Props) {
    return (
        <Grid className="DashbordGrid">
            <Grid.Column width={10}>
               <ProductList products={products} selectProduct={selectProduct} openForm={openForm}/>
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedProduct&&
                <ProductsEditDetails products={selectedProduct} cancleSelectProduct={cancelSelectProduct}/>}
            </Grid.Column>
        </Grid>
    )
}