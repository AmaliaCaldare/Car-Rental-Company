const express = require('express')
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
        .then(result => {
            if (result.length > 0 ) {
                res.status(200).send(result[0]);
            }
            else {
                res.status(404).send({
                    error: `Could not find image with id ${id}`
                })
            }
        })
})

  router.post('/image', (req, res) => {
    const { source } = req.body;
    if(source) {
      try{
        Image.query().insert({
          source
        }).then(newItem => {
          return res.status(200).send(newItem);
        });
      }
      catch(error) {
        res.status(500).send({response: 'Something went wrong with the DB'});
      }
    }
  })

router.delete("/image/:id", async (req,res) => {
    const { id } = req.params;

    await Image.query().delete().where({'id': id});

    res.status(200).send({message: `Image with id ${id} was successfully deleted`})
});

module.exports = {
    router: router
}

/*
{
         "source":"/image4/source"
}
*/
