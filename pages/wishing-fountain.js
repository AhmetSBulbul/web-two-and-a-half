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
                <button onClick={connectWallet}>Connect Wallet</button>
            </main>
        </div>
    )
}