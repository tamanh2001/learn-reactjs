import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../../components/form-controls/InputField';
import { useForm } from 'react-hook-form';



TodoForm.propTypes = {
    onSubmit: PropTypes.func,
};

function TodoForm(props) {
    const form = useForm({
        defaultValues:{
            title:'',
        },
    });
    const handleSubmit = (values) => {
        console.log('TodoForm:',values);

    };
    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            {/* form.handleSubmit là của tk form, handleSubmit sau là của mình, nó sẽ gọi hàm ở trên */}
            
            <InputField name="title" label="Todo" form={form}/>
            
        </form>
    );
}

export default TodoForm;