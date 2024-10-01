'use client';

import React, { useState } from 'react';
import { FormikProvider, FormikValues, useFormik, Form, useFormikContext } from 'formik';
import { resetPassEmailSchema, resetPassSchema } from '@/schema/registerSchema';
import { resetPassValues } from '@/types/Interfaces/auth/user.interafce';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import Email from '@/components/resetPasswordForm/email';
import ResetPass from '@/components/resetPasswordForm/resetPass';
const ResetPassword = () => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const searchParams = useSearchParams();
  const resetToken = searchParams.get('token') || '';
  const router = useRouter();
  const initialValues: resetPassValues = {
    email: '',
    newPassword: '',
    resetToken: resetToken,
  };
  const handleSubmit = async (values: FormikValues) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/reset-password`,
        values,
      );
      toast.success(res.data.message, {
        transition: Bounce,
      });
      formik.resetForm();
      router.push('/auth/login');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSchema = () => {
    if (resetToken) {
      return resetPassSchema;
    } else {
      return resetPassEmailSchema;
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: handleSchema,
    onSubmit: handleSubmit,
  });

  const handleSendEmail = async () => {
    setLoading(true)
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/forgot-password`,
        { email: formik.values.email },
      );
      if (res) {
        setLoading(false)
      }
      formik.resetForm()
      toast.success(res.data.message);
      
    } catch (error) {
      console.log(error);
      toast.error(error as any);
    }
  };
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='bg-white rounded-lg shadow-2xl p-4 w-1/4'>
        <FormikProvider value={formik}>
          <Form
            className='flex flex-col gap-4'
            onSubmit={formik.handleSubmit}
          >
            {resetToken ? <ResetPass /> : <Email />}
            {resetToken ? (
              <button
                type='submit'
                disabled={formik.isSubmitting}
                className={`p-1 w-full text-center bg-gray-700 text-white rounded-lg ${formik.isSubmitting ? '' : 'hover:bg-gray-600'} duration-200`}
              >
                {formik.isSubmitting ? (
                  <ClipLoader
                    size={15}
                    color='white'
                  />
                ) : (
                  'Submit'
                )}
              </button>
            ) : (
              <button
                type='button'
                onClick={handleSendEmail}
                disabled={formik.isSubmitting}
                className={`p-1 w-full text-center bg-gray-700 text-white rounded-lg ${formik.isSubmitting ? '' : 'hover:bg-gray-600'} duration-200`}
              >
                {isLoading ? (
                  <ClipLoader
                    size={15}
                    color='white'
                  />
                ) : (
                  'Submit'
                )}
              </button>
            )}
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default ResetPassword;
