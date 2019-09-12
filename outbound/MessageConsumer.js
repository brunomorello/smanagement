class MessageConsumer {

    constructor() {
        this._amqp = require('amqplib/callback_api');
    }

    getMessage() {

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

                console.log(` [*] Waiting for messages in ${queue}`);

                channel.consume(queue, (msg) => {
                    
                    console.log(` [x] Received ${msg}`);
                    
                }, {
                    noAck: true
                });   

            })

        });

    }

}

module.exports = new MessageConsumer;