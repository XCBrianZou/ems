import React from 'react';
import { render } from '@testing-library/react';

import App from './App';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { report_data, users } from './test-data';

describe('Testing app launch', () => {
    const initialState = { role: users[0].role, reports: report_data.list };
    const mockStore = configureStore();
    let store;

    it('Shows "Employee Management System"', () => {
        store = mockStore(initialState);
        const { getByText } = render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        expect(getByText('Employee Management System')).not.toBeNull();
    });
});