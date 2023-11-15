import { Grid } from "semantic-ui-react";
import ProductList from "./ProductList";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";






export default observer(function ProductDashboard() {

    const { productStore, categoryStore } = useStore();
    const {loadProducts,productRegistry}=productStore;
    const {loadCategorys,categoryRegistry}=categoryStore;

    useEffect(() => {
       if(productRegistry.size <=1) loadProducts();
    }, [loadProducts,productRegistry.size])

    useEffect(() => {
        if(categoryRegistry.size <=1)loadCategorys();
    }, [loadCategorys,categoryRegistry.size])
    if(productStore.loadingInitial) return <LoadingComponent content='Indlæser Liste'/>
    return (

        <Grid className="DashbordGrid">

            <Grid.Column width={10}>
                <ProductList />
            </Grid.Column>

        </Grid>
    )
})


