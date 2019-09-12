class MessageConsumer {

    constructor() {
        this._amqp = require('amqplib/callback_api');
        this._msg;
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
                    
                    console.log(` [x] Received ${msg.toString()}`);
                    this._msg = msg;
                    
                }, {
                    noAck: true
                });   

            })

        });

        return this._msg;

    }

}

module.exports = new MessageConsumer;