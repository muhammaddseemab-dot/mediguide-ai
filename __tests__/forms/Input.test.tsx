/**
 * Unit Tests for Input Component
 * 
 * Validates: Requirements 5.4, 9.2, 9.4
 */

import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from '@/components/forms/Input'

describe('Input Component', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Input />)
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('renders with label when provided', () => {
      render(<Input label="Email" />)
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    })

    it('renders placeholder text', () => {
      render(<Input placeholder="Enter email" />)
      expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument()
    })

    it('renders with error message', () => {
      render(<Input error="Invalid email" />)
      expect(screen.getByRole('alert')).toHaveTextContent('Invalid email')
    })

    it('renders helper text when no error', () => {
      render(<Input helperText="We will never share your email" />)
      expect(screen.getByText('We will never share your email')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('associates label with input using htmlFor', () => {
      render(<Input label="Email" id="email-input" />)
      const label = screen.getByText('Email')
      const input = screen.getByLabelText(/email/i)
      expect(label).toHaveAttribute('for', 'email-input')
      expect(input).toHaveAttribute('id', 'email-input')
    })

    it('sets aria-invalid when there is an error', () => {
      render(<Input error="Required" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
    })

    it('sets aria-required when required prop is true', () => {
      render(<Input label="Email" required />)
      expect(screen.getByLabelText(/email/i)).toHaveAttribute('aria-required', 'true')
    })

    it('associates error message with input using aria-describedby', () => {
      render(<Input error="Invalid email" id="email-input" />)
      const input = screen.getByLabelText(/email/i)
      expect(input).toHaveAttribute('aria-describedby', expect.stringContaining('-error'))
    })

    it('shows required asterisk visually', () => {
      render(<Input label="Email" required />)
      expect(screen.getByText('*')).toBeInTheDocument()
    })
  })

  describe('Functionality', () => {
    it('handles value changes', () => {
      const handleChange = jest.fn()
      render(<Input onChange={handleChange} />)
      
      const input = screen.getByRole('textbox')
      fireEvent.change(input, { target: { value: 'test@example.com' } })
      
      expect(handleChange).toHaveBeenCalled()
    })

    it('accepts disabled prop', () => {
      render(<Input disabled />)
      expect(screen.getByRole('textbox')).toBeDisabled()
    })

    it('accepts different input types', () => {
      const { rerender } = render(<Input type="email" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')

      rerender(<Input type="password" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'password')
    })
  })

  describe('Icons', () => {
    it('renders left icon when provided', () => {
      render(<Input leftIcon={<span data-testid="left-icon">🔒</span>} />)
      expect(screen.getByTestId('left-icon')).toBeInTheDocument()
    })

    it('renders right icon when provided', () => {
      render(<Input rightIcon={<span data-testid="right-icon">🔍</span>} />)
      expect(screen.getByTestId('right-icon')).toBeInTheDocument()
    })
  })
})