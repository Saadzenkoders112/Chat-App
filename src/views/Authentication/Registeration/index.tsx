import React, { FC, useState } from 'react';
import { Field, Form, FormikProvider, FormikValues, useFormik } from 'formik';
import { registerSchema } from '@/schema/registerSchema';
import { Eye, EyeOff, Mail, User } from 'lucide-react';
import axios from 'axios';
import {toast, Bounce, ToastContainer} from 'react-toastify'
import {
  initialValues,
  RegisterResponse,
} from '@/types/Interfaces/auth/user.interafce';
import { setCookieClientSideFn } from '@/utils/storage.util';
import { useRouter } from 'next/navigation';

interface IRegistrationViewProps {}

const RegistrationView: FC<IRegistrationViewProps> = () => {
  const [passEye, setPassEye] = useState<boolean>(false);
  const router = useRouter();
  const initialValues: initialValues = {
    firstName: '',
    lastName: '',
    password: '',
    email: '',
  };

  const handleSubmit = async (values: FormikValues) => {
    try {
      const res: RegisterResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
        values,
      );
      setCookieClientSideFn('accessToken', res.data.accessToken);
      setCookieClientSideFn('currentUser', JSON.stringify(res.data.newUser));
      toast.success("User created", {
        position: "top-center",
        transition: Bounce
      })
      router.push('/');
    } catch (error) {
      throw new Error('Error');
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: registerSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <ToastContainer />
      <div className='p-4 lg:w-1/3 md:w-3/5 w-4/5 h-max rounded-lg shadow-2xl bg-white'>
        <p className='text-2xl text-center'>Register</p>
        <FormikProvider value={formik}>
          <Form
            className='flex flex-col gap-2'
            onSubmit={formik.handleSubmit}
          >
            <div>
              <label
                className='text-xs'
                htmlFor='firstName'
              >
                Enter first name
              </label>
              <div className='flex items-center gap-2 p-1 border border-slate-300  rounded-lg bg-white text-black'>
                <Field
                  name='firstName'
                  type='text'
                  className='w-full p-1 text-sm focus:outline-none'
                />
                <User className='h-3 w-3 text-slate-500' />
              </div>
              {formik.errors.firstName && (
                <p className='text-xs text-red-500'>
                  {formik.errors.firstName}
                </p>
              )}
            </div>
            <div>
              <label
                className='text-xs'
                htmlFor='lastName'
              >
                Enter last name
              </label>
              <div className='flex items-center gap-2 p-1 border border-slate-300  rounded-lg bg-white text-black'>
                <Field
                  name='lastName'
                  type='text'
                  className='w-full p-1 text-sm focus:outline-none'
                />
                <User className='h-3 w-3 text-slate-500' />
              </div>
              {formik.errors.lastName && (
                <p className='text-xs text-red-500'>{formik.errors.lastName}</p>
              )}
            </div>
            <div>
              <label
                className='text-xs'
                htmlFor='email'
              >
                Enter email
              </label>
              <div className='flex items-center gap-2 p-1 border border-slate-300  rounded-lg bg-white text-black'>
                <Field
                  name='email'
                  type='email'
                  className='w-full p-1 text-sm focus:outline-none'
                />
                <Mail className='h-3 w-3 text-slate-500' />
              </div>
              {formik.errors.email && (
                <p className='text-xs text-red-500'>{formik.errors.email}</p>
              )}
            </div>
            <div>
              <label
                className='text-xs'
                htmlFor='password'
              >
                Enter password
              </label>
              <div className='flex items-center gap-2 p-1 border border-slate-300  rounded-lg bg-white text-black'>
                <Field
                  name='password'
                  type={passEye ? 'text' : 'password'}
                  className='w-full p-1 text-sm focus:outline-none'
                />
                {passEye ? (
                  <EyeOff
                    onClick={() => setPassEye(!passEye)}
                    className='h-3 w-3 cursor-pointer text-slate-500'
                  />
                ) : (
                  <Eye
                    onClick={() => setPassEye(!passEye)}
                    className='h-3 w-3 cursor-pointer text-slate-500'
                  />
                )}
              </div>
              {formik.errors.password && (
                <p className='text-xs text-red-500'>{formik.errors.password}</p>
              )}
            </div>
            <div>
              <button
                type='submit'
                className='p-1 w-full text-center bg-gray-700 text-white rounded-lg hover:bg-gray-600 duration-200'
              >
                Submit
              </button>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default RegistrationView;
