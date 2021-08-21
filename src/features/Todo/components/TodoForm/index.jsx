import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import InputField from '../../../../components/form-controls/InputField';



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
        defaultValues:{
            title:'',
        },
        resolver: yupResolver(schema),
        
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