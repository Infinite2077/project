let express = require("express")
const multer = require("multer")
const path = require("path")
const mysql = require("mysql2")
let db = require("./db")



require("dotenv").config()

let con = mysql.createConnection({
    host: process.env.HOST_URL,
    port: process.env.PORT,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME
})


let a = con.connect(async(err)=>{
    if (err){
        console.error(err.stack)
        return
    }
    console.log("SQL connected!")
})



let app = express()

app.use("/uploads", express.static (path.join(__dirname, "uploads")))

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{

    
    cb (null, "uploads/")
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer ({storage})





app.use(express.static("static"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.set("views", "views")

app.get("/", (req,res)=>{
    db.query("SELECT * FROM products", (err, rows)=>{
        let products = rows
        products.forEach(product=>{
            product.image = JSON.parse(product.image)
        })
        res.render("index", {products})
    })
})

app.get("/post/:id", (req,res)=>{
    let postId = req.params.id
    db.query(`SELECT p.*, c.id as commentId, c.author, c.comment FROM products as p LEFT JOIN comments as c ON p.id = postId WHERE p.id = ?`, postId, (err, result)=>{
        if(err || result.length == 0){
            console.log(err)
            return res.status(404).render("notFound")
        }
        let product = result[0]
        console.log(result)
        product.image = JSON.parse(product.image)
        let comments = result.map(p=>{
            return {id: p.commentId, author: p.author, text: p.comment}
        })
        res.status(200).render("post", {product, comments})
    }) 
})

app.post("/comment", (req, res)=>{
    let data = req.body
    console.log(data)
    db.query(`INSERT INTO comments SET ?`, data, (err, result)=>{
        if(err) res.status(500)
        res.end()
    })
    
})

app.post("/add", upload.fields([{name: "image"}]), (req, res)=>{
    let data = req.body
    console.log(data)
    data.image = req.files.image.map((file)=>file.filename)
    data.image = JSON.stringify(data.image)

    db.query("INSERT INTO products SET ?", data, (err)=>{
        res.status(201)
        res.send({status: "ok"})
    })

})

app.use ((req, res, next)=>{
    res.status (404)
    res.render("notFound")
})


app.listen(3000, ()=>console.log("Server on!"))