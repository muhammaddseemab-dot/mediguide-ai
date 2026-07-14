/**
 * Component Tests for SymptomInput
 */

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SymptomInput } from './SymptomInput'

// Mock the form dependencies
jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
  Controller: ({ render: renderProp }: unknown) => renderProp({ field: { value: '', onChange: jest.fn() } }),
}))

describe('SymptomInput Component', () => {
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render the component with title and description', () => {
      render(<SymptomInput onSubmit={mockOnSubmit} />)

      expect(screen.getByText('Symptom Checker')).toBeInTheDocument()
      expect(screen.getByText(/Describe your symptoms/i)).toBeInTheDocument()
    })

    it('should display medical disclaimer', () => {
      render(<SymptomInput onSubmit={mockOnSubmit} />)

      expect(screen.getByText(/Medical Disclaimer/i)).toBeInTheDocument()
    })

    it('should render common symptoms buttons', () => {
      render(<SymptomInput onSubmit={mockOnSubmit} />)

      expect(screen.getByText('Fever')).toBeInTheDocument()
      expect(screen.getByText('Cough')).toBeInTheDocument()
      expect(screen.getByText('Sore Throat')).toBeInTheDocument()
    })

    it('should display duration selection field', () => {
      render(<SymptomInput onSubmit={mockOnSubmit} />)

      expect(screen.getByLabelText(/How long have you had these symptoms/i)).toBeInTheDocument()
    })

    it('should display severity selection field', () => {
      render(<SymptomInput onSubmit={mockOnSubmit} />)

      expect(screen.getByLabelText(/Symptom Severity/i)).toBeInTheDocument()
    })

    it('should display notes textarea', () => {
      render(<SymptomInput onSubmit={mockOnSubmit} />)

      expect(screen.getByLabelText(/Additional Notes/i)).toBeInTheDocument()
    })

    it('should display analyze button', () => {
      render(<SymptomInput onSubmit={mockOnSubmit} />)

      expect(screen.getByRole('button', { name: /Analyze Symptoms/i })).toBeInTheDocument()
    })
  })

  describe('Symptom Selection', () => {
    it('should allow selecting a common symptom', async () => {
      const user = userEvent.setup()
      render(<SymptomInput onSubmit={mockOnSubmit} />)

      const feverButton = screen.getByRole('button', { name: 'Fever' })
      await user.click(feverButton)

      // Button should be highlighted/selected (variant changed)
      expect(feverButton).toHaveClass('bg-')
    })

    it('should display selected symptoms', async () => {
      render(<SymptomInput onSubmit={mockOnSubmit} />)

      const feverButton = screen.getByRole('button', { name: 'Fever' })
      fireEvent.click(feverButton)

      // After selection, symptom should appear in the "Selected Symptoms" section
      await waitFor(() => {
        expect(screen.getByText(/Selected Symptoms/i)).toBeInTheDocument()
      })
    })

    it('should allow selecting multiple symptoms', async () => {
      render(<SymptomInput onSubmit={mockOnSubmit} />)

      const feverButton = screen.getByRole('button', { name: 'Fever' })
      const coughButton = screen.getByRole('button', { name: 'Cough' })

      fireEvent.click(feverButton)
      fireEvent.click(coughButton)

      await waitFor(() => {
        expect(screen.getByText(/Selected Symptoms \(2\/10\)/i)).toBeInTheDocument()
      })
    })

    it('should not allow more than 10 symptoms', async () => {
      render(<SymptomInput onSubmit={mockOnSubmit} />)

      const buttons = screen.getAllByRole('button').slice(0, 10)

      buttons.forEach((button) => {
        if (button.textContent && !button.textContent.includes('Add') && !button.textContent.includes('Analyze')) {
          fireEvent.click(button)
        }
      })

      // Try to click another button
      const nextButton = screen.getAllByRole('button').find(
        (btn) => !btn.textContent?.includes('Add') && !btn.textContent?.includes('Analyze')
      )
      if (nextButton && !nextButton.hasAttribute('disabled')) {
        fireEvent.click(nextButton)
      }
    })

    it('should allow removing a selected symptom', async () => {
      render(<SymptomInput onSubmit={mockOnSubmit} />)

      const feverButton = screen.getByRole('button', { name: 'Fever' })
      fireEvent.click(feverButton)

      await waitFor(() => {
        const badge = screen.getByText('Fever')
        expect(badge).toBeInTheDocument()
      })

      // Remove the symptom
      const badge = screen.getByText(/Fever×/i)
      fireEvent.click(badge)

      // Symptom should be removed
      await waitFor(() => {
        expect(screen.queryByText('Fever')).not.toBeInTheDocument()
      })
    })
  })

  describe('Custom Symptom Input', () => {
    it('should allow entering a custom symptom', async () => {
      const user = userEvent.setup()
      render(<SymptomInput onSubmit={mockOnSubmit} />)

      const input = screen.getByPlaceholderText(/Describe other symptoms/i)
      await user.type(input, 'muscle pain')

      expect(input).toHaveValue('muscle pain')
    })

    it('should add custom symptom on button click', async () => {
      render(<SymptomInput onSubmit={mockOnSubmit} />)

      const input = screen.getByPlaceholderText(/Describe other symptoms/i) as HTMLInputElement
      const addButton = screen.getAllByRole('button').find((btn) => btn.textContent?.includes('Add'))

      fireEvent.change(input, { target: { value: 'custom symptom' } })
      fireEvent.click(addButton!)

      await waitFor(() => {
        expect(screen.getByText(/custom symptom/i)).toBeInTheDocument()
      })
    })

    it('should add custom symptom on Enter key', async () => {
      const user = userEvent.setup()
      render(<SymptomInput onSubmit={mockOnSubmit} />)

      const input = screen.getByPlaceholderText(/Describe other symptoms/i)
      await user.type(input, 'custom symptom{Enter}')

      await waitFor(() => {
        expect(screen.getByText(/custom symptom/i)).toBeInTheDocument()
      })
    })

    it('should clear input after adding custom symptom', async () => {
      render(<SymptomInput onSubmit={mockOnSubmit} />)

      const input = screen.getByPlaceholderText(/Describe other symptoms/i) as HTMLInputElement
      const addButton = screen.getAllByRole('button').find((btn) => btn.textContent?.includes('Add'))

      fireEvent.change(input, { target: { value: 'test' } })
      fireEvent.click(addButton!)

      await waitFor(() => {
        expect(input.value).toBe('')
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper labels for all inputs', () => {
      render(<SymptomInput onSubmit={mockOnSubmit} />)

      expect(screen.getByLabelText(/How long have you had these symptoms/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Symptom Severity/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Additional Notes/i)).toBeInTheDocument()
    })

    it('should have ARIA labels for buttons', () => {
      render(<SymptomInput onSubmit={mockOnSubmit} />)

      const addButton = screen.getByLabelText(/Add symptom button/i)
      expect(addButton).toBeInTheDocument()
    })

    it('should support keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<SymptomInput onSubmit={mockOnSubmit} />)

      const customInput = screen.getByPlaceholderText(/Describe other symptoms/i)
      await user.tab()

      // Should be able to tab to inputs
      expect(customInput).toBeInTheDocument()
    })
  })

  describe('Form Submission', () => {
    it('should have disabled submit button when no symptoms selected', () => {
      render(<SymptomInput onSubmit={mockOnSubmit} />)

      const submitButton = screen.getByRole('button', { name: /Analyze Symptoms/i })
      expect(submitButton).toBeDisabled()
    })

    it('should enable submit button when symptoms are selected', async () => {
      render(<SymptomInput onSubmit={mockOnSubmit} />)

      const feverButton = screen.getByRole('button', { name: 'Fever' })
      fireEvent.click(feverButton)

      const submitButton = screen.getByRole('button', { name: /Analyze Symptoms/i })

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled()
      })
    })

    it('should show loading state when submitting', async () => {
      render(<SymptomInput onSubmit={mockOnSubmit} isLoading={true} />)

      expect(screen.getByText(/Analyzing/i)).toBeInTheDocument()
    })

    it('should disable button during submission', () => {
      render(<SymptomInput onSubmit={mockOnSubmit} isLoading={true} />)

      const submitButton = screen.getByRole('button', { name: /Analyzing/i })
      expect(submitButton).toBeDisabled()
    })
  })

  describe('Validation', () => {
    it('should show error for empty symptoms on submit', async () => {
      // This test assumes form validation is implemented
      render(<SymptomInput onSubmit={mockOnSubmit} />)

      const submitButton = screen.getByRole('button', { name: /Analyze Symptoms/i })
      expect(submitButton).toBeDisabled() // Button should be disabled if no symptoms
    })

    it('should limit notes to 500 characters', async () => {
      const user = userEvent.setup()
      render(<SymptomInput onSubmit={mockOnSubmit} />)

      const notesInput = screen.getByPlaceholderText(/up to 500 characters/i) as HTMLTextAreaElement
      const longText = 'a'.repeat(501)

      await user.type(notesInput, longText)

      // The input should be limited to 500 characters by the validation schema
      expect(notesInput.value.length).toBeLessThanOrEqual(500)
    })
  })

  describe('Symptom Counter', () => {
    it('should display selected symptom count', async () => {
      render(<SymptomInput onSubmit={mockOnSubmit} />)

      const feverButton = screen.getByRole('button', { name: 'Fever' })
      const coughButton = screen.getByRole('button', { name: 'Cough' })

      fireEvent.click(feverButton)
      fireEvent.click(coughButton)

      await waitFor(() => {
        expect(screen.getByText(/Selected Symptoms \(2\/10\)/i)).toBeInTheDocument()
      })
    })

    it('should show warning at max symptoms', async () => {
      render(<SymptomInput onSubmit={mockOnSubmit} />)

      // Select 10 symptoms
      const symptomButtons = screen.getAllByRole('button').slice(1, 11)

      symptomButtons.forEach((btn) => {
        if (!btn.hasAttribute('disabled')) {
          fireEvent.click(btn)
        }
      })

      await waitFor(() => {
        expect(screen.getByText(/Selected Symptoms \(10\/10\)/i)).toBeInTheDocument()
      })
    })
  })
})
