const NewPassword = () => {
  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
        Reset your and get access to your{' '}
        <span className='text-slate-700'>account</span>
      </h1>

      <form className='mt-10 mb-6 bg-white shadow rounded-lg px-8 py-6'>
        <div>
          <label
            className='text-gray-600 block text-md font-bold'
            htmlFor='password'
          >
            New password
          </label>
          <input
            className='w-full mt-2 p-3 border rounded-xl bg-gray-50'
            type='password'
            placeholder='Write your new password'
            id='password'
          />
        </div>

        <input
          type='submit'
          value='Save New Password'
          className='bg-sky-700 w-full mt-3 py-2 text-white font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
        />
      </form>
    </>
  );
};

export default NewPassword;
