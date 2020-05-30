# Node Event Loop

[Jake Archibald - Node Event Loop](https://www.youtube.com/watch?v=cCOL7MC4Pl0&feature=youtu.be) 

This code demonstrates the Node Event Loop

`
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    console.log('serving...');
    res.send('Hello World!')
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

app.get('/sleep', async (req, res) => {
    console.log('sleeping...');
    await sleep(30000);
    console.log('waking up...');
    res.send('Great nap!')
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
`

`
sleeping...
sleeping...
serving...
waking up...
waking up...
`