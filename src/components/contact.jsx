import { Phone, MessageCircle, Mail, MapPin, Send, Clock } from 'lucide-react';

const Contact = () => {
  const contactDetails = [
    {
      icon: Phone,
      title: 'Phone Number',
      value: '09163402353',
      link: 'tel:09163402353',
      description: 'Give us a call',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      value: '09163402353',
      link: 'https://wa.me/2349163402353',
      description: 'Chat with our team',
    },
    {
      icon: 'Instagram',
      title: 'Instagram',
      value: '@flowluxe',
      link: 'https://www.instagram.com/flowluxe/',
      description: 'Follow our latest styles',
    },
    {
      icon: Mail,
      title: 'Email Address',
      value: 'flowluxefashion@gmail.com',
      link: 'mailto:flowluxefashion@gmail.com',
      description: 'Send us an email',
    },
    {
      icon: MapPin,
      title: 'Our Location',
      value: 'Ibadan, Nigeria',
      link: null,
      description: 'Where FLOW LUXE is based',
    },
    {
      icon: 'Facebook',
      title: 'Facebook',
      value: 'FLOW LUXE Clothing & Fashion',
      link: null,
      description: 'Connect with our community',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');

    const subject = encodeURIComponent(`New Contact Message from ${name}`);

    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:flowluxefashion@gmail.com?subject=${subject}&body=${body}`;

    form.reset();
  };

  return (
    <section className="w-full bg-violet-50 py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Page Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full bg-white px-5 py-2 text-sm font-semibold tracking-wider text-pink-500 shadow-sm">
            WE WOULD LOVE TO HEAR FROM YOU
          </span>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Get In <span className="text-pink-400">Touch</span>
          </h1>

          <p className="mt-5 text-sm leading-7 text-gray-600 sm:text-base">
            Have a question about an order, our products, or need assistance?
            We're always happy to help. Reach out to FLOW LUXE and let's make
            your shopping experience special.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Contact Information */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Contact Information
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Choose any of the channels below to connect with us.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {contactDetails.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/80 bg-white/70 p-5 shadow-[5px_5px_15px_#ddd5e8,-5px_-5px_15px_#ffffff] transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-pink-600">
                      <Icon size={21} />
                    </div>

                    <h3 className="font-semibold text-gray-900">
                      {item.title}
                    </h3>

                    {item.link ? (
                      <a
                        href={item.link}
                        target={
                          item.link.startsWith('https') ? '_blank' : undefined
                        }
                        rel={
                          item.link.startsWith('https')
                            ? 'noopener noreferrer'
                            : undefined
                        }
                        className="mt-2 block wrap-break-word text-sm font-medium text-pink-600 transition hover:text-pink-700"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-2 wrap-break-word text-sm font-medium text-gray-700">
                        {item.value}
                      </p>
                    )}

                    <p className="mt-2 text-xs text-gray-500">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Business Hours */}
            <div className="mt-6 flex items-start gap-4 rounded-2xl border border-white bg-white/70 p-5 shadow-sm">
              <div className="rounded-xl bg-violet-100 p-3 text-pink-600">
                <Clock size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  We're Here to Help
                </h3>

                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Reach out to us through WhatsApp or email whenever you need
                  assistance.
                </p>
              </div>
            </div>
          </div>

          {/* Message Form */}
          <div className="rounded-3xl border border-white/80 bg-white p-6 shadow-[8px_8px_25px_#ddd5e8,-8px_-8px_25px_#ffffff] sm:p-8 lg:p-10">
            <div className="mb-7">
              <span className="text-sm font-semibold uppercase tracking-widest text-pink-500">
                Get in touch
              </span>

              <h2 className="mt-2 text-2xl font-bold text-gray-900">
                Send Us a Message
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Fill out the form below and tell us how we can help you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-pink-400 focus:bg-white focus:ring-2 focus:ring-pink-100"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-pink-400 focus:bg-white focus:ring-2 focus:ring-pink-100"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-pink-400 focus:bg-white focus:ring-2 focus:ring-pink-100"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Your Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="How can we help you?"
                  required
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-pink-400 focus:bg-white focus:ring-2 focus:ring-pink-100"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-gray-900 px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-pink-600 hover:shadow-lg"
              >
                Send Message
                <Send size={17} />
              </button>

              <p className="text-center text-xs leading-5 text-gray-500">
                Your message will be prepared in your default email application.
              </p>
            </form>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="mt-14 text-center">
          <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            Your Style. Your Confidence. Your FLOW.
          </h2>

          <p className="mt-3 text-sm text-gray-600">
            Thank you for choosing FLOW LUXE. We appreciate your support.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
