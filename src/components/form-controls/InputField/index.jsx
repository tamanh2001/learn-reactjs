import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';


InputField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled : PropTypes.bool,
};

function InputField(props) {
    const{form,name,label,disabled}=props;
    const{control}=form;
    console.log(control);
    return (
        
            <Controller 
            // khi nào control có lỗi thì show error
                name={name}
                control={form.control} 
                render={({field: { onChange, onBlur, value, name }, fieldState: { invalid, error }}) => (
                    <TextField
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      label={label}
                      error={invalid}
                      helperText={error?.message}
                      onChange={onChange}
                      onBlur={onBlur}
                      name={name}
                      value={value}
                      disabled={disabled}

                      
                      
                    />
                  )}
                ></Controller>
                // controller tự động paste vào textfield những sự kiện như là onChange, conField,onBlur,..
            
            // nhiệm vụ của inputfield là làm việc với ui controller để render lên cái tương ứng.
                

            
        
    );
}

export default InputField;
//- Với Controller, ko dùng as nữa, mà thay vào đó mình dùng render
//- Object errors ko nằm ở form nữa mà nằm trong formState