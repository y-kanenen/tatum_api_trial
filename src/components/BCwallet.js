//import React, { useState, useEffect } from 'react';
import React from 'react';
//import axios from 'axios';

const BCwallet = () => {

    //const [mnemonic, setMnemonic] = useState('');
    //const [xpub, setXpubc] = useState('');

    

    const post2 = async() => {
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
          
          const PrivKeyJSON = await resp3.json();
          console.log(JSON.parse(PrivKeyJSON).key);
    }

    
    return (
        <div>
            <button onClick={post2}>
                Enable
            </button>
        </div>
    )
}

export default BCwallet
