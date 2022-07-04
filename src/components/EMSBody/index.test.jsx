import { render } from "@testing-library/react";
import EMSBody from "./index";

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { report_data, users } from "../../test-data";

describe('EMSHeader testing', () => {
    const initialState = { role: users[0].role, reports: report_data.list };
    const mockStore = configureStore();
    let store;

    it('Shows "Brian"', () => {
        store = mockStore(initialState);
        const Dom = render(
            <Provider store={store}>
                <EMSBody/>
            </Provider>
        );
        const domEle = Dom.getByText("Brian");
        expect(domEle).toBeInTheDocument();
    });
});