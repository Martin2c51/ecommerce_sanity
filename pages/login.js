import { List,Link, ListItem, TextField, Typography, Button } from '@mui/material';
import React from 'react'
import {useForm, Controller} from 'react-hook-form';
import Form from '../components/Form'
import NextLink from 'next/link'
import Head from 'next/head';


export default function login() {
    const { handleSubmit, control, formState: {errors}} = useForm();
    const submitHandler = async(email, password) =>{

    }
  return (
    <Form onSubmit={handleSubmit(submitHandler)}>
        <Head>
            <title>Login</title>
        </Head>
        <Typography component="h1" variant="h1">
            Login
        </Typography>
        <List>
            <ListItem>
                <Controller 
                name="email" 
                control={control} 
                defaultValue="" 
                rules={{
                    required: true, 
                    pattern:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    }}
                render={({field}) =>(
                   <TextField 
                   variant='outlined' 
                   fullWidth 
                   id="email" 
                   label="Email" 
                   inputProps={{type:'email'}} 
                   error={Boolean(errors.email)}
                   helperText={errors.email
                    ? errors.email.type==='´pattern'
                    ?'Email is not valid'
                    :'Email is requierd'
                    :''}{...field}>
                    </TextField> 
                )}>
            </Controller>
        </ListItem>
        <ListItem>
            <Controller 
                name="password" 
                control={control} 
                defaultValue="" 
                rules={{
                    required: true, 
                    minLength: 6
                    }}
                render={({field}) =>(
                   <TextField 
                   variant='outlined' 
                   fullWidth 
                   id="password" 
                   label="Password" 
                   inputProps={{type:'password'}} 
                   error={Boolean(errors.password)}
                   helperText={errors.password
                    ? errors.password.type==='minLength'
                    ?'Password is not valid'
                    :'Password is requierd'
                    :''}{...field}>
                    </TextField> 
                )}>
                </Controller>
            </ListItem>
            <ListItem>
                <Button variant='contained' type="submit" fullWidth color='primary'>
                    Login
                </Button>
            </ListItem>
            <ListItem>
                Do not have an account?{' '}
                {/* <NextLink href={`/register?redirect=${redirect || '/'}`} passHref> */}
                <NextLink href={'/register'}>
                    <Link>Register</Link>
                </NextLink>
          </ListItem>
        </List>
    </Form>
  )
}
