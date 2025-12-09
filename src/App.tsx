// import DropinContextProvider from './context/DropinContextProvider';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ToastProvider } from './context/ToastContext';
import { CommonProvider } from './context/CommonContextProvider';
import DropIn from './pages/DropIn';

function App() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <CommonProvider>
          <DropIn />
        </CommonProvider>
      </ToastProvider>
    </Provider>
  );
}

export default App;
