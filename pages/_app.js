import Layout from '@/components/layout/layout'
import '../styles/globals.css'
import { FilterProvider } from '../components/search-functionality/filterContext';

export default function App({ Component, pageProps }) {

  return (
    <FilterProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </FilterProvider>
  )
}
