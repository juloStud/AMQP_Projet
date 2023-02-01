const express = require('express');
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
app.use(express.json())
const amqp = require('amqplib/callback_api');
const queue = 'command';
const worker = require("./worker.js");
const dotenv = require("dotenv");
dotenv.config();
const swaggerdoc = require("./swagger.js")
const port = process.env.PORT;





const router = express.Router();

app.use('/api/amqp', router)

//Connexion à la base de données

const Sequelize = require('sequelize');
const sequelize = new Sequelize('amqp_database', 'root', 'root', {
  host: 'localhost',
  dialect: 'mariadb',
  logging: false
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



// Définition du modèle
const Message = sequelize.define('message', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true 
  },
  flag: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
}, {
  timestamps: false
});


//Routes de l'api

router.get('/getMessages', (req, res) => {
  Message.findAll({attributes: ['id','description','flag']})
    .then(messages => res.json(messages))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.get('/getMessage/:id', (req, res) => {
  Message.findByPk(req.params.id,{attributes: ['id','description','flag']})
    .then(message => {
      if (!message) {
        return res.status(404).json({ error: 'Message not found' });
      }
      res.status(200).json(message);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

router.post('/createMessage', (req, res) => {
  Message.create({description: req.body.description, flag: 1})
    .then((message) => {
      amqp.connect('amqp://localhost', (error0, connection) => {
        if (error0) {
          throw error0;
        }
        connection.createChannel((error1, channel) => {
          if (error1) {
            throw error1;
          }
          const data = {
            id: message.id,
            description: message.description,
        };
          channel.assertQueue(queue);
          channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
        });
      });
      res.status(200).json(message);
    })
    .catch(err => res.status(400).json({ error: err.message }));
});

router.put('/updateMessage', (req, res) => {
  Message.update({ flag: req.body.flag },{
    where : {id: req.body.id},
    returning: true,
    plain: true,
  })
  .then((result) => res.status(200).json(result[1]))
  .catch((error) => res.status(400).json({
    message: error?.message || "Une erreur est survenue"
  }))
})

//Documentation SWAGGER
const options = {
  definition: {
      openapi: "3.0.0",
      info: {
          title: "API de Gestion des Stocks",
          version: "1.0.0",
          description: "API CRUD pour la gestion des Stocks alimentaires"
      },
      servers: [
        {
        url: "http://localhost:3000/api/amqp"
        }
      ]
  },
  apis: ["./swagger.js"]
};

const specs = swaggerJsDoc(options);
app.use('/api-amqp', swaggerUI.serve, swaggerUI.setup(specs))

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = router;

