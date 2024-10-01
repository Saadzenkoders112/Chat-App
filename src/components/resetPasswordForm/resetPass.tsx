import { resetPassValues } from '@/types/Interfaces/auth/user.interafce';
import { Field, useFormikContext } from 'formik';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';

const ResetPass = () => {
  const [passEye, setPassEye] = useState<boolean>(false);
  const { errors } = useFormikContext<resetPassValues>();
  return (
    <div>
      <div>
        <p className='text-2xl'>Reset your password</p>
      </div>
      <div>
        <label
          className='text-xs'
          htmlFor='password'
        >
          Enter your new password
        </label>
        <div className='flex items-center gap-2 p-1 border border-slate-300  rounded-lg bg-white text-black'>
          <Field
            name='newPassword'
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
        {errors.newPassword && typeof errors.newPassword === 'string' && (
          <p className='text-xs text-red-500'>{errors.newPassword}</p>
        )}
      </div>
    </div>
  );
};

export default ResetPass;
