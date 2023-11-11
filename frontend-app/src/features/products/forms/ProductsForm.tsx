
import { Button, Form,  Segment, Select } from 'semantic-ui-react'
import { ChangeEvent, useEffect, useState } from 'react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Products } from '../../../app/models/products';
import LoadingComponent from '../../../app/layout/LoadingComponent';

const LagerStatus = [
    { key: true, text: 'På Lager', value: true },
    { key: false, text: 'Udsolgt', value: false },

];

export default observer( function ProductsForm() {
const {productStore,categoryStore}=useStore();
const {createProduct,EditProduct,loading,loadProduct,loadingInitial}=productStore;

const {id}=useParams();
const idint=parseInt(id || '0', 10);
const navigate = useNavigate();



const[product,setProduct]=useState<Products>({
    id: 0,
    productName: '',
    productPrice: 0.00,
    productDescription: '',
    imageUrl: '',
    onStock:false,
    categoryId: 0
})
 
useEffect(()=>{
    if(id) loadProduct(idint).then(products=>setProduct(products!))
},[id,loadProduct])
 
    const [imageFile, setImageFile] = useState<File | null>(null);

   
    function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImageFile(file);
            setProduct({ ...product, imageUrl });
        }
    }

    
    function handleSubmit() {
        if (!product.id) {
            if (imageFile) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result?.toString();
                    if (base64String) {
                        const updatedProduct = { ...product, imageUrl: base64String };
                        createProduct(updatedProduct).then(() => navigate('/menu'));
                    }
                };
                reader.readAsDataURL(imageFile);
            } else {
                createProduct(product).then(() => navigate('/menu'));
            }
        } else {
            EditProduct(product).then(() => navigate('/menu'));
        }
    }

    function handleInputChange(data: any) {
        const { name, value } = data;
        setProduct({ ...product, [name]: value })
    }

    if(loadingInitial) return <LoadingComponent content='Indlæser Produkt'/>
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
                    value={product.imageUrl}
                    onChange={(_: any, data: any) =>
                        handleInputChange(data)}
                />
                <Form.Input
                    placeholder='Produkt Navn'
                    label='Produkt Navn'
                    name='productName'
                    value={product.productName}
                    onChange={
                        (_: any, data: any) =>
                            handleInputChange(data)
                    }
                />
                <Form.TextArea
                    placeholder='Produkt Beskrivelse'
                    name='productDescription'
                    label='Produkt Beskrivelse'
                    value={product.productDescription}
                    onChange={(_: any, data: any) =>
                        handleInputChange(data)}
                />
                <Form.Input
                    placeholder='Produkt Pris'
                    label='Produkt Pris'
                    name='productPrice'
                    value={product.productPrice}
                    onChange={(_: any, data: any) =>
                        handleInputChange(data)}
                />
                <Form.Field
                    placeholder='Lager Status'
                    control={Select}
                    options={LagerStatus}
                    label='Lager Status'
                    name='onStock'
                    value={product.onStock ? true : false}
                    onChange={(_: any, data: any) => handleInputChange(data)}
                />
                <Form.Field
                    control={Select}
                    label='Valg af Kategori'
                    options={(Array.isArray(categoryStore.categoryById) ? categoryStore.categoryById : [categoryStore.categoryById]).map((cat) => ({
                        key: cat.id,
                        text: cat.categoryName,
                        value: cat.id,
                    }))}
                    placeholder='Select Category'
                    name='categoryId'
                    value={product.categoryId}
                    onChange={(_: any, data: any) => handleInputChange(data)}
                />
               
                <Button.Group floated='right'>
                    <Button as={Link} to={'/menu'} type='button' content='Anullere' />
                    <Button.Or />
                    <Button loading={loading} positive type='submit' content='Gem' />
                </Button.Group>
            </Form>
        </Segment>
    )
})



