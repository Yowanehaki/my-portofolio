"use client"

import { useState } from 'react';

export default function Menfess() {
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Normally, you would send the message to your backend here
    console.log('Menfess submitted:', message);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setMessage('');
    }, 3000);
  };

  return (
    <section id="menfess" className="py-16 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative">
        {/* Background elements */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-purple-200 dark:bg-purple-900/30 rounded-full filter blur-xl opacity-60"></div>
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-pink-200 dark:bg-pink-900/30 rounded-full filter blur-xl opacity-50"></div>
        
        <div className="relative">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white inline-block">
              Send Menfess
              <div className="h-1 w-24 bg-gradient-to-r from-purple-400 to-pink-500 mt-1 rounded-full mx-auto"></div>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
              Send an anonymous message to us. Share your thoughts without worrying about revealing your identity.
            </p>
          </div>

          <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80 border border-gray-100 dark:border-gray-700">
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-16 h-16 z-0">
              <div className="absolute w-full h-full bg-purple-400 dark:bg-purple-600 rounded-lg transform rotate-6 opacity-70"></div>
              <div className="absolute w-full h-full bg-pink-500 dark:bg-pink-700 rounded-lg transform -rotate-3 opacity-70"></div>
            </div>
            
            <div className="absolute -bottom-3 -right-3 w-12 h-12">
              <div className="absolute w-full h-full bg-indigo-400 dark:bg-indigo-600 rounded-lg transform -rotate-6 opacity-70"></div>
            </div>
            
            <div className="relative z-10">
              {submitted ? (
                <div className="min-h-48 flex flex-col items-center justify-center text-center p-4 py-8">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 animate-bounce-subtle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Menfess Sent!</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Thank you for sharing your thoughts. Your message has been sent anonymously.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative">
                  <div className="mb-5">
                    <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2 text-sm">
                      Menfess Message
                    </label>
                    <textarea
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-200 resize-none shadow-sm"
                      rows={5}
                      placeholder="Write your message here... (100% anonymous)"
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="text-xs text-gray-500 dark:text-gray-400 italic">
                     *mwhehe:3
                    </div>
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 shadow-md self-end"
                    >
                      Send Menfess
                    </button>
                  </div>
                </form>
              )}
              
              <div className="mt-8 pt-5 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">What is Menfess?</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Menfess (Message Confession) is an anonymous messaging service where senders can deliver messages
                  without revealing their identity. This feature allows you to express your thoughts, feelings,
                  or experiences without having to worry about judgment from others.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}