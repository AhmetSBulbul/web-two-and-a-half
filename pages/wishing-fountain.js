import Head from 'next/head'

export default function WishingFountain(){
    return (
        <div className='container mx-auto'>
            <Head>
            <title>Web2½ | Wishing Fountain</title>
            <meta name='description' content='Drop a coin to make wishes come true'/>
            <link rel='icon' href='/favicon.ico'/>
            </Head>
            <main>
            <header className='navbar'>
          <div className='slug'>
            <h3>@AhmetSBulbul</h3>
          </div>
          <div className='justify-self-center text-2xl'>
            <h3>Web2½</h3>
          </div>
          <div className='justify-self-end'>
            <h3>Menu</h3>
          </div>
        </header>
            </main>
        </div>
    )
}