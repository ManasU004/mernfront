import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className="py-12 text-gray-800">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-gray-100">
          <img src={assets.about_img} alt="About us" className="h-[420px] w-full object-cover" />
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">Our Story</p>
          <h1 className="mt-4 text-4xl font-semibold text-gray-900">Designed for everyday comfort.</h1>
          <p className="mt-5 text-base leading-8 text-gray-600">
            We started with a simple idea: great fashion should feel effortless, last longer,
            and fit naturally into real life. Every piece in our collection is chosen for its
            comfort, versatility, and quality, so you can move through your day with confidence.
          </p>
          <p className="mt-4 text-base leading-8 text-gray-600">
            From premium basics to statement essentials, our goal is to help you build a wardrobe
            that feels personal, practical, and timeless.
          </p>
        </div>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {[
          { value: '10k+', label: 'Happy customers' },
          { value: '48h', label: 'Fast dispatch' },
          { value: '4.9/5', label: 'Average rating' },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center">
            <p className="text-3xl font-semibold text-gray-900">{item.value}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.15em] text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">Why choose us</p>
        <h2 className="mt-4 text-3xl font-semibold text-gray-900">Made for modern lifestyles.</h2>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Premium fabrics',
              text: 'We source soft, durable materials designed to feel good and hold their shape.',
            },
            {
              title: 'Thoughtful design',
              text: 'Every silhouette is designed for everyday wear, from workdays to weekends.',
            },
            {
              title: 'Responsible choices',
              text: 'We focus on quality, long-lasting style, and mindful production practices.',
            },
          ].map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 h-12 w-12 rounded-full bg-black text-center leading-[3rem] text-sm font-semibold text-white">
                ✓
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-gray-600">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About