import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from './features/store'
import App from './App'

describe('Homepage', () => {
  test('App contains main section', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  test('App containers header', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  test('renders correctly', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
