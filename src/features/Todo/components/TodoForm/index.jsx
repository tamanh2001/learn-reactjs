import { yupResolver } from '@hookform/resolvers/yup';
import InputField from 'components/form-controls/InputField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";




TodoForm.propTypes = {
    onSubmit: PropTypes.func,
};

function TodoForm(props) {
    // định nghĩa schema từ yup
    const schema = yup.object().shape({
        title: yup.string()
        .required('Please enter title')
        .min(5,'title is too short'),
        // khi lỗi xảy ra phải show được lỗi lên inputField
        
      });
      const form = useForm({
        defaultValues: {
            title: '',
        },
        resolver: yupResolver(schema)
    })
    
    
    const handleSubmit = (values) => {
        const{ onSubmit}= props;
        if(onSubmit){
            onSubmit(values);
        }
        form.reset();

    };
    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            {/* form.handleSubmit là của tk form, handleSubmit sau là của mình, nó sẽ gọi hàm ở trên */}
            
            <InputField name="title" label="Todo" form={form}/>
            
            
        </form>
    );
}

export default TodoForm;