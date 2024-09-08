"use client"

import { useState, useEffect } from "react"
import xss from 'xss';
import toast from "react-hot-toast";


const ContactForm = () => {

  const [data, setData] = useState({
    email: '',
    name: '',
    description: ''
  });



  // Function to handle input changes with sanitization
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = xss(value);  // Sanitize input value
    setData({
      ...data,
      [name]: sanitizedValue
    });
  };

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch('/api/contact-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      toast.success('Email sent successfully!');
      setData({
        email: '',
        name: '',
        description: ''
      });
    } else {
      toast.error('Failed to send email!');
  }
}

  return (
    <div className="mt-12 md:mt-0 w-full">
      <form onSubmit={sendEmail} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-white-primary">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              onChange={handleInputChange}
              value={data.email}
              required
              autoComplete="email"
              placeholder='example@example.com'
              className="block w-full rounded-[8px] border-0 py-1.5 text-black-primary shadow-sm ring-1 ring-inset ring-yellow-primary placeholder:text-black-primary/40 focus:ring-2 focus:ring-inset focus:ring-yellow-primary sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-white-primary">
            Name
          </label>
          <div className="mt-2">
            <input
              id="name"
              name="name"
              type="text"
              onChange={handleInputChange}
              value={data.name}
              required
              autoComplete="name"
              placeholder='John Smith'
              className="block w-full pl-2 rounded-[8px] border-0 py-1.5 text-black-primary shadow-sm ring-1 ring-inset ring-yellow-primary placeholder:text-black-primary/40 focus:ring-2 focus:ring-inset focus:ring-yellow-primary sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium leading-6 text-white-primary">
            Description
          </label>
          <div className="mt-2">
            <textarea
              id="description"
              name="description"
              onChange={handleInputChange}
              value={data.description}
              rows={6}
              placeholder='Short description of your project...'
              className="block w-full resize-none rounded-[8px] border-0 py-1.5 px-2 text-black-primary shadow-sm ring-1 ring-inset ring-yellow-primary placeholder:text-black-primary/40 focus:ring-2 focus:ring-inset focus:ring-yellow-primary sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-[8px] bg-yellow-primary px-3 py-3 text-sm font-bold leading-6 text-black-primary hover:bg-yellow-primary/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-primary"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
