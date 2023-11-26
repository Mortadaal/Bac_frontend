import { makeAutoObservable, runInAction } from "mobx";
import { Category } from "../models/category";
import agent from "../api/agent";

export default class CategoryStore {
  categoryRegistry = new Map<number | string, Category>();
  selectedCategory: Category | undefined = undefined;
  editModeCategory = false;
  editModeDeleteCategory = false;
  loadingInitial = true;
  categoryLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get categoryById() {
    if (this.categoryRegistry.size < 1) this.loadCategorys();
    return Array.from(this.categoryRegistry.values()).sort(
      (a, b) => a.id - b.id
    );
  }

  loadCategorys = async () => {
    try {
      const categorys = await agent.Categorys.list();
      console.log(categorys);
      runInAction(() => {
        categorys.forEach((category) => {
          this.categoryRegistry.set(category.id, category);
        });
        this.setLoadingInitial(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  createCategory = async (category: Category) => {
    this.categoryLoading = true;
    category.id = category.id;
    try {
      await agent.Categorys.create(category);
      runInAction(() => {
        this.categoryRegistry.set(category.id, category);
        this.categoryLoading = false;
        console.log(category);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.categoryLoading = false;
      });
    }
  };
  selectCategory = (id: number) => {
    this.selectedCategory = this.categoryRegistry.get(id);
  };

  cancelSelectedCategory = () => {
    this.selectedCategory = undefined;
  };
  openCategoryForm = () => {
    this.editModeCategory = true;
  };
  openDeleteCategoryForm = () => {
    this.editModeDeleteCategory = true;
  };
  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  closeCategoryForm = () => {
    this.editModeCategory = false;
  };

  closeDeleteCategoryForm = () => {
    this.editModeDeleteCategory = false;
  };

  deleteCategory = async (id: number) => {
    this.categoryLoading = true;
    try {
      await agent.Categorys.delete(id);
      runInAction(() => {
        this.categoryRegistry.delete(id);
        this.editModeDeleteCategory = false;
        this.categoryLoading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.categoryLoading = false;
      });
    }
  };
}
