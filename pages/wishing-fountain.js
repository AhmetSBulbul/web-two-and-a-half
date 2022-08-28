import Head from 'next/head'
import DevSlug from '../components/Common/DevSlug'
import Navbar from '../components/Common/Navbar'

export default function WishingFountain(){
    return (
        <div className='container mx-auto'>
            <Head>
            <title>Web2½ | Wishing Fountain</title>
            <meta name='description' content='Drop a coin to make wishes come true'/>
            <link rel='icon' href='/favicon.ico'/>
            </Head>
            <main>
                <Navbar lead="Wishing Fountain"></Navbar>
            {/* <header className='navbar'>
          <div className='justify-self-start'>
            <DevSlug/>
          </div>
          <div className='justify-self-center text-2xl'>
            <h3>Web2½</h3>
          </div>
          <div className='justify-self-end'>
            <h3>Menu</h3>
          </div>
        </header> */}
            </main>
        </div>
    )
}