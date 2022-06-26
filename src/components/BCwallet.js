//import React, { useState, useEffect } from 'react';
import React from 'react';
//import axios from 'axios';

const BCwallet = () => {

    //const [mnemonic, setMnemonic] = useState('');
    //const [xpub, setXpubc] = useState('');

    

    const post2 = async() => {
        const query = new URLSearchParams({mnemonic: 'string'}).toString();
        const resp = await fetch(
            `https://api-us-west1.tatum.io/v3/ethereum/wallet?${query}`,
            {
                method: 'GET',
                headers: {
                    'x-testnet-type': 'ethereum-ropsten',
                    'x-api-key': '4845ff3d-6595-4651-a58f-48dd1d68dc0c',
                }
            }
        );
        const data = await resp.text();
        console.log(query);
        console.log(resp);
        console.log(JSON.parse(data).mnemonic);
        console.log(JSON.parse(data).xpub);

        const xpub = JSON.parse(data).xpub
        const index = '1';
        const resp2 = await fetch(
            `https://api-eu1.tatum.io/v3/ethereum/address/${xpub}/${index}`,
            {
                method: 'GET',
                headers: {
                    'x-testnet-type': 'ethereum-ropsten',
                    'x-api-key': '4845ff3d-6595-4651-a58f-48dd1d68dc0c'
                }
            }
        );

        const ExtPubKey = await resp2.text();
        console.log(JSON.parse(ExtPubKey).address);
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
