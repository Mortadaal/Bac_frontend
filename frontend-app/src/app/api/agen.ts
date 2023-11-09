import axios, {AxiosResponse } from "axios";
import { Products } from "../models/products";
import { Category } from "../models/category";

const sleep=(delay:number)=>{
    return new Promise((reslove)=>{
        setTimeout(reslove,delay)
    })
}

axios.defaults.baseURL='http://localhost:5000/api/';

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
}


const Products={
    list:()=>request.get<Products[]>('products'),
    create:(product:Products)=>axios.post<void>('/products/addProduct',product),
    update:(product:Products)=>axios.put<void>(`/products/editProduct/${product.id}`,product),
    delete:(id:number)=>axios.delete<void>(`/products/${id}`)
}
const Categorys={
    list:()=>request.get<Category[]>('category'),
    create:(category:Category)=>axios.post<void>('/category/addCategory',category),
    delete:(categoryName:string)=>axios.delete<void>(`/category/${categoryName}`)
    
}


const agent = {
    Products,
    Categorys
}

export default agent;