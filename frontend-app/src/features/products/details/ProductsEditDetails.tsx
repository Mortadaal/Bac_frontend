
import { Button, Form, Segment, Select } from 'semantic-ui-react'
import { Products } from '../../../app/models/products';



interface Props {
    products: Products;
    cancleSelectProduct: () => void;
    // openForm: (id: number) => void;
}
const LagerStatus = [
    { key: 1, text: 'På Lager', value:1},
    { key: 0, text: 'Udsolgt',value:0 },
   
];

export default function ProductsEditDetails({products,cancleSelectProduct}:Props) {
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Produkt Navn' value={products.productName} />
                <Form.TextArea placeholder='Produkt Beskrivelse'  value={products.productDescription}/>
                <Form.Input placeholder='Produkt Pris'  value={products.productPrice}/>
                <Form.Field 
                    // value={products.onStock} 
                    control={Select} 
                    options={LagerStatus}
                    placeholder='Lager Status' 
                  
                />
                <Button.Group floated='right'>
              <Button onClick={cancleSelectProduct} type='button' content='Anullere' />
              <Button.Or/>
              <Button positive type='submit' content='Gem' />
            </Button.Group>
            </Form>
        </Segment>
    )
}



