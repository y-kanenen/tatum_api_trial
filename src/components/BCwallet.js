//import React, { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';

const BCwallet = () => {

    //const [mnemonic, setMnemonic] = useState('');
    //const [xpub, setXpubc] = useState('');

    const post = async() => {
        const res = await axios.get({
            baseURL: 'https://api-eu1.tatum.io/v3',
            url: '/bitcoin/wallet',   
            headers: {
                'accept': 'application/json',
                'x-api-key': '4845ff3d-6595-4651-a58f-48dd1d68dc0c',
            },
        })
        console.log(res)
    };

    return (
        <div>
            <button onClick={post}>
                Enable
            </button>
        </div>
    )
}

export default BCwallet
