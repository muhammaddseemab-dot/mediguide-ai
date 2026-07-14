/**
 * Unit Tests for Button Component
 * 
 * Validates: Requirements 5.4, 9.2, 9.4
 */

import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/forms/Button'

describe('Button Component', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole('button')).toHaveTextContent('Click me')
    })

    it('renders different variants', () => {
      const { rerender } = render(<Button variant="primary">Primary</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()

      rerender(<Button variant="secondary">Secondary</Button>)
      expect(screen.getByRole('button')).toHaveTextContent('Secondary')

      rerender(<Button variant="outline">Outline</Button>)
      expect(screen.getByRole('button')).toHaveTextContent('Outline')

      rerender(<Button variant="ghost">Ghost</Button>)
      expect(screen.getByRole('button')).toHaveTextContent('Ghost')

      rerender(<Button variant="danger">Danger</Button>)
      expect(screen.getByRole('button')).toHaveTextContent('Danger')
    })

    it('renders different sizes', () => {
      const { rerender } = render(<Button size="sm">Small</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()

      rerender(<Button size="md">Medium</Button>)
      expect(screen.getByRole('button')).toHaveTextContent('Medium')

      rerender(<Button size="lg">Large</Button>)
      expect(screen.getByRole('button')).toHaveTextContent('Large')
    })
  })

  describe('Accessibility', () => {
    it('sets aria-busy when loading', () => {
      render(<Button loading>Submit</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
    })

    it('is accessible by keyboard', () => {
      render(<Button>Click me</Button>)
      const button = screen.getByRole('button')
      button.focus()
      expect(button).toHaveFocus()
    })

    it('responds to Enter key', () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick}>Click me</Button>)
      
      const button = screen.getByRole('button')
      fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' })
      
      expect(handleClick).toHaveBeenCalled()
    })

    it('responds to Space key', () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick}>Click me</Button>)
      
      const button = screen.getByRole('button')
      fireEvent.keyDown(button, { key: ' ', code: 'Space' })
      
      expect(handleClick).toHaveBeenCalled()
    })
  })

  describe('Functionality', () => {
    it('handles click events', () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick}>Click me</Button>)
      
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('is disabled when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('is disabled when loading', () => {
      render(<Button loading>Loading</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('does not handle clicks when disabled', () => {
      const handleClick = jest.fn()
      render(<Button disabled onClick={handleClick}>Disabled</Button>)
      
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('renders full width when fullWidth is true', () => {
      render(<Button fullWidth>Full Width</Button>)
      expect(screen.getByRole('button')).toHaveClass('w-full')
    })
  })

  describe('Loading State', () => {
    it('shows loading text', () => {
      render(<Button loading>Loading...</Button>)
      // The button should still have text content
      expect(screen.getByRole('button')).toHaveTextContent('Loading...')
    })

    it('shows loader icon when loading', () => {
      render(<Button loading>Submit</Button>)
      // The button should have an element with animate-spin class
      expect(screen.getByRole('button').querySelector('.animate-spin')).toBeInTheDocument()
    })
  })

  describe('Icons', () => {
    it('renders left icon when provided', () => {
      render(<Button leftIcon={<span data-testid="icon">★</span>}>With Icon</Button>)
      expect(screen.getByTestId('icon')).toBeInTheDocument()
    })

    it('renders right icon when provided', () => {
      render(<Button rightIcon={<span data-testid="icon">★</span>}>With Icon</Button>)
      expect(screen.getByTestId('icon')).toBeInTheDocument()
    })
  })
})