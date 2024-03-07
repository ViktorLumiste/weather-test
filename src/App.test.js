import {act, render, screen, waitFor, within} from '@testing-library/react';
import App from './App';
import WeatherCard from "./components/WeatherCard";
import {createMockServer} from "./createMockServer";
import userEvent from "@testing-library/user-event";

let server;
beforeEach(()=>{
    server = createMockServer()
})
afterEach(()=>{
    server.shutdown()
})

describe('Weather Application tests', () =>{

    it('renders weather application title', () => {
        render(<App />);
        const linkElement = screen.getByText(/Weather Application/i);
        expect(linkElement).toBeInTheDocument();
    });

    it('shows city search results', async () =>{
        render(<App />);

        const input =screen.getByTestId('search-input')
        userEvent.type(input, 'Melbourne')

        const button = screen.getByTestId('search-button')
        userEvent.click(button)

        await waitFor(() =>expect(screen.getAllByText(/Melbourne/i).length).toEqual(5))
        expect(screen.getByText(/-37.8141705, 144.9655616/i)).toBeInTheDocument()
    })

    it('add search result to my weather list', async () =>{
        render(<App />);

        const input = screen.getByTestId('search-input')
        userEvent.type(input, 'Melbourne')

        const button = screen.getByTestId('search-button')
        userEvent.click(button)

        await waitFor (() => expect(screen.getAllByText(/Melbourne/i).length).toEqual(5))


        const selected = screen.getAllByText(/Melbourne/i)[3]
      // eslint-disable-next-line testing-library/no-unnecessary-act
        act(()=>{
          userEvent.click(selected)
        })

        expect(within(screen.getByTestId('my-weather-list')).getByText(/Melbourne/i)).toBeInTheDocument()

        expect(screen.queryByTestId('search-results')).not.toBeInTheDocument()
    })
})

describe ('Weathecard components tests', ()=>{
    it('renders city name', () =>{
        const city = {
            name: 'Melbourne',
            country: 'Australia',
            state: 'Victoria',
            lat:0,
            lon:0
        }
        render(<WeatherCard city={city} />);
        expect(screen.getByText(city.name)).toBeInTheDocument()
        }
    )
    it('renders temperature', async() => {
        const city={
            name: 'Melbourne',
            country: 'Australia',
            state: 'Victoria',
            lat:0,
            lon:0
        }
        render(<WeatherCard city={city}/>)
        await waitFor(() =>expect(screen.getByText(19.02)).toBeInTheDocument());
    })
    it('renders placeholders when temperature is not available', () =>{
        const city={
            name: 'Melbourne',
            country: 'Australia',
            state: 'Victoria',
            lat:0,
            lon:0
        }
        render(<WeatherCard city={city} />)
        expect(screen.getByText('-/-')).toBeInTheDocument()
    })
})
