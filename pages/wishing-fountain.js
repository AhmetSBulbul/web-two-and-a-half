import Head from 'next/head'
import DevSlug from '../components/Common/DevSlug'
import Navbar from '../components/Common/Navbar'
import { useEffect, useRef, useState } from "react";
import abi from "../utils/WishingPortal.json";
import { ethers } from 'ethers';

export default function WishingFountain(){
    // const [walletConnected, setWalletConnected] = useState(false);
    // const [totalWishCount, setTotalWishCount] = useState(0);
    const [currentAccount, setCurrentAccount] = useState("");
    const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
    const contractABI = abi.abi;
    // const web3ModalRef = useRef();

    const checkIfWalletIsConnected = async () => {
        try {
            const {ethereum} = window;

        if(!ethereum){
            Window.alert("Need metamask");
            return;
        } else {
            console.log("There iss: ", ethereum);
        }

        const accounts = await ethereum.request({ method: "eth_accounts" });

        if(accounts.length !== 0) {
            const _account = accounts[0];
            console.log("Found an authorized account:", _account);
            setCurrentAccount(_account)
            } else {
            console.log("No auth acc found");
            }
        } catch(err){
            console.log("Error on check accounts:", err);
        }


    }

    const connectWallet = async () => {
        try {
            const {ethereum} = window;

            if(!ethereum){
                alert("Got Metamask");
                return;
            }

            const accounts = await ethereum.request({ method: "eth_requestAccounts"});
            
            const _account = accounts[0];
            console.log("Connected: ", _account);
            setCurrentAccount(_account);
        } catch(err){
            console.log("Account cant connect: ", err);
        }
    }

    const getWishCount = async () => {
        try {
            const {ethereum} = window;
            
            if(ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const wishPortalContract = new ethers.Contract(contractAddress, contractABI, signer);

                let count = await wishPortalContract.getTotalWishes();
                console.log("Total wish: ", count.toNumber());
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (err) {
            console.log("error on getting count: ", err);
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, [])


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
                    {!currentAccount && (<button onClick={connectWallet}>Connect Wallet</button>)}
                    {currentAccount && (<button className='p-4 border-2 border-black' onClick={getWishCount}>Get Wish Count</button>)}
                    {/* <p>Wish Count: {totalWishCount}</p> */}
                </div>
                <div className='w-1/3'>
                    <form>
                        <label htmlFor="wisher" className='sr-only'>Your Wish...</label>
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