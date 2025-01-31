/**
 * @author Kaveen Sithija
 */
import React from 'react';
import Navigation from './src/navigation/Navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';

import Spinner from './src/components/spinner/Spinner';
import {store} from './src/redux/Store';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigation />
        <Spinner />
      </SafeAreaProvider>
    </Provider>
  );
};
export default App;
