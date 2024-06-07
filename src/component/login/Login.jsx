
import React, { useState,useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formData);
    if (Object.keys(errors).length === 0) {
      console.log(formData);
      setFormErrors({});
      try {
        const response = await axios.post('https://reqres.in/api/login', formData);
        console.log('response',response);
        if (response.data.token) {
          localStorage.setItem('authToken', response.data.token);
          setIsAuthenticated(true);
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    } else {
      setFormErrors(errors);
    }  };

  const validate = (data) => {
    const errors = {};

    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Invalid email address';
    }

    if (!data.password) {
      errors.password = 'Password is required';
    } else if (data.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    return errors;
  };
  
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setIsAuthenticated(true);
      navigate('/dashboard');
    }
  }, []);
  return (
    <Box sx={{ display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',maxWidth: 400,margin:'auto',marginTop:'5%',borderRadius:'6px',boxShadow:'5px 5px 10px #ccc',padding:'1%'  }}>
    <Typography sx={{color:'#04AA6D'}} variant="h4" component="h1" gutterBottom>
      Login
    </Typography>
    {isAuthenticated ? (
        <Typography variant="body1">You are logged in.</Typography>
      ) : (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!formErrors.email}
            helperText={formErrors.email}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={!!formErrors.password}
            helperText={formErrors.password}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} container justifyContent="flex-end">
          <Button type="submit" variant="contained" sx={{background:'#04AA6D'}}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  )} 
  </Box>
  )
}

export default Login