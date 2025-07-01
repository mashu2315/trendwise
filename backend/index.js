const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require('./config/db');
const articleRoutes = require('./routes/article');
const commentRoutes = require('./routes/comment');
const sitemapRoutes = require('./routes/sitemap');
const userRoutes = require('./routes/user');


const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cors({
  origin: [`${process.env.FRONTEND_URL}`],
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));


// Connect to MongoDB
connectDB();


// Routes
app.use('/api/articles', articleRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);
app.use('/sitemap.xml', sitemapRoutes);



app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})

