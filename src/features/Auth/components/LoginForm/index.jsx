import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import {  LockOutlined } from '@material-ui/icons';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";


const useStyles= makeStyles((theme) => ({
    root:{
        position:'relative',
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
    progress:{
        position:'absolute',
        top:theme.spacing(1),
        left:0,
        right:0,
    }

}));

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
};

function LoginForm(props) {
    const classes= useStyles();
    // định nghĩa schema từ yup
    const schema = yup.object().shape({
       
        identifier: yup.string().required('Please enter your email.').email('Please enter a valid email address'),// có sẵn trong yup(github)
        password: yup.string().required('Please enter your password'),
        
      });
  
    
    const form = useForm({
        defaultValues:{
           
            identifier:'',
            password:'',
            
            
        },
        resolver: yupResolver(schema),
        
    });
    const handleSubmit = async (values) => {
        const {onSubmit}=props;
        if(onSubmit){
           await onSubmit(values); //khi chạy xong hàm này là submit thành công rồi reset
        }
        

    };
    const {isSubmitting}=form.formState;
    return (
        <div className={classes.root}>
            {isSubmitting && <LinearProgress className={classes.progress}/>}
            <Avatar className={classes.avatar}>
                <LockOutlined></LockOutlined>
            </Avatar>
            <Typography className={classes.title} component="h3" variant="h5">
                Sign In
            </Typography>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
               
                <InputField name="identifier" label="Email " form={form}></InputField>
                <PasswordField name="password" label="Password" form={form} ></PasswordField>
                

                <Button disabled={isSubmitting} type="submit" className={classes.submit} variant="contained" color="primary" fullWidth >    
                   Sign In
                </Button>
                
            </form>
        </div>
    );
}

export default LoginForm;