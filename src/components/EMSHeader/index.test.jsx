import { render } from "@testing-library/react";
import EMSHeader from "./index";

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('EMSHeader testing', () => {
    const initialState = { output: 10 };
    const mockStore = configureStore();
    let store;

    it('Shows "Employee Management System"', () => {
        store = mockStore(initialState);
        const Dom = render(
            <Provider store={store}>
                <EMSHeader/>
            </Provider>
        );
        const domEle = Dom.getByText("Employee Management System");
        expect(domEle).toBeInTheDocument();
    });
});