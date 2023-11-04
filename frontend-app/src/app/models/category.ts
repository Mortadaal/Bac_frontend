export interface Category{
    map(arg0: (cat: any) => { key: any; text: any; value: any }): any
    id: number
    categoryName: string
}