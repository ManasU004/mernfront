import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className="py-12 text-gray-800">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">Contact us</p>
          <h1 className="mt-4 text-4xl font-semibold text-gray-900">We’d love to hear from you.</h1>
          <p className="mt-5 text-base leading-8 text-gray-600">
            Whether you have a question about sizing, delivery, or a custom order, our team is here to help.
          </p>

          <div className="mt-8 space-y-5">
            <div className="flex items-start gap-4 rounded-2xl border border-gray-200 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-900">✉</div>
              <div>
                <p className="text-sm uppercase tracking-[0.15em] text-gray-500">Email</p>
                <p className="mt-1 text-base text-gray-900">support@yourbrand.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-gray-200 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-900">☎</div>
              <div>
                <p className="text-sm uppercase tracking-[0.15em] text-gray-500">Phone</p>
                <p className="mt-1 text-base text-gray-900">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-gray-200 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-900">⌂</div>
              <div>
                <p className="text-sm uppercase tracking-[0.15em] text-gray-500">Location</p>
                <p className="mt-1 text-base text-gray-900">22 Market Street, Bengaluru, India</p>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <img src={assets.contact_img} alt="Contact" className="h-52 w-full rounded-xl object-cover" />

          <form className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Name</label>
              <input type="text" className="w-full border border-gray-300 px-3 py-2 outline-none focus:border-black" placeholder="Your name" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
              <input type="email" className="w-full border border-gray-300 px-3 py-2 outline-none focus:border-black" placeholder="Your email" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Message</label>
              <textarea rows="5" className="w-full resize-none border border-gray-300 px-3 py-2 outline-none focus:border-black" placeholder="Tell us how we can help" />
            </div>

            <button type="button" className="w-full cursor-pointer bg-black px-4 py-3 text-sm font-medium uppercase tracking-wide text-white">
              Send message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact