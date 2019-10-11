class MessageOutbound {

    constructor() {
        
        this._amqp = require('amqplib/callback_api');

    }

    send(message) {

        this._amqp.connect('amqp://smanagement_api_mq', (err, connection) => {

            if(err) {
                throw err;
            }

            // Create Channel and send Message
            connection.createChannel((err, channel) => {

                if(err) {
                    throw err;
                }

                let queue = 'metrics';

                channel.assertQueue(queue, { durable: false });

                channel.sendToQueue(queue, Buffer.from(message));

                console.log(` [x] Sent ${message}`);
                

            });

            // Close connection
            setTimeout(() => {
                connection.close();
            }, 500);

        });

    }
}

module.exports = new MessageOutbound;