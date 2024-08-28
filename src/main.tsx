import {createRoot} from 'react-dom/client'
import './index.css'

import {Provider} from 'react-redux';
import App from './App.tsx'

import store from './redux/store';

const root = createRoot(
    document.getElementById('root') as HTMLElement
);


root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);