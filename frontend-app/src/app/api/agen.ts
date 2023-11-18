import axios, {AxiosResponse } from "axios";
import { Products } from "../models/products";
import { Category } from "../models/category";
import { User, UserFormValues } from "../models/users";
import { store } from "../stores/store";

const sleep=(delay:number)=>{
    return new Promise((reslove)=>{
        setTimeout(reslove,delay)
    })
}

axios.defaults.baseURL='http://localhost:5000/api/';



axios.interceptors.request.use(config => { 
    const token = store.commonStore.token;
    if (token) config.headers.Authorization = `Bearer ${token}` 
    return config;
})

axios.interceptors.response.use(async response=>{
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})
const responsBody=<T>(response:AxiosResponse<T>)=>response.data;




const request={
    get:<T>(url:string)=>axios.get<T>(url).then(responsBody),
    post:<T>(url:string, body:{})=>axios.post<T>(url,body).then(responsBody),
    put:<T>(url:string, body:{})=>axios.put<T>(url,body).then(responsBody),
    del:<T>(url:string)=>axios.delete<T>(url).then(responsBody)
};


const Products={
    list:()=>request.get<Products[]>('products'),
    details: (id:number)=>request.get<Products>(`/products/${id}`),
    create:(product:Products)=>request.post<void>('products/addProduct',product),
    update:(product:Products)=>request.put<void>(`/products/editProduct/${product.id}`,product),
    delete:(id:number)=>request.del<void>(`/products/${id}`)
};
const Categorys={
    list:()=>request.get<Category[]>('category'),
    create:(category:Category)=>axios.post<void>('category/addCategory',category),
    // delete:(categoryName:string)=>axios.delete<void>(`/category/${categoryName}`)
    delete:(id:number)=>axios.delete<void>(`/category/${id}`)
    
}
const Account ={
    current:()=>request.get<User>('/account'),
    login:(user:UserFormValues)=>request.post<User>('/account/login',user),
    register:(user:UserFormValues)=>request.post<User>('/account/register',user)
}


const agent = {
    Products,
    Categorys,
    Account,
};

export default agent;