import { Provider } from 'react-redux';
import { LandingPage } from './job/landing-page';
import { store } from './state/store';

function App() {
  return (
    <>
      <Provider store={store}>
        <LandingPage />
      </Provider>
    </>
  );
}

export default App;
