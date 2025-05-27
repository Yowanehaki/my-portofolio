"use client"

import { useState, FormEvent, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import emailjs from 'emailjs-com';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Define error type for better type safety
interface EmailJSError {
  status?: number;
  text?: string;
  message?: string;
}

export default function Contactme() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // Basic validation
    if (formData.name.trim().length < 2) {
      setError('Name must be at least 2 characters long');
      setIsLoading(false);
      return;
    }
    
    if (formData.message.trim().length < 10) {
      setError('Message must be at least 10 characters long');
      setIsLoading(false);
      return;
    }
    
    try {
      // Initialize EmailJS if not already done
      emailjs.init('3VhPVVguSLnCInryT'); // Correct Public Key
      
      // Send email using EmailJS
      const result = await emailjs.send(
        'service_y60z2wj',    // Service ID
        'template_i6ihedb',   // Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Mulfi Hazwi', // Your name
          subject: `Portfolio Contact: Message from ${formData.name}`,
          reply_to: formData.email
        },
        '3VhPVVguSLnCInryT' // Correct Public Key
      );

      console.log('Email sent successfully:', result);
      
      if (result.status === 200) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: '', email: '', message: '' });
        }, 4000);
      } else {
        throw new Error(`EmailJS returned status: ${result.status}`);
      }
      
    } catch (error: unknown) {
      // Log the error for debugging
      console.error('Error sending email:', error);
      
      // Better error handling with type safety
      let errorMessage = 'Failed to send message. Please try again.';
      
      // Type guard to safely access error properties
      if (error && typeof error === 'object') {
        const emailError = error as EmailJSError;
        if (emailError.text) {
          errorMessage = `Error: ${emailError.text}`;
        } else if (emailError.message) {
          errorMessage = emailError.message;
        }
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section 
      id="contactme" 
      className="py-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden"
      ref={sectionRef}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative">
        {/* Background elements */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-200 dark:bg-blue-900/30 rounded-full filter blur-xl opacity-60"></div>
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-indigo-200 dark:bg-indigo-900/30 rounded-full filter blur-xl opacity-50"></div>
        
        <div className="relative">
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white inline-block">
              Contact Me
              <motion.div 
                className="h-1 w-24 bg-gradient-to-r from-blue-400 to-indigo-500 mt-1 rounded-full mx-auto"
                initial={{ width: 0 }}
                animate={isInView ? { width: 96 } : { width: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              ></motion.div>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
              Get in touch with me! Id love to hear from you. Send me a message and I will get back to you as soon as possible.
            </p>
          </motion.div>

          <motion.div 
            className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80 border border-gray-100 dark:border-gray-700"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-16 h-16 z-0">
              <div className="absolute w-full h-full bg-blue-400 dark:bg-blue-600 rounded-lg transform rotate-6 opacity-70"></div>
              <div className="absolute w-full h-full bg-indigo-500 dark:bg-indigo-700 rounded-lg transform -rotate-3 opacity-70"></div>
            </div>
            
            <div className="absolute -bottom-3 -right-3 w-12 h-12">
              <div className="absolute w-full h-full bg-cyan-400 dark:bg-cyan-600 rounded-lg transform -rotate-6 opacity-70"></div>
            </div>
            
            <div className="relative z-10">
              {/* Error Message */}
              {error && (
                <motion.div 
                  className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                  </div>
                </motion.div>
              )}

              {submitted ? (
                <motion.div 
                  className="min-h-48 flex flex-col items-center justify-center text-center p-4 py-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 animate-bounce-subtle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Thank you for reaching out! I will get back to you as soon as possible.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="relative">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                    <div>
                      <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2 text-sm">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-200 shadow-sm"
                        placeholder="Enter your name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2 text-sm">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-200 shadow-sm"
                        placeholder="Enter your email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-5">
                    <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2 text-sm">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-200 resize-none shadow-sm"
                      rows={5}
                      placeholder="Write your message here..."
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      disabled={isLoading}
                    ></textarea>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="text-xs text-gray-500 dark:text-gray-400 italic">
                      * Required fields
                    </div>
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-medium py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md self-end flex items-center gap-2"
                      whileHover={!isLoading ? { scale: 1.05 } : {}}
                      whileTap={!isLoading ? { scale: 0.95 } : {}}
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </motion.button>
                  </div>
                </form>
              )}
              
              <div className="mt-8 pt-5 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Lets Connect!</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm text-justify">
                  Im always excited to connect with fellow developers, potential collaborators, or anyone interested 
                  in discussing technology, projects, or opportunities. Whether you have a question, want to work 
                  together, or just want to say hello, dont hesitate to reach out!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}