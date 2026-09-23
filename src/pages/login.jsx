import { useState } from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../config/api'

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('')
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const payload = {
      email: formData.get('email'),
      password: formData.get('password'),
    }

    if (isSignUp) payload.name = formData.get('name')

    try {
      const endpoint = isSignUp ? 'register' : 'login'
      const response = await fetch(`${API_URL}/api/user/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json()

      if (!result.success) throw new Error(result.message || 'Unable to continue')

      localStorage.setItem('token', result.token)
      setStatus(isSignUp ? 'Account created successfully.' : 'Signed in successfully.')
    } catch (error) {
      setStatus(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className='flex min-h-[65vh] items-center justify-center py-12 sm:py-20'>
      <section className='w-full max-w-md'>
        <div className='mb-8 text-center'>
          <p className='mb-3 text-xs font-medium tracking-[0.25em] text-gray-500'>WELCOME BACK</p>
          <h1 className='prata-regular text-3xl text-gray-900 sm:text-4xl'>
            {isSignUp ? 'Create your account' : 'Sign in to continue'}
          </h1>
          <p className='mt-3 text-sm text-gray-500'>
            {isSignUp ? 'Join us for a more personal shopping experience.' : 'Access your orders and saved details.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className='border border-gray-200 bg-white p-6 sm:p-8'>
          {isSignUp && (
            <label className='mb-5 block text-sm text-gray-700'>
              Full name
              <input required name='name' type='text' className='mt-2 w-full border border-gray-300 px-4 py-3 outline-none transition focus:border-black' />
            </label>
          )}
          <label className='mb-5 block text-sm text-gray-700'>
            Email address
              <input required name='email' type='email' className='mt-2 w-full border border-gray-300 px-4 py-3 outline-none transition focus:border-black' />
          </label>
          <label className='block text-sm text-gray-700'>
            Password
            <input required name='password' type='password' minLength='8' className='mt-2 w-full border border-gray-300 px-4 py-3 outline-none transition focus:border-black' />
          </label>

          {!isSignUp && (
            <div className='mt-3 text-right'>
              <button type='button' className='text-xs text-gray-500 transition hover:text-black'>Forgot password?</button>
            </div>
          )}
          {status && <p className='mt-5 text-sm text-gray-600' role='status'>{status}</p>}
          <button disabled={isSubmitting} type='submit' className='mt-7 w-full bg-black py-3 text-sm font-medium tracking-wide text-white transition hover:bg-gray-800 disabled:opacity-60'>
            {isSubmitting ? 'PLEASE WAIT...' : isSignUp ? 'CREATE ACCOUNT' : 'SIGN IN'}
          </button>
        </form>

        <p className='mt-6 text-center text-sm text-gray-500'>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button type='button' onClick={() => setIsSignUp(!isSignUp)} className='font-medium text-black underline underline-offset-4'>
            {isSignUp ? 'Sign in' : 'Create one'}
          </button>
        </p>
        <p className='mt-3 text-center text-xs text-gray-400'>By continuing, you agree to our <Link to='/About' className='underline'>terms</Link>.</p>
      </section>
    </main>
  )
}

export default Login