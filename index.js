import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.json()); // For parsing JSON data
app.use(express.static(join(__dirname, "public")));

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

let posts = [];

//Form to Create Post
app.get("/", (req, res) => {
  res.render("index.ejs", { posts });
});

//Show Post
app.get("/create", (req, res) => {
  res.render("create.ejs");
});

//Add New Post
app.post("/create", (req, res) => {
  const { title, content } = req.body;
  posts.push({ title, content });
  res.redirect("/");
});

//Delete Post
app.post("/delete", (req, res) => {
  const { index } = req.body;
  posts.splice(index, 1);
  res.redirect("/");
});

//Update Post
app.post("/update", (req, res) => {
  const { index, title, content } = req.body;
  posts[index] = { title, content };
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server on port ${3000}`);
});
