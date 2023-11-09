import { makeAutoObservable, runInAction } from "mobx";
import { Products } from "../models/products";
import agent from "../api/agen";

export default class ProductStore {

    productRegistry = new Map<number, Products>();
    selectedProduct: Products | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }
    get productById() {
        return Array.from(this.productRegistry.values())
        .sort((a, b) => a.productPrice - b.productPrice);
    };

    loadProducts = async () => {
        try {
            const products = await agent.Products.list();
            runInAction(() => {
               
                products.forEach((product) => {
                    this.productRegistry.set(product.id, product);
                });

                this.loadingInitial = false;
            })

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingInitial = false;
            })

        }
    }
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = (state);
    }
    selectProduct = (id: number) => {
        this.selectedProduct = this.productRegistry.get(id);
    }
    cancelSelectedProduct = () => {
        this.selectedProduct = undefined;
    }
    openForm = (id?: number) => {
        id ? this.selectProduct(id) : this.cancelSelectedProduct();
        this.editMode = true;
    }
    closeForm = () => {
        this.editMode = false;
    }

    createProduct = async (product: Products) => {
        this.loading = true;
        product.id = product.id;
        try {
            await agent.Products.create(product);
            runInAction(() => {
                this.productRegistry.set(product.id, product);
                this.selectedProduct = product;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    EditProduct = async (product: Products) => {
        this.loading = true;
        try {
            await agent.Products.update(product);
            runInAction(() => {
                this.productRegistry.set(product.id, product);
                this.selectedProduct = product;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteProduct = async (id: number) => {
        this.loading = true;
        try {
            await agent.Products.delete(id);
            runInAction(() => {
                this.productRegistry.delete(id);
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}