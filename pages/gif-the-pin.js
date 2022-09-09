import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button } from '../components/button/Button';
import idl from '../utils/gif-the-pin-idl.json';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Program, AnchorProvider, web3 } from '@project-serum/anchor';
import kp from '../utils/anchor-keypair.json';

const TEST_GIFS = [
    "https://media.giphy.com/media/SDogLD4FOZMM8/giphy.gif",
    "https://media.giphy.com/media/gqaLc5iPzDUsZ7CD7a/giphy.gif",
    "https://media.giphy.com/media/l3q2uMTpuoNwv6uDm/giphy.gif",
    "https://media.giphy.com/media/lMsT2f47tDxFMYdJMC/giphy.gif",
    "https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif",
]

const { SystemProgram, Keypair } = web3;

// let baseAccount = Keypair.generate();
const arr = Object.values(kp._keypair.secretKey)
const secret = new Uint8Array(arr)
const baseAccount = web3.Keypair.fromSecretKey(secret)

const programID = new PublicKey(idl.metadata.address);

const network = clusterApiUrl('devnet');

const opts = {
    preflightCommitment: "processed"
}

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
        const { value } = event.target;
        setInputValue(value);
    }

    const getProvider = () => {
        console.log("ping 1")
        
            const connection = new Connection(network, opts.preflightCommitment);
        const provider = new AnchorProvider(
          connection, window.solana, opts.preflightCommitment,
        );
        console.log("ping 2")
          return provider;
     
      }

    const createGifAccount = async () => {
       
            try {
                const provider = getProvider();
                const program = new Program(idl, programID, provider);
                console.log('ping');
    
                await program.rpc.startStuffOff({
                    accounts: {
                        baseAccount: baseAccount.publicKey,
                        user: provider.wallet.publicKey,
                        systemProgram: SystemProgram.programId,
                    },
                    signers: [baseAccount]
                });
                console.log("Created a new Base Account w/ address: ", baseAccount.publicKey.toString());
                await getGifList();
            } catch (error) {
                console.log("Error creating BaseAccount account:", error);
            }
    }

    const getGifList = async () => {
        try {
            console.log("ping 0")
            const provider = getProvider();
            console.log("ping 3")
            const program = new Program(idl, programID, provider);
            const account = await program.account.baseAccount.fetch(baseAccount.publicKey);

            console.log("Got the account", account);
            setGifList(account.gifList)
        } catch (error) {
            console.log("Error in getGifList: ", error)
            setGifList(null);
        }
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

    const renderConnectedContainer = () => {
        if (gifList === null) {
            return (
                <div className='flex flex-col justify-center items-center'>
                    <Button onClick={createGifAccount} label="Do One-Time Initialization For GIF Program Account" />
                </div>
            )
        } else {
            return (
                <div className='container mx-auto flex flex-col'>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        sendGif();
                    }}>
                        <input type="text" value={inputValue} onChange={onInputChange} placeholder='Enter gif link' className='drop-frame px-4 py-2 framed bg-surface mx-4' />
                        <Button type='submit' label='Submit' />
                    </form>
                    <div className="grid grid-cols-3 gap-24 place-items-center object-contain">
                        {gifList.map((item, index) => (
                            <div className="border-4 border-black drop-frame" key={index}>
                                <img src={item.gifLink} alt="gif" className='object-contain' />
                                {/* <Image src={gif} layout="fill" style={{height:"140px", objectFit:"contain", height:"auto"}} objectFit='contain' /> */}
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
    }

    const renderNotConnectedContainer = () => (
        <div className='flex flex-col justify-center items-center'>
            <Button onClick={connectPhantomWallet} label="Connect Phantom Wallet" />
        </div>
    )



    useEffect(() => {
        if (phantomWalletAddress) {
            console.log('Fetching Gif List...');
            //setGifList(TEST_GIFS);
            getGifList();

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
