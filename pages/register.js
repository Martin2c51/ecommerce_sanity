import { List,Link, ListItem, TextField, Typography, Button } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import {useForm, Controller} from 'react-hook-form';
import Form from '../components/Form'
import NextLink from 'next/link'
import Head from 'next/head';
import jsCookie from 'js-cookie';
import { useRouter } from 'next/router';
import { useStateContext } from '../context/StateContext';
import { toast } from 'react-hot-toast';
import { getError } from '../lib/error';
import axios from 'axios';


import fetch from 'node-fetch';

export default function register() {
  const { state, dispatch } = useStateContext()
  const { userInfo } = state;
  const router = useRouter();
  const { redirect } = router.query;

  // useEffect(() => {
  //   if (userInfo) {
  //     router.push(redirect || '/');
  //   }
  // }, [router, userInfo, redirect]);
    const {handleSubmit, control, formState: {errors}} = useForm();
    
    const submitHandler = async ({ name, email, password, confirmPassword }) => {
      if (password !== confirmPassword) {
        toast.error("Passwords don't match", { variant: 'error' });
        return;
      }
      try {
        alert(JSON.stringify("data"));
        const { data } = await axios.post('/api/register', {
          name,
          email,
          password,
        });
        alert(JSON.stringify("data 2"));
        dispatch({ type: 'USER_LOGIN', payload: data });
        jsCookie.set('userInfo', JSON.stringify(data));
        router.push(redirect || '/');
        
      } catch (err) {
        console.log(getError(err))
        // toast.error(getError(err), { variant: 'error' });
        alert(JSON.stringify(getError(err)));
      }

    };
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
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  inputProps={{ type: 'email' }}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === 'pattern'
                        ? 'Email is not valid'
                        : 'Email is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="password"
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
                  id="password"
                  label="Password"
                  inputProps={{ type: 'password' }}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === 'minLength'
                        ? 'Password length is more than 5'
                        : 'Password is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
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
                        ? 'Confirm Password length is more than 5'
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
                    <Link>Login</Link>
                </NextLink>
          </ListItem>
        </List>
    </Form>
  )
}
