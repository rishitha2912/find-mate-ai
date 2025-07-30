'use client'

import React, { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import CognizantLogo from '../../components/ui/CognizantLogo'
import { FormField, LoadingButton, useFormValidation, ValidationRules } from '../../components/ui/FormValidation'
import { useToast } from '../../components/ui/ToastContainer'

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const { isLoading, setIsLoading, validateForm } = useFormValidation()
  const { showSuccess, showError } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle sign in logic here
    console.log('Sign in:', formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-navy via-gray-800 to-primary-navy flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black bg-opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          opacity: 0.1
        }}></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center space-x-2 text-white hover:text-gray-300 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        {/* Sign In Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-95">
          {/* Header */}
          <div className="text-center mb-8">
            {/* Cognizant Logo */}
            <div className="flex justify-center mb-6">
              <CognizantLogo size="md" variant="dark" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your FindMate account</p>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <FormField
              id="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
              placeholder="Enter your email"
              required
              rules={[ValidationRules.required(), ValidationRules.email()]}
              disabled={isLoading}
            />

            {/* Password Field */}
            <FormField
              id="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(value) => setFormData(prev => ({ ...prev, password: value }))}
              placeholder="Enter your password"
              required
              rules={[ValidationRules.required()]}
              disabled={isLoading}
            />
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-sm text-primary-navy hover:opacity-80 font-medium flex items-center space-x-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{showPassword ? 'Hide' : 'Show'} Password</span>
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-navy border-gray-300 rounded focus:ring-primary-navy focus:ring-2"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link 
                href="/forgot-password"
                className="text-sm text-primary-navy hover:opacity-80 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
                          <LoadingButton
                type="submit"
                loading={isLoading}
                className="w-full bg-primary-navy hover:opacity-90 text-white"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </LoadingButton>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link 
                href="/signup"
                className="text-primary-navy hover:opacity-80 font-semibold"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInPage 