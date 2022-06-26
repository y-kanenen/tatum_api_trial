//import React, { useState, useEffect } from 'react';
import React from 'react';
//import axios from 'axios';

const BCwallet = () => {

    //const [mnemonic, setMnemonic] = useState('');
    //const [xpub, setXpubc] = useState('');



    const query = new URLSearchParams({mnemonic: 'string'}).toString();

    const post2 = async() => {
        const resp = await fetch(
        `https://api-us-west1.tatum.io/v3/bitcoin/wallet?${query}`,
        {
            method: 'GET',
            headers: {
            'x-api-key': '4845ff3d-6595-4651-a58f-48dd1d68dc0c'
            }
        }
        );
        const data = await resp.text();
        console.log(data);
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
