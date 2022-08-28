import Head from 'next/head'
import DevSlug from '../components/Common/DevSlug'
import Navbar from '../components/Common/Navbar'
import Web3Modal from 'web3modal';
import {provider, Contract} from 'ethers';
import { useEffect, useRef, useState } from "react";

export default function WishingFountain(){
    const [walletConnected, setWalletConnected] = useState(false);
    const web3ModalRef = useRef();

    const getProviderOrSigner = async (needSigner = false) => {
        // Connect to Metamask
        // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
        const provider = await web3ModalRef.current.connect();
        const web3Provider = new providers.Web3Provider(provider);
  
        // If user is not connected to the Rinkeby network, let them know and throw an error
        const { chainId } = await web3Provider.getNetwork();
        if (chainId !== 4) {
          window.alert("Change the network to Rinkeby");
          throw new Error("Change network to Rinkeby");
        }
  
        if (needSigner) {
          const signer = web3Provider.getSigner();
          return signer;
        }
        return web3Provider;
      };

      const connectWallet = async () => {
        try {
          // Get the provider from web3Modal, which in our case is MetaMask
          // When used for the first time, it prompts the user to connect their wallet
          await getProviderOrSigner();
        //   setWalletConnected(true);
  
        //   checkIfAddressInWhitelist();
        //   getNumberOfWhitelisted();
        } catch (err) {
          console.error(err);
        }
      };

    useEffect(() => {
        if(!walletConnected){
            web3ModalRef.current = new Web3Modal({
                network: "rinkeby",
                providerOptions: {},
                disableInjectedProvider: false,
              });

              
        }
    })
    return (
        <div className='container mx-auto'>
            <Head>
            <title>Web2½ | Wishing Fountain</title>
            <meta name='description' content='Drop a coin to make wishes come true'/>
            <link rel='icon' href='/favicon.ico'/>
            </Head>
            <main>
                <Navbar lead="Wishing Fountain"></Navbar>
                <div className='flex flex-col py-12 items-center'>
                    <h1 className='text-5xl'>Drop a Coin to Make Wishes Come True!</h1>
                    <p>Make a wish and send it to ethereum world!</p>
                </div>
                <div className='w-1/3'>
                    <form>
                        <label for="wisher" className='sr-only'>Your Wish...</label>
                        <div className='flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700'>
                            <textarea id="wisher" rows={1} className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Your Wish...'></textarea>
                            <button type='submit' className='inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600'>
                            <svg aria-hidden="true" className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                            </button>
                        </div>
                    </form>
                </div>
                
            </main>
        </div>
    )
}