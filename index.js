import pg from 'pg'
import express from 'express'
import bodyParser from 'body-parser'

const app = express()
const port = 3000

app.use(bodyParser.json())

app.get('/books', (req, res, next)=>{
    res.send('tariel is answering your questions!!!')
}) 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

const { Pool } = pg

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '0222',
    database: 'books',
    port: 7000,
})

const client = await pool.connect().catch(err => console.log(err))
const result = await client.query({
    text: 'SELECT * FROM books'
}).catch(err=>console.log(err))


// INSERT SCRIPT
// const result = await client.query({
//     text: `INSERT INTO public.books(
//         author, title, isbn)
//         VALUES ('დავით გურამიშვილი', 'დავითიანი', '9785529007952');`
// }).catch(err=>console.log(err))

console.log(result.rows)