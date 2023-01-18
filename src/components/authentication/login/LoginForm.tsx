import * as Yup from 'yup';
import axios from 'axios';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  useFormik,
  Form,
  FormikProvider,
  FormikErrors,
  FormikState,
} from 'formik';
import { string } from 'yup/lib/locale';
// Iconify
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// MaterialUI
import {
  Stack,
  Alert,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
// Types
// Route
import { PATH_DASHBOARD } from 'routes/paths';
// API
import { PATH_API } from '../../../api';
//===========================================================================// Typings for error: https://github.com/axios/axios/issues/3612

interface InitialValues {
  email: string;
  password: string;
  remember?: boolean;
  afterSubmit?: string;
}

interface loginResponse {
  accessToken: string;
  refreshToken: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email must be a valid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function LoginForm() {
  const navigate = useNavigate();

  const inputFieldStyle = {
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#000000',
    },
    '&:hover .MuiInputBase-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(135, 207, 58, 1)',
    },
    '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(135, 207, 58, 0.8)',
    },
  };

  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik<InitialValues>({
    initialValues: {
      email: '',
      password: '',
      //remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      let { email, password } = values;
      try {
        let response = await axios.post(PATH_API.login.root, {
          email,
          password,
        });

        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${response.data.accessToken}`;
        resetForm();
        navigate(PATH_DASHBOARD.events.root);
      } catch (error) {
        const errors = axios.isAxiosError(error)
          ? (error as AxiosError)
          : (error as Error);

        if (errors instanceof AxiosError) {
          setSubmitting(false);
          if (errors.response) {
            setErrors({ afterSubmit: errors.response.data.message });
          } else {
            setErrors({ afterSubmit: errors.code });
          }
        } else if (errors instanceof Error) {
          setSubmitting(false);
          setErrors({ afterSubmit: errors.message });
        }
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit}</Alert>
          )}

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            sx={inputFieldStyle}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
            sx={inputFieldStyle}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{
              color: '#000000',
              margin: '0',
              padding: '.5rem 1.2rem',
              background:
                'linear-gradient(130deg, rgba(90,187,137,0.8) 0%, rgba(255,255,255,1) 80%)',
              '&:hover': {
                background:
                  'linear-gradient(130deg, rgba(90,187,137,1) 0%, rgba(255,255,255,1) 100%)',
              },
            }}
          >
            Login
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
