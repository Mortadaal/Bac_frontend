
import { Button, Form, Item, Segment, Select } from 'semantic-ui-react'
import { Products } from '../../../app/models/products';
import { ChangeEvent, useState } from 'react';
import { Category } from '../../../app/models/category';



interface Props {
    products: Products | undefined;
    category: Category|Category[];
    closeForm: () => void;
}
const LagerStatus = [
    { key: true, text: 'På Lager', value: true },
    { key: false, text: 'Udsolgt', value: false },

];

export default function ProductsForm({ products: selectedProduct, closeForm, category }: Props) {

    const initialState = selectedProduct ?? {

        id: 0,
        productName: '',
        productPrice: 0.00,
        productDescription: '',
        imageUrl: '',
        onStock: true,
        categoryId: 0
    }
    const [products, setProducts] = useState(initialState);
    const [imageFile, setImageFile] = useState<File | null>(null);
    function handleSubmit() {
        console.log(products);
    }
    // function handleInputChange(event:ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>){
    // const {name,value}=event.target;
    // setProducts({...products,[name]:value})

    function handleInputChange(data: any) {
        const { name, value } = data;
        setProducts({ ...products, [name]: value })
    }
    function handleImageUpload(event:ChangeEvent<HTMLInputElement>) {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setImageFile(file);
        }
    }
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off' >
            <Form.Input
                    type="file"
                    label="Upload Image"
                    name="imageFile"
                    onChange={handleImageUpload}
                />
                {imageFile && (
                    <img className='item-image' src={URL.createObjectURL(imageFile)} alt="img" width="150" height="150" />
                )}
                <Form.Input
                    label='Billede Link'
                    name='imageUrl'
                    value={products.imageUrl}
                    onChange={(_: any, data: any) =>
                        handleInputChange(data)}
                />
                <Form.Input
                    placeholder='Produkt Navn'
                    name='productName'
                    value={products.productName}
                    onChange={
                        (_: any, data: any) =>
                            handleInputChange(data)
                    }
                />
                <Form.TextArea
                    placeholder='Produkt Beskrivelse'
                    name='productDescription'
                    value={products.productDescription}
                    onChange={(_: any, data: any) =>
                        handleInputChange(data)}
                />
                <Form.Input placeholder='Produkt Pris' name='productPrice' value={products.productPrice} onChange={(_: any, data: any) => handleInputChange(data)} />
                <Form.Field
                    placeholder='Lager Status'
                    control={Select}
                    options={LagerStatus}
                    
                    name='onStock'
                    value={products.onStock ? true : false}
                    onChange={(_: any, data: any) => handleInputChange(data)}
                />
                <Form.Field
                    control={Select}
                    options={(Array.isArray(category) ? category : [category]).map((cat) => ({
                        key: cat.id,
                        text: cat.categoryName,
                        value: cat.id,
                    }))}
                    placeholder='Select Category'
                    name='categoryId'
                    value={products.categoryId}
                    onChange={(_: any, data: any) => handleInputChange(data)}
                />
                <Button.Group floated='right'>
                    <Button onClick={closeForm} type='button' content='Anullere' />
                    <Button.Or />
                    <Button positive type='submit' content='Gem' />
                </Button.Group>
            </Form>
        </Segment>
    )
}



