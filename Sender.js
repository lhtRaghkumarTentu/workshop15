const amqp = require('amqplib/callback_api');


amqp.connect(`amqp://localhost`, (err, connection) => {
    if (err) {
        throw err;
    }
    connection.createChannel((err, channel) => {
        if (err) {
            throw err;
        }
        let queuename = "chat";
        let message = "Hi Potti, How Are You ?";
        channel.assertQueue(queuename, {
            durable: false,
        });
        channel.sendToQueue(queuename, Buffer.from(message));
        console.log(`message: ${message}`);
        setTimeout(() => {
            connection.close();
        }, 1000);
    });
});