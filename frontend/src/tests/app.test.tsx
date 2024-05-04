import { expect } from 'vitest'
import App from 'app';
import userEvent from "@testing-library/user-event";
import { render, screen } from '@testing-library/react'


describe('Renders App', () => {

    it('renders the App component', async () => {
        render(App)
        const title = await screen.findByText("OneAI")
        expect(title).toBeInTheDocument()
    })

    it('Click on sign in link', async () => {
        render(App)
        const signInLink = screen.getByText("Sign in")
        await userEvent.click(signInLink);
        const emailInput = screen.getByPlaceholderText('Email')
        expect(emailInput).toBeEmptyDOMElement()
    })
})