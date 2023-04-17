import pg from 'pg'
import express from 'express'
import bodyParser from 'body-parser'

const app = express()
const port = 3000

const { Pool } = pg

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '0222',
    database: 'books',
    port: 7000,
})


app.use(bodyParser.json())

app.get('/books', async (req, res, next)=>{
    try{
        const client = await pool.connect().catch(err => console.log(err))
        const result = await client.query({
            text: 'SELECT * FROM books'
        }).catch(err=>console.log(err))
        res.json(result.rows)    
    }catch(err){
        res.send(err)
    }
})

app.post('/books', async (req, res, next)=>{
    try{
        const { author: bookAuthor, title: bookTitle, isbn: bookIsbn } = req.body
        const client = await pool.connect().catch(err => console.log(err))
        const result = await client.query({
            text: `INSERT INTO public.books(
                author, title, isbn)
                VALUES ($1, $2, $3);`,
            values: [bookAuthor, bookTitle, bookIsbn]
        }).catch(err=>console.log(err))
        res.send(`new book was added with title "${bookTitle}"`)
    }catch(err){
        res.send(err)
    }
})

app.delete('/books', async (req, res, next) =>{
    try{
        const {isbn: bookIsbn, title: bookTitle} = req.body
        const client = await pool.connect().catch(err => console.log(err))
        client.query({
            text: `DELETE FROM public.books 
            WHERE isbn=$1;`,
            values: [bookIsbn]
        })
        res.send(bookTitle+' WAS SUCCESSFULLY DELETED.')
    }catch(err){
        console.log(err)
        res.send("some error", err)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// INSERT SCRIPT
// const result = await client.query({
//     text: `INSERT INTO public.books(
//         author, title, isbn)
//         VALUES ('დავით გურამიშვილი', 'დავითიანი', '9785529007952');`
// }).catch(err=>console.log(err))

// console.log(result.rows)