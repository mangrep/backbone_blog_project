var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/blogs', function(req, res) {
  console.log("get request /api/blogs");
  res.render('index', { title: 'Express' });
  });

router.post('api/blogs', function(req,res){
  console.log("post request /api/blogs")
});
module.exports = router;
