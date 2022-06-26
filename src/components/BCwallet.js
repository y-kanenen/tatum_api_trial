//import React, { useState, useEffect } from 'react';
import React from 'react';
//import axios from 'axios';

const BCwallet = () => {

    //const [mnemonic, setMnemonic] = useState('');
    //const [xpub, setXpubc] = useState('');

    

    const post2 = async() => {
        const query = new URLSearchParams({mnemonic: 'string'}).toString();
        const resp = await fetch(
        `https://api-us-west1.tatum.io/v3/bitcoin/wallet?${query}`,
        {
            method: 'GET',
            headers: {
                'x-api-key': '4845ff3d-6595-4651-a58f-48dd1d68dc0c',
            }
        }
        );
        const data = await resp.text();
        console.log(data);
        console.log(data.xpub);

        //const xpub = 'tpubDE2DkRkiJuCNhXX7pjGp9q2MNxMDJhtyPAq6Jqz371KDTBmE7QJtkUm9Qd8XXSwgSH61BFyJt3Z6hcfUkTy6zNkYkPrmQsBkmcFb8HvwEoJ';
        const xpub = data.xpub
        const index = '1';
        const resp2 = await fetch(
        `https://api-us-west1.tatum.io/v3/bitcoin/address/${xpub}/${index}`,
        {
            method: 'GET',
            headers: {
            'x-api-key': '4845ff3d-6595-4651-a58f-48dd1d68dc0c'
            }
        }
        );

        const data2 = await resp2.text();
        console.log(data2);
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
