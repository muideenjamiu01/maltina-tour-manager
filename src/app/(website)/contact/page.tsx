"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormSchema } from '@/lib/validators/contact.validator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormSchema) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: 'Message Sent!',
          description: result.message,
        });
        reset();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="min-h-screen py-12 px-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/websites/challenge/step-two.png')",
      }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 mt-12 md:mt-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white font-lilita mb-4">
            Contact Us
          </h1>
          <p className="text-base md:text-lg text-gray-900 font-medium max-w-xl mx-auto">
            Have questions about the Maltina Nourishment Tour? We'd love to hear from you. Fill out the form below and our team will get back to you shortly.
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <Label htmlFor="firstName" className="text-gray-900 font-semibold text-sm mb-2 block">
                Full Name <span className="text-[#E8673F]">*</span>
              </Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Enter first name"
                {...register('firstName')}
                className="bg-white border-none focus:ring-2 focus:ring-[#F66F39] h-12"
              />
              {errors.firstName && (
                <p className="text-red-600 text-sm mt-1 font-medium">{errors.firstName.message}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <Label htmlFor="lastName" className="text-gray-900 font-semibold text-sm mb-2 block">
                Last Name <span className="text-[#E8673F]">*</span>
              </Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Enter last name"
                {...register('lastName')}
                className="bg-white border-none focus:ring-2 focus:ring-[#F66F39] h-12"
              />
              {errors.lastName && (
                <p className="text-red-600 text-sm mt-1 font-medium">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* Email Address */}
          <div>
            <Label htmlFor="email" className="text-gray-900 font-semibold text-sm mb-2 block">
              Email Address <span className="text-[#E8673F]">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              {...register('email')}
              className="bg-white border-none focus:ring-2 focus:ring-[#F66F39] h-12"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1 font-medium">{errors.email.message}</p>
            )}
          </div>

          {/* Subject */}
          <div>
            <Label htmlFor="subject" className="text-gray-900 font-semibold text-sm mb-2 block">
              Subject <span className="text-[#E8673F]">*</span>
            </Label>
            <Input
              id="subject"
              type="text"
              placeholder="Enter subject"
              {...register('subject')}
              className="bg-white border-none focus:ring-2 focus:ring-[#F66F39] h-12"
            />
            {errors.subject && (
              <p className="text-red-600 text-sm mt-1 font-medium">{errors.subject.message}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message" className="text-gray-900 font-semibold text-sm mb-2 block">
              Message <span className="text-[#E8673F]">*</span>
            </Label>
            <Textarea
              id="message"
              placeholder="Type your message here..."
              rows={6}
              {...register('message')}
              className="bg-white border-none focus:ring-2 focus:ring-[#F66F39] resize-none"
            />
            {errors.message && (
              <p className="text-red-600 text-sm mt-1 font-medium">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-gray-900 hover:bg-gray-100 font-semibold text-base px-8 py-6 h-auto rounded-lg shadow-md"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
