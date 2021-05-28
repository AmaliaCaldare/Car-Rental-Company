
const express = require('express')
const { user } = require('../config/mysqlCredentials')
const router = express.Router()

const Image = require('../models/Image')

router.get('/image', (req, res) => {
    Image.query()
        .then(images => {
            res.status(200).send(images)
        })
})

router.get('/image/:id', (req, res) => {
    let id = parseInt(req.params.id)
    Image.query()
        .where('id', id)
        .then(images => {
            res.json(images)
        })
})

  router.post('/image', (req, res) => {
    const { source } = req.body;
    if(source) {
      try{
        Image.query().insert({
          source
        }).then(newItem => {
          return res.redirect('/api/image');
        });
      }
      catch(error) {
          console.log(error);
        return res.send({response: 'Something went wrong with the DB'});
      }
    }
  })

  router.delete("/image/:Id", async (req,res) => {
    const image = await Image.query().delete().where({'id': req.params.Id});
    return res.redirect("/api/image")
});

module.exports = {
    router: router
}

/*
{
         "source":"/image4/source"
}
*/