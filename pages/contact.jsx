import React, { useState } from 'react';

/**
 * Contact component for the recipe app.
 *
 * This component allows users to contact the app administrators by filling out a form.
 *
 *
 * @returns {JSX.Element} - The rendered Contact component.
 */
function Contact() {
  /**
   * State to track whether the form has been successfully submitted.
   *
   * @type {boolean}
   */
  const [isSubmitted, setIsSubmitted] = useState(false);

  /**
   * State to store form data.
   *
   * @type {Object}
   * @property {string} name - User's name.
   * @property {string} email - User's email address.
   * @property {string} message - User's message.
   */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  /**
   * Handles form submission.
   *
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform any necessary form submission logic here

    // Set the submission status to true
    setIsSubmitted(true);
  };

  /**
   * Handles changes in form inputs.
   *
   * @param {Event} e - The input change event.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>

      {isSubmitted ? (
         <div className="mb-4 text-green-600 text-center p-4 bg-green-100 rounded">
         Thank you for your message! We'll get back to you soon.
       </div>
      ) : (
        <>
          <p className="text-lg mb-4">
            Have questions or suggestions? Feel free to reach out to us.
          </p>

          <form className="max-w-md" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="John Doe"
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="john@example.com"
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="Type your message here..."
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Contact;
