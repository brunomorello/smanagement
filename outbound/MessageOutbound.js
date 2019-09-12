class MessageOutbound {

    constructor() {
        
        this._amqp = require('amqplib/callback_api');

    }

    send(message) {

        this._amqp.connect('amqp://localhost', (err, connection) => {

            if(err) {
                throw err;
            }

            connection.createChannel((err, channel) => {

                if(err) {
                    throw err;
                }

                let queue = 'metrics';

                channel.assertQueue(queue, { durable: false });

                channel.sendToQueue(queue, Buffer.from(message));

                console.log(` [x] Sent ${message}`);
                

            })

        });

    }
}

module.exports = new MessageOutbound;