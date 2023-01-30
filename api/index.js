const express = require('express');
const app = express();
app.use(express.json())
const port = 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.use('/api/amqp', router)

function connectToRabbitMQ() {
    amqp.connect('amqp://localhost', (error0, connection) => {
      if (error0) {
        throw error0;
      }
      connection.createChannel((error1, channel) => {
        if (error1) {
          throw error1;
        }
        // code pour utiliser le canal ici
      });
    });
  }

connectToRabbitMQ();

const router = express.Router();
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


const Message = sequelize.define('message', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  statut: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
}, {
  timestamps: false
});

router.get('/getMessages', (req, res) => {
  Message.findAll({attributes: ['id','statut']})
    .then(messages => res.json(messages))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.get('/getMessage/:id', (req, res) => {
  Message.findByPk(req.params.id,{attributes: ['id','statut']})
    .then(message => {
      if (!message) {
        return res.status(404).json({ error: 'Message not found' });
      }
      res.json(message);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

router.post('/createMessage', (req, res) => {
  console.log(req.body.statut)
  Message.create({statut: req.body.statut})
    .then(message => res.json(message))
    .catch(err => res.status(400).json({ error: err.message }));
});

app.use('/api/amqp', router)

module.exports = router;

