import { useEffect, useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import io from 'socket.io-client';
import Head from 'next/head'


const CodeEditor = () => {
    const [code, setCode] = useState('');
    const [userType, setUserType] = useState('viewer'); // 'writer', 'viewer'
    const [userInput, setUserInput] = useState('');
    const [socket, setSocket] = useState(null);
    const [smiley, setSmiley] = useState('');

    useEffect(() => {
        const newSocket = io('http://localhost:3000');

        newSocket.on('codeChange', (data) => {
            setCode(data.code);
        });

        newSocket.on('smiley', (data) => {
            setSmiley(data.smiley); // Set the received smiley
        });

        newSocket.emit('getConnectedClients');

        newSocket.on('connectedClients', (clients) => {
            if (clients.length === 1) {
                setUserType('writer');
            } else if (clients.length === 2) {
                setUserType(clients[1] === newSocket.id ? 'writer' : 'viewer');
            } else {
                setUserType('viewer'); // For more than two users, set as 'viewer'
            }
        });

        setSocket(newSocket);
        newSocket.emit('setExpectedCode', {expectedCode:'function add(num1, num2){ let res = num1 + num2; return res;}'});


        return () => {
            newSocket.disconnect();
        };
    }, []);

    const handleCodeChange = (newCode) => {
        if (userType === 'writer' && socket) {
            setCode(newCode);
            socket.emit('codeChange', { code: newCode });
        }
    };

    return (
        <>
            <Head>
                <title>Collaborate coding | Add</title>
            </Head>
            <div>
                <h1>Add</h1>
                {userType === 'writer' && (
                    <div>
                        <textarea
                            style={{ width: '40%', minHeight: '200px' }}
                            value={userInput}
                            onChange={(e) => {
                                setUserInput(e.target.value);
                                handleCodeChange(e.target.value);
                            }}
                        />
                        <SyntaxHighlighter showLineNumbers={true}  language="javascript" style={a11yDark}>
                            {code}
                        </SyntaxHighlighter>
                        <p>{smiley}</p> {/* Display the received smiley */}
                    </div>
                )}
                {userType === 'viewer' && (
                    <div>
                        <SyntaxHighlighter showLineNumbers={true}  language="javascript" style={a11yDark}>
                            {code}
                        </SyntaxHighlighter>
                        <p>{smiley}</p> {/* Display the received smiley */}
                    </div>
                )}
            </div>
        </>
    );
};

export default CodeEditor;
