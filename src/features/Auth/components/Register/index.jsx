
import { unwrapResult } from '@reduxjs/toolkit';
import { register } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch } from 'react-redux';
import RegisterForm from '../RegisterForm';
import PropTypes from 'prop-types'

Register.propTypes = {
    closeDialog:PropTypes.func,
   
    
};

function Register(props) {
    const{ enqueueSnackbar }= useSnackbar()
    const dispatch =useDispatch();
    const handleSubmit =async(values)=>{
       
            try {   //auto set username= email
                    values.username = values.email;

                    const action = register(values);
                    const resultAction = await dispatch(action);
                    const user = unwrapResult(resultAction);
                    //close dialog
                    const{closeDialog}=props;
                    if(closeDialog){
                        closeDialog();
                    }
                    console.log('New user',user);
                    enqueueSnackbar('Register successfully',{variant:'success'})
            } catch (error) {
                console.log('Faile to register:',error);
                enqueueSnackbar('Register error',{variant:'error'})
                
            }
    }
    return (
        <div>
            <RegisterForm onSubmit={handleSubmit}/>
        </div>
    );
}

export default Register;