import express from 'express';
var router = express.Router();

/* GET home page. */
router.get('/homepage', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

const PORT = process.env.PORT || 3001;
const app = express();



app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

export default router;
