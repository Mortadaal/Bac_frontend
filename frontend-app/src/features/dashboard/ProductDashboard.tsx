import { Grid } from "semantic-ui-react";
import ProductList from "./ProductList";
import ProductsForm from "../products/forms/ProductsForm";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import CategoryForm from "../products/forms/CategoryForm";
import DeleteCategoryForm from "../products/forms/DeleteCategoryForm";





export default observer( function ProductDashboard() {

    const {productStore,categoryStore}=useStore();
    const {editMode}=productStore;
    const {editModeCategory,editModeDeleteCategory}=categoryStore;
    return (
        
        <Grid className="DashbordGrid">

            <Grid.Column width={10}>
               <ProductList/>
            </Grid.Column>
            <Grid.Column width={6}>
                { editMode&&
                <ProductsForm />}
                 {editModeCategory&&
            <CategoryForm/>}
            {editModeDeleteCategory&&
            <DeleteCategoryForm/>}
            </Grid.Column>
        </Grid>
    )
})


