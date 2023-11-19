import { makeAutoObservable, runInAction } from "mobx";
import { Products } from "../models/products";
import agent from "../api/agen";

export default class ProductStore {
  productRegistry = new Map<number, Products>();
  selectedProduct?: Products = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }
  get productById() {
    return Array.from(this.productRegistry.values()).sort(
      (a, b) => a.productPrice - b.productPrice
    );
  }

  loadProducts = async () => {
    this.setLoadingInitial(true);
    try {
      const products = await agent.Products.list();
      products.forEach((product) => {
        this.setProduct(product);
        this.setLoadingInitial(false);
      });
    } catch (error) {
      console.log(error);

      this.setLoadingInitial(false);
    }
  };

  loadProduct = async (id: number) => {
    let product = this.getProduct(id);
    if (product) {
      this.selectedProduct = product;
      return product;
    } else {
      this.setLoadingInitial(true);
      try {
        product = await agent.Products.details(id);
        this.setProduct(product);
        this.selectedProduct = product;
        runInAction(() => {
          this.selectedProduct = product;
        });
        this.setLoadingInitial(false);
        return product;
      } catch (error) {
        console.log(error);
        this.loadingInitial = false;
      }
    }
  };

  private setProduct = (product: Products) => {
    this.productRegistry.set(product.id, product);
  };

  private getProduct = (id: number) => {
    return this.productRegistry.get(id);
  };
  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

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
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  EditProduct = async (product: Products) => {
    this.loading = true;
    try {
      await agent.Products.update(product);
      runInAction(() => {
        this.productRegistry.set(product.id, product);
        this.selectedProduct = product;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteProduct = async (id: number) => {
    this.loading = true;
    try {
      await agent.Products.delete(id);
      runInAction(() => {
        this.productRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
