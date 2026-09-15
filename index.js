const express = require("express");

const app = express();
const port = 3000;
const posts = [];
let nextId = 1;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { posts: posts });
});

app.post("/posts", (req, res) => {
  const post = {
    id: nextId++,
    author: req.body.author,
    title: req.body.title,
    content: req.body.content,
    createdAt: new Date()
  };

  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:id/edit", (req, res) => {
  const post = posts.find((post) => post.id === Number(req.params.id));

  if (!post) {
    return res.status(404).send("Post not found");
  }

  res.render("edit", { post: post });
});

app.post("/posts/:id/edit", (req, res) => {
  const post = posts.find((post) => post.id === Number(req.params.id));

  if (!post) {
    return res.status(404).send("Post not foud");
  }

  post.author = req.body.author;
  post.title = req.body.title;
  post.content = req.body.content;

  res.redirect("/");
});

app.post("/posts/:id/delete", (req, res) => {
  const index = posts.findIndex(
    (post) => post.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).send("Post not found");
  }

  posts.splice(index, 1);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});