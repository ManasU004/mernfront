import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className='mt-20 border-t border-gray-200 pt-12 text-sm text-gray-600'>
      <div className='grid grid-cols-1 gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-3'>
        <div>
          <img src={assets.logo} className='mb-5 w-36' alt='BuyVerse' />
          <p className='max-w-sm leading-6'>
            Discover everyday essentials and fresh styles made for your wardrobe.
          </p>
        </div>

        <div>
          <h2 className='mb-5 text-sm font-semibold uppercase text-gray-800'>Explore</h2>
          <nav className='flex flex-col items-start gap-3'>
            <Link to='/' className='hover:text-black'>Home</Link>
            <Link to='/Collection' className='hover:text-black'>Collection</Link>
            <Link to='/About' className='hover:text-black'>About us</Link>
            <Link to='/Contact' className='hover:text-black'>Contact us</Link>
          </nav>
        </div>

        <div>
          <h2 className='mb-5 text-sm font-semibold uppercase text-gray-800'>Get in touch</h2>
          <div className='flex flex-col gap-3'>
            <a href='mailto:support@buyverse.com' className='hover:text-black'>
              support@buyverse.com
            </a>
            <a href='tel:+18001234567' className='hover:text-black'>
              +1 800 123 4567
            </a>
            <p>Mon - Sat, 9:00 AM - 6:00 PM</p>
          </div>
        </div>
      </div>

      <div className='border-t border-gray-200 py-5 text-center text-xs text-gray-500'>
        <p>Copyright 2026 BuyVerse. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
