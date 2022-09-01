import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';

const MetaMaskWrapper = ({ chainId, chainName, chainRpcUrls, children }) => {
    const [account, setAccount] = useState("");

    const connectWallet = async () => {
        if (window.ethereum) {
            const { ethereum } = window;
            await requestChain();
            /// Triggers the on accounts changed
            await ethereum.request({ method: "eth_requestAccounts" });
            // const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            // setAccount(accounts[0]);
        }
    }



    const checkAccount = (accounts) => {
        console.log(accounts[0]);
        if (accounts.length != 0) {
            // console.log(accounts[0])
            setAccount(accounts[0]);
        }
    }

    const initAccount = async () => {
        const { ethereum } = window;
        if (!account) {
            const accounts = await ethereum.request({ method: "eth_accounts" })
            checkAccount(accounts);
        }
    }

    const checkChain = (val) => {
        if (val !== chainId) {
            setAccount("");
        } else {
            initAccount();
        }
    };

    const requestChain = async () => {
        const { ethereum } = window;
        try {
            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: chainId }],
            });
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                try {
                    await ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: chainId,
                                chainName: chainName,
                                rpcUrls: chainRpcUrls 
                            },
                        ],
                    });
                } catch (addError) {
                   console.log(addError);
                }
            }
        }
    }

    // const init = async () => {  
    //     await requestChain();
    //     await initAccount();

    // }

    useEffect(() => {
        if (window.ethereum) {
            initAccount();

            window.ethereum.on('chainChanged', checkChain);
            window.ethereum.on('accountsChanged', checkAccount);
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('chainChanged', checkChain);
                window.ethereum.removeListener('accountsChanged', checkAccount);

            }
        }
    }, [])

    if (account) {
        return (<>{children}</>)
    } else {
        return <div className='bg-black w-screen h-screen flex'><button className='btn bg-white' onClick={connectWallet}>Connect Wallet</button></div>
    }

}

export default MetaMaskWrapper;