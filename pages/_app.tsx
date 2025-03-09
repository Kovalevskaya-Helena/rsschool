import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { wrapper } from 'src/redux/store';
import { ThemeProvider } from 'src/helpers/contexts';
import { ErrorBoundary } from 'src/components/ErrorBoundary';
import '../styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <Component {...props} />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
