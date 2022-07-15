const app = require ("./app");

const dotenv = require ("dotenv");
const connectDatabase = require ("./config/database")

//config


dotenv.config({path:"backend/config/config.env"});

//connecting with database
connectDatabase();


app.listen(process.env.PORT, ()=> {

    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})

/* Alternative.

require('dotenv').config()

mongoose.connect(process.env.DATABASE_ACCESS, () =>console.log("Database connected"))

app.use(express.json())
app.use(cors())
app.use('/app', routesUrls)
app.listen(4000, () => console.log("server is up and running"))*/