import React from 'react';
import { useFormik } from 'formik';
import { loginSchema } from '../../utils/validation-schema';
import ErrorMsg from './error-msg';
import { useState } from 'react';
import { useLoginMutation } from '../../redux/features/api-slice';
import { signIn } from '../../redux/features/auth-slice';
import { useDispatch } from 'react-redux';

const LoginForm = () => {
    const [showPass, setShowPass] = useState(false);
    const [formError, setFormError] = useState(false);
    // use firebase
    const [login] = useLoginMutation();
    const dispatch = useDispatch();
    // use formik
    const {
        handleChange,
        handleSubmit,
        handleBlur,
        errors,
        values,
        touched,
        isSubmitting,
    } = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: loginSchema,
        onSubmit: async (values, { resetForm }) => {
            setFormError(false);
            const res = await login({
                username: values.email,
                password: values.password,
            });

            if ('error' in res) {
                setFormError(true);
                return;
            }

            console.log(res);
            dispatch(signIn(res.data.authToken));

            resetForm();
        },
    });

    // handleResetPass
    const handleResetPass = (email: string) => {
        // resetPassword(email);
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label htmlFor='current-log-email'>Username or email*</label>
                <input
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type='email'
                    name='email'
                    placeholder='Email or username'
                />
                {touched.email && <ErrorMsg error={errors.email} />}
            </div>

            <div className='form-group'>
                <label htmlFor='current-log-password'>Password*</label>
                <input
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type={showPass ? 'text' : 'password'}
                    name='password'
                    placeholder='Password'
                />
                <span onClick={() => setShowPass(!showPass)} className='password-show'>
                    <i className='icon-76'></i>
                </span>
            </div>
            {touched.password && <ErrorMsg error={errors.password} />}

            <div className='form-group chekbox-area'>
                <div className='edu-form-check'>
                    <input type='checkbox' id='remember-me' />
                    <label htmlFor='remember-me'>Remember Me</label>
                </div>
                <a
                    href='#'
                    onClick={() => handleResetPass(values.email)}
                    className='password-reset'
                >
                    Lost your password?
                </a>
            </div>
            {formError && <ErrorMsg error='Invalid email or password' />}

            <div className='form-group'>
                <button
                    type='submit'
                    className='edu-btn btn-medium'
                    disabled={isSubmitting}
                >
                    Sign in <i className='icon-4'></i>
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
