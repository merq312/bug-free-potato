import {render} from "@testing-library/react";
import HeaderComponent from "./Header.component";
import {Provider} from "react-redux";
import {store} from "../../features/store";

describe("Header Component", () => {
  test("renders correctly", () => {
    const {asFragment} = render(
      <Provider store={store}>
        <HeaderComponent/>
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
