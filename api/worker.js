const amqp = require('amqplib/callback_api');
const queue = 'command';
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

amqp.connect('amqp://localhost', (error0, connection) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }
      channel.assertQueue(queue);

      channel.consume(queue, (msg) => {
        if (msg !== null) {
            const data = JSON.parse(msg.content);
          fetch(`http://localhost:3000/api/amqp/updateMessage`,  {
            method: 'put',
            body: JSON.stringify({
              id: data.id,
              flag: 2
            }),
            headers: {'Content-Type': 'application/json'}
          })
          .then((response) => response.json()
                                        .then((data) => console.log(data)))
          
           channel.ack(msg);
        } else {
          console.log('Servor error');
        }
      });
    });
  });
