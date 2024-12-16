import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!message) return;

        setLoading(true);
        try {
            const res = await axios.post('http://localhost:3001/api/chat', { message });
            const chatResponse = res.data.choices[0]?.message?.content || 'No response';
            setResponse(chatResponse);
        } catch (err) {
            console.error(err);
            setResponse('Error communicating with the server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <h1>Internal ChatGPT Assistant</h1>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                rows="4"
                cols="50"
            />
            <br />
            <button onClick={sendMessage} disabled={loading}>
                {loading ? 'Sending...' : 'Send'}
            </button>
            <div className="response">
                <h2>Response:</h2>
                <p>{response}</p>
            </div>
        </div>
    );
};

export default App;
