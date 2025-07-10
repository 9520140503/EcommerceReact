import React from "react";
import { useForm } from "react-hook-form";

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Contact Form Data:", data);
    // You can add your backend API call or email logic here
  };

  return (
    <div className="min-h-scree px-6 py-12 flex flex-col items-center justify-center">
      {/* Header and Description */}
      <div className="text-center max-w-2xl mb-10">
        <h2 className="text-4xl font-bold text-white mb-4">
          Contact <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">Us</span>
        </h2>
        <p className="text-gray-300 text-lg">
          Got questions, feedback, or just want to say hello? Fill out the form
          below and we'll get back to you as soon as possible.
        </p>
      </div>

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" p-6 rounded-lg w-full max-w-xl shadow-lg border-2 border-purple-300"
      >
        {/* Name */}
        <div className="mb-4">
          <label className="text-white block mb-1">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full p-2 rounded bg-gray-700 text-white outline-none focus:ring-2 ring-blue-600"
            placeholder="Your name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-white block mb-1">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Enter a valid email",
              },
            })}
            className="w-full p-2 rounded bg-gray-700 text-white outline-none focus:ring-2 ring-blue-600"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Message */}
        <div className="mb-6">
          <label className="text-white block mb-1">Message</label>
          <textarea
            rows="5"
            {...register("message", { required: "Message is required" })}
            className="w-full p-2 rounded bg-gray-700 text-white outline-none focus:ring-2 ring-blue-600"
            placeholder="Your message..."
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded w-full transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;
