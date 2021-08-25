import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, makeStyles, Typography } from '@material-ui/core';
import {  LockOutlined } from '@material-ui/icons';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";


const useStyles= makeStyles((theme) => ({
    root:{
        paddingTop: theme.spacing(4),
    } ,
    avatar:{
        margin:'0 auto',
        backgroundColor: theme.palette.secondary.main,
    },
    title:{
        margin: theme.spacing(2,0,3,0),
        textAlign:'center',
    },
    submit:{
        margin: theme.spacing(3,0,2,0),
    },
    

}));

RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
};

function RegisterForm(props) {
    const classes= useStyles();
    // định nghĩa schema từ yup
    const schema = yup.object().shape({
        fullName: yup.string().required('Please enter your full name')//không có string được truyền vào thì hiện required
        .test('Should has at least two words','Please enter at least two words',(value)=>{
            console.log('Value',value);
             return value.split(' ').length >=2; //tách value ra bởi dấu cách rồi tạo thành mảng, .length để đếm độ dài của mảng.
        }),
        email: yup.string().required('Please enter your email.').email('Please enter a valid email address'),// có sẵn trong yup(github)
        passWord: yup.string().required('Please enter your password').min(6,'Please enter at least 6 character'),
        retypePassword: yup
        .string()
        .required('Please retype your password')
        .oneOf([yup.ref('password')],'Password does not match'),//so sánh với tk passwword, nếu không match thì hiện thông báo lên
      });
  
    
    const form = useForm({
        defaultValues:{
            fullName:'',
            email:'',
            passWord:'',
            retypePassword:'',
            
        },
        resolver: yupResolver(schema),
        
    });
    const handleSubmit = (values) => {
        const {onSubmit}=props;
        if(onSubmit){
            onSubmit(values);
        }
        form.reset();

    };
    return (
        <div className={classes.root}>
            <Avatar className={classes.avatar}>
                <LockOutlined></LockOutlined>
            </Avatar>
            <Typography className={classes.title} component="h3" variant="h5">
                Create An Account
            </Typography>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name="fullName" label="Full Name " form={form}></InputField>
                <InputField name="email" label="Email " form={form}></InputField>
                <PasswordField name="passWord" label="Password" form={form} ></PasswordField>
                <PasswordField name="retypePassword" label="Retype Password" form={form}></PasswordField>

                <Button type="submit" className={classes.submit} variant="contained" color="primary" fullWidth >    
                    Create an account
                </Button>
                
            </form>
        </div>
    );
}

export default RegisterForm;