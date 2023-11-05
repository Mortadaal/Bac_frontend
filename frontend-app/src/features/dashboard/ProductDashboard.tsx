import { Grid } from "semantic-ui-react";
import { Products } from "../../app/models/products";
import ProductList from "./ProductList";
import ProductsForm from "../products/forms/ProductsForm";
import { Category } from "../../app/models/category";



interface Props{
    products:Products[];
    category:Category[];
    selectedProduct:Products|undefined;
    createOrEdit:(product:Products)=>void;
    selectProduct:(id:number)=>void;
    editMode:boolean;
    openForm:(id:number)=>void;
    closeForm:()=>void;
    deleteProduct:(id:number)=>void;
    deleteCategory:(id:number)=>void;
    submitting:boolean;
}

export default function ProductDashboard({products,selectedProduct,openForm,closeForm,editMode,category,createOrEdit,deleteProduct,deleteCategory,submitting}:Props) {


    return (
        
        <Grid className="DashbordGrid">
            <Grid.Column width={10}>
               <ProductList 
               products={products}
               openForm={openForm}
               category={category}
               deleteProduct={deleteProduct}
               deleteCategory={deleteCategory}
               />
            </Grid.Column>
            <Grid.Column width={6}>
                { editMode&&
                <ProductsForm 
                products={selectedProduct}
                category={category}
                closeForm={closeForm}
                createOrEdit={createOrEdit}
                submitting={submitting}
                />}
            
            </Grid.Column>
        </Grid>
    )
}


