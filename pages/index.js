import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
// import DevSlug from '../components/Common/DevSlug'
// import styles from '../styles/Home.module.css'
import myHeadSrc from '../../assets/myHead.png'
// import {SolidityLogo, JavascriptLogo} from '../components/Common/LogoSvgs'
// import solidityLogo from "../../assets/solidity.svg";
import Slug from '../components/slug/Slug'

export default function Home(){
  return (
    <div className='container mx-auto'>
      <Head>
        <title>Web½</title>
        <meta name='description' content='Simple Web3 Projects'/>
        <link rel='icon' href='/favicon.ico'/>
      </Head>
      <main>
        <header className='navbar'>
          <div className='justify-self-start'>
            <Slug/>
          </div>
          <div className='justify-self-center text-2xl'>
            <h3>Web2½</h3>
          </div>
          <div className='justify-self-end'>
            <h3>Menu</h3>
          </div>
        </header>
        <div className='card flex flex-col justify-items-center content-center border-2 border-black px-8 py-12 space-y-12 bg-surface text-highlight'>
          <div className='w-1/5 mx-auto'>
          <Image src={myHeadSrc} className='object-contain'/>
          </div>
          <h2 className='text-3xl text-center font-bold'>Simple Web3 Projects</h2>
        </div>
      </main>
      <section className='flex flex-col space-y-8 my-8'>
        <h2 className='text-5xl font-extrabold text-transparent bg-clip-text fancy-gradient'>Projects</h2>
        <div className='grid grid-cols-3 gap-4'>
          <Link href='/wishing-fountain'>
            <a className='group'>
            <div className='card px-4 py-4 ring-2 ring-orange-300 group-hover:ring-orange-400 '>
              <div className='flex items-center space-x-2'>
                <span className='text-4xl filter contrast-75'>✨</span>
              <div className='flex flex-col items-start'>
                <h3 className='text-xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-500'> Wishing Fountain</h3>
                <p className='text-sm text-gray-500'>Drop a coin to make wishes come true!</p>
            </div>
        </div> 
        </div>
            </a>

          </Link>

        
        </div>
      </section>
    </div>
  )
}

// export default function Home() {
//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>Create Next App</title>
//         <meta name="description" content="Generated by create next app" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className={styles.main}>
//         <h1 className={styles.title}>
//           Welcome to <a href="https://nextjs.org">Next.js!</a>
//         </h1>

//         <p className={styles.description}>
//           Get started by editing{' '}
//           <code className={styles.code}>pages/index.js</code>
//         </p>

//         <div className={styles.grid}>
//           <a href="https://nextjs.org/docs" className={styles.card}>
//             <h2>Documentation &rarr;</h2>
//             <p>Find in-depth information about Next.js features and API.</p>
//           </a>

//           <a href="https://nextjs.org/learn" className={styles.card}>
//             <h2>Learn &rarr;</h2>
//             <p>Learn about Next.js in an interactive course with quizzes!</p>
//           </a>

//           <a
//             href="https://github.com/vercel/next.js/tree/canary/examples"
//             className={styles.card}
//           >
//             <h2>Examples &rarr;</h2>
//             <p>Discover and deploy boilerplate example Next.js projects.</p>
//           </a>

//           <a
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             className={styles.card}
//           >
//             <h2>Deploy &rarr;</h2>
//             <p>
//               Instantly deploy your Next.js site to a public URL with Vercel.
//             </p>
//           </a>
//         </div>
//       </main>

//       <footer className={styles.footer}>
//         <a
//           href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Powered by{' '}
//           <span className={styles.logo}>
//             <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
//           </span>
//         </a>
//       </footer>
//     </div>
//   )
// }
