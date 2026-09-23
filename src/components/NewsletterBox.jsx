import { useState } from 'react'

const NewsletterBox = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!email.trim()) {
      setStatus('error')
      return
    }

    setStatus('success')
    setEmail('')
  }

  return (
    <section className='my-20 border-y border-gray-200 px-4 py-14 text-center sm:px-8'>
      <h2 className='prata-regular text-2xl text-gray-800 sm:text-3xl'>Stay in the loop</h2>
      <p className='mx-auto mt-3 max-w-lg text-sm text-gray-500'>
        Subscribe for new arrivals, exclusive offers, and style updates.
      </p>

      <form onSubmit={handleSubmit} className='mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row'>
        <label htmlFor='newsletter-email' className='sr-only'>
          Email address
        </label>
        <input
          id='newsletter-email'
          type='email'
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            setStatus('idle')
          }}
          placeholder='Enter your email address'
          required
          className='min-w-0 flex-1 border border-gray-300 px-4 py-3 text-sm text-gray-700 outline-none focus:border-gray-700'
        />
        <button
          type='submit'
          className='bg-black px-7 py-3 text-sm font-medium text-white transition-opacity hover:opacity-80'
        >
          Subscribe
        </button>
      </form>

      {status === 'success' && (
        <p className='mt-4 text-sm text-green-700' role='status'>
          Thanks for subscribing. Check your inbox for updates.
        </p>
      )}
      {status === 'error' && (
        <p className='mt-4 text-sm text-red-600' role='alert'>
          Please enter a valid email address.
        </p>
      )}
    </section>
  )
}

export default NewsletterBox
