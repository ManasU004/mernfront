import { assets } from '../assets/assets'

const policies = [
  {
    icon: assets.exchange_icon,
    title: 'Easy Exchange Policy',
    description: 'Exchange your purchase with ease.',
  },
  {
    icon: assets.quality_icon,
    title: '7 Days Return Policy',
    description: 'Shop confidently with hassle-free returns.',
  },
  {
    icon: assets.support_img,
    title: 'Reliable Customer Support',
    description: 'We are here to help whenever you need us.',
  },
]

const OurPolicy = () => {
  return (
    <section className='my-20 border-t border-gray-200 pt-12'>
      <div className='grid grid-cols-1 gap-10 text-center sm:grid-cols-3'>
        {policies.map((policy) => (
          <div key={policy.title} className='flex flex-col items-center gap-3'>
            <img className='w-12' src={policy.icon} alt='' />
            <h3 className='text-sm font-semibold text-gray-700'>{policy.title}</h3>
            <p className='max-w-xs text-xs text-gray-500'>{policy.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default OurPolicy
