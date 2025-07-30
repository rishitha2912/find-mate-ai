'use client'

import React, { useState } from 'react';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface ValidationRule {
  message: string;
  validate: (value: string) => boolean;
}

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  rules?: ValidationRule[];
  disabled?: boolean;
  className?: string;
}

export const useFormValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (id: string, value: string, rules: ValidationRule[] = []) => {
    for (const rule of rules) {
      if (!rule.validate(value)) {
        setErrors(prev => ({ ...prev, [id]: rule.message }));
        return false;
      }
    }
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
    return true;
  };

  const validateForm = (fields: Array<{ id: string; value: string; rules?: ValidationRule[] }>) => {
    let isValid = true;
    const newErrors: Record<string, string> = {};

    fields.forEach(({ id, value, rules = [] }) => {
      for (const rule of rules) {
        if (!rule.validate(value)) {
          newErrors[id] = rule.message;
          isValid = false;
          break;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const clearErrors = () => setErrors({});
  
  return {
    errors,
    isLoading,
    setIsLoading,
    validateField,
    validateForm,
    clearErrors
  };
};

export const ValidationRules = {
  required: (message = 'This field is required'): ValidationRule => ({
    message,
    validate: (value) => value.trim().length > 0
  }),

  email: (message = 'Please enter a valid email address'): ValidationRule => ({
    message,
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  }),

  minLength: (length: number, message?: string): ValidationRule => ({
    message: message || `Must be at least ${length} characters`,
    validate: (value) => value.length >= length
  }),

  maxLength: (length: number, message?: string): ValidationRule => ({
    message: message || `Must be no more than ${length} characters`,
    validate: (value) => value.length <= length
  }),

  phone: (message = 'Please enter a valid phone number'): ValidationRule => ({
    message,
    validate: (value) => /^\+?[\d\s\-\(\)]{10,}$/.test(value)
  }),

  password: (message = 'Password must be at least 8 characters with letters and numbers'): ValidationRule => ({
    message,
    validate: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/.test(value)
  }),

  confirmPassword: (originalPassword: string, message = 'Passwords do not match'): ValidationRule => ({
    message,
    validate: (value) => value === originalPassword
  })
};

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  rules = [],
  disabled = false,
  className = ''
}) => {
  const [touched, setTouched] = useState(false);
  const [fieldError, setFieldError] = useState('');

  const handleBlur = () => {
    setTouched(true);
    for (const rule of rules) {
      if (!rule.validate(value)) {
        setFieldError(rule.message);
        return;
      }
    }
    setFieldError('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    if (touched) {
      for (const rule of rules) {
        if (!rule.validate(newValue)) {
          setFieldError(rule.message);
          return;
        }
      }
      setFieldError('');
    }
  };

  const hasError = touched && fieldError;
  const isValid = touched && !fieldError && value.length > 0;

  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-4 py-3 border-2 rounded-lg transition-colors ${
            hasError
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : isValid
              ? 'border-green-300 focus:border-green-500 focus:ring-green-500'
              : 'border-gray-200 focus:border-primary-navy focus:ring-primary-navy'
          } focus:outline-none focus:ring-2 focus:ring-opacity-20 ${
            disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
          }`}
        />
        
        {/* Validation Icons */}
        {touched && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {hasError ? (
              <AlertCircle className="w-5 h-5 text-red-500" />
            ) : isValid ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : null}
          </div>
        )}
      </div>
      
      {/* Error Message */}
      {hasError && (
        <p className="text-sm text-red-600 flex items-center space-x-1">
          <AlertCircle className="w-4 h-4" />
          <span>{fieldError}</span>
        </p>
      )}
    </div>
  );
};

interface LoadingButtonProps {
  loading: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  children: React.ReactNode;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  children
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`relative flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform ${
        loading || disabled
          ? 'opacity-60 cursor-not-allowed'
          : 'hover:scale-105'
      } ${className}`}
    >
      {loading && (
        <Loader2 className="w-5 h-5 animate-spin" />
      )}
      <span>{children}</span>
    </button>
  );
};

export default FormField; 