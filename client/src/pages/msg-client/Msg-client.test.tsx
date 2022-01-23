import { render } from '@testing-library/react'
import MsgClientPage from './Msg-client.page'
import { Provider } from 'react-redux'
import { store } from '../../features/store'

describe('Message Client', () => {
  test('renders correctly', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MsgClientPage />
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
