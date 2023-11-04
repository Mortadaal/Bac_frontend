import { Grid } from "semantic-ui-react";
import { Products } from "../../app/models/products";
import ProductList from "./ProductList";
import ProductsForm from "../products/forms/ProductsForm";
import { Category } from "../../app/models/category";



interface Props{
    products:Products[];
    category:Category[]|Category;
    selectedProduct:Products|undefined;
 
    selectProduct:(id:number)=>void;
    editMode:boolean;
    openForm:(id:number)=>void;
    closeForm:()=>void;
}

export default function ProductDashboard({products,selectedProduct,openForm,closeForm,editMode,category }:Props) {


    return (
        
        <Grid className="DashbordGrid">
            <Grid.Column width={10}>
               <ProductList 
               products={products}
               openForm={openForm}
               category={category}/>
            </Grid.Column>
            <Grid.Column width={6}>
                { editMode&&
                <ProductsForm 
                products={selectedProduct}
                category={category}
                closeForm={closeForm}
                />}
            
            </Grid.Column>
        </Grid>
    )
}


