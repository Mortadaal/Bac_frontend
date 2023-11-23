import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Button, Form, Segment, Select } from "semantic-ui-react";
import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default observer(function DeleteCategoryForm() {
    const { categoryStore } = useStore();
    const { deleteCategory, categoryLoading, selectedCategory } = categoryStore;
    const navigate = useNavigate();
    const initialState = selectedCategory || {

        id: 0,
        categoryName: '',

    }
    const [categorys, setCategorys] = useState(initialState);



    function handleInputChange(data: any) {
        const { name, value } = data;
        setCategorys({ ...categorys, [name]: value });
    }
    function handleSubmit() {
        deleteCategory(categorys.id).then(()=>navigate('/menu'));
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off' >
                <Form.Field
                    control={Select}
                    label='Valg af Kategori'
                    options={categoryStore.categoryById.map((cat) => ({
                        key: cat.id,
                        text: cat.categoryName,
                        value: cat.id,
                    }))}
                    placeholder='Vælg Kategori'
                    name='id'
                    value={categorys.id}
                    onChange={(_: any, data: any) => handleInputChange(data)}
                />
                <Button.Group floated='right'>
                    <Button as={Link} to={'/menu'} type='button' content='Anullere' />
                    <Button.Or />
                    <Button loading={categoryLoading} negative type='submit' content='Delete' />
                </Button.Group>

            </Form>
        </Segment>
    )
})