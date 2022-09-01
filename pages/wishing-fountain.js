import Head from 'next/head'
import DevSlug from '../components/Common/DevSlug'
import Navbar from '../components/Common/Navbar'
import { useEffect, useRef, useState } from "react";
import abi from "../utils/WishingPortal.json";
import { ethers } from 'ethers';
import WishForm from '../components/WishingFountain/WishForm';
import MetaMaskWrapper from '../components/MetaMask/MetaMaskWrapper';

export default function WishingFountain() {
    // const [walletConnected, setWalletConnected] = useState(false);
    // const [totalWishCount, setTotalWishCount] = useState(0);
    const [allWishes, setAllWishes] = useState([]);
    const [currentAccount, setCurrentAccount] = useState("");
    const contractAddress = "0xE1436940c82e18CF454678E7f898DeaD51F4Bc64";
    const contractABI = abi.abi;
    const [message, setMessage] = useState("");
    const [count, setCount] = useState(0);
    // const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

    // useEffect(() => {
    //     console.log(isMetaMaskInstalled);
    //     if(window.ethereum){
    //         console.log(window.ethereum);
    //         setIsMetaMaskInstalled(true);
    //     }
    // }, [isMetaMaskInstalled])
    // const web3ModalRef = useRef();

    useEffect(() => {
        let wishContractPortal;

        const onNewWish = (from, timestamp, message) => {
            console.log("New Wish", from, timestamp, message);
            setAllWishes(prevState => [
                ...prevState,
                {
                    address: from,
                    timestamp: new Date(timestamp * 1000),
                    message: message,
                },
            ]);
        }

        if(window.ethereum){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            wishContractPortal = new ethers.Contract(contractAddress, contractABI, signer);
            wishContractPortal.on("NewWish", onNewWish);
        }
        
        return () => {
            if (wishContractPortal) {
              wishContractPortal.off("NewWish", onNewWish);
            }
          };
        }, []);

    // const checkIfWalletIsConnected = async () => {
    //     try {
    //         const { ethereum } = window;

    //         if (!ethereum) {
    //             Window.alert("Need metamask");
    //             return;
    //         } else {
    //             console.log("There is metamas")
    //         }

    //         const accounts = await ethereum.request({ method: "eth_accounts" });

    //         if (accounts.length !== 0) {
    //             console.log(accounts.length);
    //             const _account = accounts[0];
    //             console.log(_account.getBalance);
    //             console.log("Found an authorized account:", _account);
    //             setCurrentAccount(_account)
    //         } else {
    //             console.log("No auth acc found");
    //         }
    //     } catch (err) {
    //         console.log("Error on check accounts:", err);
    //     }


    // }

    // const connectWallet = async () => {
    //     try {
    //         const { ethereum } = window;

    //         if (!ethereum) {
    //             alert("Got Metamask");
    //             return;
    //         }

    //         const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    //         const _account = accounts[0];
    //         console.log("Connected: ", _account);
    //         setCurrentAccount(_account);
    //     } catch (err) {
    //         console.log("Account cant connect: ", err);
    //     }
    // }

    const getAllWishes = async () => {
        try {

            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const wishPortalContract = new ethers.Contract(contractAddress, contractABI, signer);

                const wishes = await wishPortalContract.getWishList();

                console.log("wishes : \n", wishes);


                let _tempList = [];

                wishes.forEach(wish => {
                    _tempList.push({
                        address: wish.wisher,
                        timestamp: new Date(wish.timestamp * 1000),
                        message: wish.wish
                    });
                });

                console.log(_tempList);
                wishPortalContract.on('NewWish', (data) => console.log("Eventten geldi: " + data))

                setAllWishes(_tempList);
            }

        } catch (err) {
            console.log("eeror while getting all wishes: ", err);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        makeWish();
    }

    const makeWish = async () => {

        try {
            const { ethereum } = window;

            if (ethereum) {
                console.log(message);
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const wishPortalContract = new ethers.Contract(contractAddress, contractABI, signer);
                wishPortalContract.on('NewWinner', (data) => console.log("Winner hee: " + data))






                const wishTxn = await wishPortalContract.newWish(message, {value: ethers.utils.parseEther("0.0001"), gasLimit: 300000});
                console.log("Mining... :", wishTxn.hash);

                await wishTxn.wait();
                console.log("Mined -- ", wishTxn.hash);
                

                getWishCount()


                // count = await wishPortalContract.getTotalWishes();
                // console.log("Total wish: ", count.toNumber());
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (err) {
            console.log("error on getting count: ", err);
        }
    }

    const getWishCount = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const wishPortalContract = new ethers.Contract(contractAddress, contractABI, signer);
                let avatarUrl = await provider.getNetwork();
                console.log(avatarUrl);
                // console.log(provider.resolveName);

                let count = await wishPortalContract.getBalance();
                console.log("Total wish: ", ethers.utils.formatEther(count));
                setCount(ethers.utils.formatEther(count));

                // count = await wishPortalContract.getTotalWishes();
                // console.log("Total wish: ", count.toNumber());
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (err) {
            console.log("error on getting count: ", err);
        }
    }

    // useEffect(() => {
    //     checkIfWalletIsConnected();
    //     getWishCount();
    // }, [count])


    return (
        <div className='relative'>
            <Head>
                <title>Web2½ | Wishing Fountain</title>
                <meta name='description' content='Drop a coin to make wishes come true' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
        <MetaMaskWrapper>
            
            <main className='container mx-auto '>
                <Navbar lead="Wishing Fountain"></Navbar>
                <div className='flex flex-col py-12 items-center space-y-4'>
                    <h1 className='text-5xl'>Drop a Coin to Make Wishes Come True!</h1>
                    <p>Make a wish and send it to ethereum world! Count: {count}</p>
                    {/* {!currentAccount && (<button className='btn' onClick={connectWallet}>Connect Wallet</button>)} */}
                    {currentAccount && (<button className='btn' onClick={getAllWishes}>Get Wish Count</button>)}
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="wisher" className='sr-only'>Your Wish...</label>
                        <div className='flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700'>
                            <textarea id="wisher" value={message} onChange={(e) => setMessage(e.target.value)} rows={1} className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Your Wish...'></textarea>
                            <button type='submit' className='inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600'>
                                <svg aria-hidden="true" className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                            </button>
                        </div>
                    </form>
                    {/* <p>Wish Count: {totalWishCount}</p> */}
                </div>
                <div className='flex flex-col space-y-4'>
                    {allWishes.map((wish, index) => {
                        return (
                            <div key={index} className='flex flex-col space-y-2 p-4 border-2 border-black'>
                                <h3>Address: {wish.address}</h3>
                                <p>Time: {wish.timestamp.toString()}</p>
                                <p>Message: {wish.message}</p>
                            </div>
                        )
                    })}
                </div>
            </main>
        
        </MetaMaskWrapper>
        </div>
        
    )
}