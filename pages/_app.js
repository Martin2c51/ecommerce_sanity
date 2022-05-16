import React, {useEffect} from 'react';
import {useRouter, Router} from 'next/router';
import { Toaster } from 'react-hot-toast';

import { Layout } from '../components';
import '../styles/globals.css';
import { StateContext } from '../context/StateContext';


function MyApp({ Component, pageProps }) {
  const router = useRouter();
    const pageView = (url, title) => {
        window && window.dataLayer && window.dataLayer.push({
            'event': 'virtualPageview',
            'virtualPageURL': url,
            'virtualPageTitle': title,
            'pagina2':"Hola Manu"
        });
    }
    useEffect(() => {
        pageView(router.pathname, document.title);
        const handleRouteChange = (url) => {
            pageView(url, document.title);
        };
        Router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            Router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, []);
  return (
    <StateContext>
      {/* <!-- Google Tag Manager (noscript) --> */}
      <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TSS5FSL"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}></noscript>
      {/* <!-- End Google Tag Manager (noscript) --> */}
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}

export default MyApp