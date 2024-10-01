import { resetPassValues } from '@/types/Interfaces/auth/user.interafce';
import { Field, useFormikContext } from 'formik';
import { Mail } from 'lucide-react';
import React from 'react';

const Email = () => {
  const { errors } = useFormikContext<resetPassValues>();
  return (
    <div>
      <div>
        <p className='text-2xl'>Enter your email</p>
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
        {errors.email && <p className='text-xs text-red-500'>{errors.email}</p>}
      </div>
    </div>
  );
};

export default Email;
