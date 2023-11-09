import { makeAutoObservable, runInAction } from "mobx";
import { Category } from "../models/category";
import agent from "../api/agen";

export default class CategoryStore{
    categoryRegistry = new Map<number|string, Category>();
    selectedCategory: Category | undefined = undefined;
    editModeCategory = false;
    editModeDeleteCategory=false;
    loadingInitialCategory = true;
    categoryLoading = false;

    constructor() {
        makeAutoObservable(this)
    }

    get categoryById() {
        return Array.from(this.categoryRegistry.values())
        .sort((a, b) => a.id - b.id);
    };
    loadCategorys=async()=>{
        try {
            const categorys = await agent.Categorys.list();
            runInAction(() => {
                categorys.forEach((category) => {
                    this.categoryRegistry.set(category.id, category);
                });
                this.loadingInitialCategory = false;
            })

        } catch (error) {
            console.log(error);
        }
    }
    createCategory=async(category:Category)=>{
        this.categoryLoading=true;
        category.id=category.id;
        try {
            await agent.Categorys.create(category);
            runInAction(()=>{
                this.categoryRegistry.set(category.id, category);
                this.editModeCategory=false;
                this.categoryLoading=false;
            })
        } catch (error) {
            console.log(error);
            runInAction(()=>{
                this.categoryLoading=false;
            })
        }
    }
    selectCategory=(id:number)=>{
        this.selectedCategory=this.categoryRegistry.get(id);
    }

    cancelSelectedCategory=()=>{
        this.selectedCategory=undefined;
    }
    openCategoryForm=()=>{
        
        this.editModeCategory=true;
    }
    openDeleteCategoryForm=()=>{
        
        this.editModeDeleteCategory=true;
    }
    
    closeCategoryForm=()=>{
        this.editModeCategory=false;
    }
    
    closeDeleteCategoryForm=()=>{
        this.editModeDeleteCategory=false;
    }

    deleteCategory = async (categoryName: string) => {
        this.categoryLoading = true;
        try {
          await agent.Categorys.delete(categoryName); 
          runInAction(() => {
            this.categoryRegistry.delete(categoryName); 
            this.editModeDeleteCategory = false;
            this.categoryLoading = false;
          });
        } catch (error) {
          console.log(error);
          runInAction(() => {
            this.categoryLoading = false;
          });
        }
      }
}