import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button } from '../components/button/Button';

const TEST_GIFS = [
    "https://media.giphy.com/media/gqaLc5iPzDUsZ7CD7a/giphy.gif",
    "https://media.giphy.com/media/l3q2uMTpuoNwv6uDm/giphy.gif",
    "https://media.giphy.com/media/lMsT2f47tDxFMYdJMC/giphy.gif",
]

export default function GifThePin (){
    const [phantomWalletAddress, setPhantomWalletAddress] = useState(null);
    const checkIfPhantomIsConnected = async () => {
      
        try {
            const { solana } = window;
            if (solana) {
                if (solana.isPhantom) {
                    console.log("Phantom wallet found");

                    const response = await solana.connect({ onlyIfTrusted: true });

                    console.log('Connected with Public Key: ', response.publicKey.toString())

                    setPhantomWalletAddress(response.publicKey.toString());


                }
            } else {
                alert('Solana object not found! Get a Phantom Wallet');
            }
        } catch (error) {
            console.error(error);
        }
    }

    const connectPhantomWallet = async () => {
        const { solana } = window;

        if(solana) {
            const response = await solana.connect();
            console.log('Connected with Public Key: ', response.publicKey.toString())
            setPhantomWalletAddress(response.publicKey.toString());

        }
    }

    const renderConnectedContainer = () => (
        <div className="grid grid-cols-3 gap-24 container items-center">
            {TEST_GIFS.map((gif, index) => (
                <div className="border-4 border-black drop-frame" key={gif}>
                    <img src={gif} alt="gif" className='block'/>
                    {/* <Image src={gif} layout="fill" style={{height:"140px", objectFit:"contain", height:"auto"}} objectFit='contain' /> */}
                </div>
            ))}
        </div>
    )

    const renderNotConnectedContainer = () => (
        <div className='flex flex-col justify-center items-center'>
                    <Button onClick={connectPhantomWallet} label="Connect Phantom Wallet"/>
                </div>
    )



    useEffect(() => {
        const onLoad = async () => {
            await checkIfPhantomIsConnected();
        }
        onLoad();
    }, []);

    return (
        <div className='app'>
            <div className='app-container'>
                <div className='app-header'>Header</div>
                {phantomWalletAddress ? renderConnectedContainer() : renderNotConnectedContainer()}
                <div className='app-footer'>Footer</div>
            </div>
        </div>
        );
}