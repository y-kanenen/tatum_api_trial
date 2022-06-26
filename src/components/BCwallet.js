import React, { useState, useEffect } from 'react';
//import axios from 'axios';

const BCwallet = () => {

    //const [extpubkey, setExtPubKey] = useState('');
    //const [privkey, setPrivKey] = useState('');
    
    const [keys, setKeys] = useState({
        private: '',
        public: '',
    });

    

    const createKeys = async() => {
        //const query = new URLSearchParams({mnemonic: 'string'}).toString();
        const resp = await fetch(
            //`https://api-us-west1.tatum.io/v3/ethereum/wallet?${query}`,
            `https://api-us-west1.tatum.io/v3/ethereum/wallet`,
            {
                method: 'GET',
                headers: {
                    'x-testnet-type': 'ethereum-ropsten',
                    'x-api-key': '4845ff3d-6595-4651-a58f-48dd1d68dc0c',
                }
            }
        );
        const data = await resp.text();

        console.log(resp);
        console.log(JSON.parse(data).mnemonic);
        console.log(JSON.parse(data).xpub);

        // Extented Public Key
        const xpub = JSON.parse(data).xpub
        const index = '1';
        const resp2 = await fetch(
            `https://api-us-west1.tatum.io/v3/ethereum/address/${xpub}/${index}`,
            {
                method: 'GET',
                headers: {
                    'x-testnet-type': 'ethereum-ropsten',
                    'x-api-key': '4845ff3d-6595-4651-a58f-48dd1d68dc0c'
                }
            }
        );

        const ExtPubKeyJSON = await resp2.text();
        console.log(JSON.parse(ExtPubKeyJSON).address);
        

        //Private key

        const resp3 = await fetch(
            `https://api-us-west1.tatum.io/v3/ethereum/wallet/priv`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-testnet-type': 'ethereum-ropsten',
                'x-api-key': '4845ff3d-6595-4651-a58f-48dd1d68dc0c'
              },
              body: JSON.stringify({
                index: 0,
                mnemonic: JSON.parse(data).mnemonic
              })
            }
          );
          
          const PrivKey = await resp3.json();
          console.log(PrivKey.key);

          //setExtPubKey(JSON.parse(ExtPubKeyJSON).address);
          //setPrivKey(PrivKey.key);
          setKeys({
              ...keys,
              private: PrivKey.key,
              public: JSON.parse(ExtPubKeyJSON).address
          })

    }

    useEffect(() => {
        //console.log(extpubkey)
        //console.log(privkey)
        console.log(keys.private)
        console.log(keys.public)
    }, [keys]);

    const mintNFT = async() => {

        const resp = await fetch(
            `https://api-us-west1.tatum.io/v3/nft/deploy`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-testnet-type': 'ethereum-ropsten',
                'x-api-key': '4845ff3d-6595-4651-a58f-48dd1d68dc0c'
              },
              body: JSON.stringify({
                chain: 'ETH',
                name: 'My ERC721',
                provenance: false,
                cashback: false,
                publicMint: true,
                symbol: 'ERC_SYMBOL',
                index: 0,
                signatureId: '26d3883e-4e17-48b3-a0ee-09a3e484ac83',
                nonce: 0,
                fee: {
                  gasLimit: '40000',
                  gasPrice: '20'
                }
              })
            }
        );
          
        const data = await resp.json();
        console.log(data);

        
    };

    
    return (
        <div>
            <button onClick={createKeys}>
                Create Keys
            </button>

            <br />
            <button onClick={mintNFT}>
                Mint
            </button>
        </div>
    )
}

export default BCwallet
