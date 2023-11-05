
import { Button, Form,  Segment, Select } from 'semantic-ui-react'
import { Products } from '../../../app/models/products';
import { ChangeEvent, useState } from 'react';
import { Category } from '../../../app/models/category';



interface Props {
    products: Products | undefined;
    category: Category[] ;
    closeForm: () => void;
    createOrEdit:(product:Products)=>void;
    submitting:boolean;
  
}
const LagerStatus = [
    { key: true, text: 'På Lager', value: true },
    { key: false, text: 'Udsolgt', value: false },

];

export default function ProductsForm({ products: selectedProduct, closeForm, category,createOrEdit,submitting}: Props) {

    const initialState = selectedProduct ?? {

        id: 0,
        productName: '',
        productPrice: 0.00,
        productDescription: '',
        imageUrl: '',
        onStock:false,
        categoryId: 0
    }
    const [products, setProducts] = useState(initialState);
    const [imageFile, setImageFile] = useState<File | null>(null);
    function handleSubmit() {
        console.log(products);
        createOrEdit(products);
    }
    // function handleInputChange(event:ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>){
    // const {name,value}=event.target;
    // setProducts({...products,[name]:value})

    function handleInputChange(data: any) {
        const { name, value } = data;
        setProducts({ ...products, [name]: value })
    }
    function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);

        setImageFile(file); // Set the image file in case you need it for other operations
        setProducts({ ...products, imageUrl }); 
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
                    label='Produkt Navn'
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
                    label='Produkt Beskrivelse'
                    value={products.productDescription}
                    onChange={(_: any, data: any) =>
                        handleInputChange(data)}
                />
                <Form.Input
                    placeholder='Produkt Pris'
                    label='Produkt Pris'
                    name='productPrice'
                    value={products.productPrice}
                    onChange={(_: any, data: any) =>
                        handleInputChange(data)}
                />
                <Form.Field
                    placeholder='Lager Status'
                    control={Select}
                    options={LagerStatus}
                    label='Lager Status'
                    name='onStock'
                    value={products.onStock ? true : false}
                    onChange={(_: any, data: any) => handleInputChange(data)}
                />
                <Form.Field
                    control={Select}
                    label='Valg af Kategori'
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
                    <Button loading={submitting} positive type='submit' content='Gem' />
                </Button.Group>
            </Form>
        </Segment>
    )
}



