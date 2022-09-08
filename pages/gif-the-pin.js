import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button } from '../components/button/Button';

const TEST_GIFS = [
    "https://media.giphy.com/media/SDogLD4FOZMM8/giphy.gif",
    "https://media.giphy.com/media/gqaLc5iPzDUsZ7CD7a/giphy.gif",
    "https://media.giphy.com/media/l3q2uMTpuoNwv6uDm/giphy.gif",
    "https://media.giphy.com/media/lMsT2f47tDxFMYdJMC/giphy.gif",
    "https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif",
]

export default function GifThePin() {
    const [phantomWalletAddress, setPhantomWalletAddress] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [gifList, setGifList] = useState([]);
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

        if (solana) {
            const response = await solana.connect();
            console.log('Connected with Public Key: ', response.publicKey.toString())
            setPhantomWalletAddress(response.publicKey.toString());

        }
    }

    const onInputChange = (e) => {
        const {value} = event.target;
        setInputValue(value);
    }

    const sendGif = async () => {
        if (inputValue.length > 0) {
            console.log('Gif link:', inputValue);
            setGifList([...gifList, inputValue]);
            setInputValue("");
        } else {
            alert('Please enter a gif link');
        }
    }

    const renderConnectedContainer = () => (
        <div className='container mx-auto flex flex-col'>
            <form onSubmit={(e) => {
                e.preventDefault();
                sendGif();
            }}>
                <input type="text" value={inputValue} onChange={onInputChange} placeholder='Enter gif link' className='drop-frame px-4 py-2 framed bg-surface mx-4'/>
                <Button type='submit' label='Submit'/>
            </form>
            <div className="grid grid-cols-3 gap-24 place-items-center object-contain">
                {gifList.map((gif, index) => (
                    <div className="border-4 border-black drop-frame" key={gif}>
                        <img src={gif} alt="gif" className='object-contain' />
                        {/* <Image src={gif} layout="fill" style={{height:"140px", objectFit:"contain", height:"auto"}} objectFit='contain' /> */}
                    </div>
                ))}
            </div>
        </div>
    )

    const renderNotConnectedContainer = () => (
        <div className='flex flex-col justify-center items-center'>
            <Button onClick={connectPhantomWallet} label="Connect Phantom Wallet" />
        </div>
    )

   

    useEffect(() => {
        if(phantomWalletAddress) {
            console.log('Fetching Gif List...');
            setGifList(TEST_GIFS);
            
        }
    }, [phantomWalletAddress]);



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
                <div className='my-12'>{phantomWalletAddress ? renderConnectedContainer() : renderNotConnectedContainer()}</div>
                <div className='app-footer'>Footer</div>
            </div>
        </div>
    );
}