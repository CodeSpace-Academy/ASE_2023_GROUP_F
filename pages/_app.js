import Layout from '@/components/layout/layout'
import '../styles/globals.css'
import { FilterProvider } from '../storage/filterContext';

export default function App({ Component, pageProps }) {

  return (
    <FilterProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </FilterProvider>
  )
}
