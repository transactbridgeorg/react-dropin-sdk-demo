import DropinContextProvider from './context/DropinContextProvider';
import { ToastProvider } from './context/ToastContext';
import DropIn from './pages/DropIn';

function App() {
  return (
    <ToastProvider>
      <DropinContextProvider>
        <DropIn />
      </DropinContextProvider>
    </ToastProvider>
  );
}

export default App;
