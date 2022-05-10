import { List,Link, ListItem, TextField, Typography, Button } from '@mui/material';
import React from 'react'
import {useForm, Controller} from 'react-hook-form';
import Form from '../components/Form'
import NextLink from 'next/link'
import Head from 'next/head';


export default function login() {
    const { handleSubmit, control, formState: {errors}} = useForm();
    const submitHandler = async(name, email, password, confirmPassword) =>{

    }
  return (
    <Form onSubmit={handleSubmit(submitHandler)}>
        <Head>
            <title>Register</title>
        </Head>
        <Typography component="h1" variant="h1">
            Register
        </Typography>
        <List>
        <ListItem>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="name"
                  label="Name"
                  inputProps={{ type: 'name' }}
                  error={Boolean(errors.name)}
                  helperText={
                    errors.name
                      ? errors.name.type === 'minLength'
                        ? 'Name length is more than 1'
                        : 'Name is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
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
                <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                rules={{
                    required: true,
                    minLength: 6,
                }}
                render={({ field }) => (
                    <TextField
                    variant="outlined"
                    fullWidth
                    id="confirmPassword"
                    label="Confirm Password"
                    inputProps={{ type: 'password' }}
                    error={Boolean(errors.confirmPassword)}
                    helperText={
                        errors.confirmPassword
                        ? errors.confirmPassword.type === 'minLength'
                            ? 'Confirm Password not macth'
                            : 'Confirm Password is required'
                        : ''
                    }
                    {...field}
                    ></TextField>
                )}
                ></Controller>
            </ListItem>
            <ListItem>
                <Button variant='contained' type="submit" fullWidth color='primary'>
                    Register
                </Button>
            </ListItem>
            <ListItem>
                Already have an account?{' '}
                {/* <NextLink href={`/register?redirect=${redirect || '/'}`} passHref> */}
                <NextLink href={'/login'}>
                    <Link>Register</Link>
                </NextLink>
          </ListItem>
        </List>
    </Form>
  )
}
