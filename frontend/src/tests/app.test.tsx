import App from 'app';
import userEvent from "@testing-library/user-event";
import { render, screen } from '@testing-library/react'


describe('Renders App', () => {

    it('renders the App component', async () => {
        render(App)
        const title = screen.getByText("Platform")
        expect(title).toBeInTheDocument()
    })

    it('Click on email', async () => {
        render(App)
        const signInLink = screen.getByText("help@games.com");
        await userEvent.click(signInLink);
        const searchInput = screen.getByPlaceholderText('Search...')
        expect(searchInput).toBeEmptyDOMElement()
    })
   
})