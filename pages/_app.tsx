import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import { wrapper } from '../pages/redux/store';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { NextUIProvider } from '@nextui-org/react';
//import 'bootstrap/dist/css/bootstrap.css';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <>
    <NextUIProvider>
      <Component {...pageProps} />
     <ToastContainer />
    </NextUIProvider>
    </>
  )
}
