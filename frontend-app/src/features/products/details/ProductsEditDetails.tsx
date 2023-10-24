
import { Button, Form, Segment, Select } from 'semantic-ui-react'
//import { Products } from '../../../app/models/products';


// interface Props {
//     products: Products;
//     cancleSelectActivity: () => void;
//     openForm: (id: string) => void;
// }
const LagerStatus = [
    { key: 'true', text: 'På Lager', value:'true'},
    { key: 'false', text: 'Udsolgt',value:'false' },
    // Add more options as needed
];

export default function ProductsEditDetails() {
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Produkt Navn' />
                <Form.TextArea placeholder='Produkt Beskrivelse' />
                <Form.Input placeholder='Produkt Pris' />
                <Form.Field
                    control={Select}
                    options={LagerStatus}
                    placeholder='Lager Status' // Placeholder text for the dropdown
                />
                <Button.Group floated='right'>
              <Button type='button' content='Anullere' />
              <Button.Or/>
              <Button positive type='submit' content='Gem' />
            </Button.Group>
            </Form>
        </Segment>
    )
}



