import { ethers } from 'ethers';
import React, {useEffect, useState} from 'react';

const MetaMaskWrapper = ({children}) => {
    const [account, setAccount] = useState("");

    const connectWallet = async () => {
        if (window.ethereum){
            const {ethereum } = window;

            /// Triggers the on accounts changed
            await ethereum.request({ method: "eth_requestAccounts" });
            // const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            // setAccount(accounts[0]);
        }
    }

    

    const checkAccount= (accounts) => {
        console.log(accounts[0]);
        if(accounts.length != 0){
            setAccount(accounts[0]);
        }
    }

    const initAccount = async () => {
        if(!account){
            const accounts = await window.ethereum.request({ method: "eth_accounts" })
            checkAccount(accounts);
        }
    }

    const checkChain = (val) => {
        if(val !== '0x4'){
            setAccount("");
        } else {
            initAccount();
        }
    };
   
    useEffect(() => {
        if(window.ethereum){
            initAccount();

            window.ethereum.on('chainChanged', checkChain);
            window.ethereum.on('accountsChanged', checkAccount);
        }

        return () => {
            if(window.ethereum){
                window.ethereum.removeListener('chainChanged', checkChain);
            window.ethereum.removeListener('accountsChanged', checkAccount);

            }
        }
    }, [])

    if(account){
        return (<>{children}</>)
    } else {
        return <div className='bg-black w-screen h-screen flex'><button className='btn bg-white' onClick={connectWallet}>Connect Wallet</button></div>
    }

}

export default MetaMaskWrapper;