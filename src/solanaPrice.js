import React, { useState } from 'react';
import axios from 'axios';
import '../src/style.css'; // Ajusta la ruta según la ubicación del archivo


const CryptoPrice = () => {
    const [symbol, setSymbol] = useState('');
    const [price, setPrice] = useState('Ingrese una criptomoneda y presione Go');

    const fetchPrice = async () => {
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const apiUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}`;
        const url = `${proxyUrl}${apiUrl}`;

        try {
            const response = await axios.get(url, {
                headers: {
                    'X-CMC_PRO_API_KEY': '7da81767-98c5-43d9-9fc8-5e6286bed868',
                    'Content-Type': 'application/json'
                }
            });
            setPrice(`$${response.data.data[symbol].quote.USD.price.toFixed(2)}`);
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
            setPrice('Error al cargar el precio');
        }
    };

    return (
        <div className="form-container">
            <h1>Precio de {symbol.toUpperCase()}</h1>
            <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                placeholder="Ej. BTC, ETH..."
            />
            <button onClick={fetchPrice}>Go</button>
            <p>{price}</p>
        </div>
    );
};

export default CryptoPrice;
