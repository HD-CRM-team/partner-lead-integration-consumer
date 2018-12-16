const jackrabbit = require('jackrabbit');
const RABBIT_URL = process.env.CLOUDAMQP_URL || 'amqp://localhost:5672';
const PARTNER_TOPIC = process.env.PARTNER_TOPIC || 'partner.p_test'
console.log(RABBIT_URL)
start();

function start() {
  console.log({ type: 'info', message: 'Subscribed to lead service.' });

  const rabbit = jackrabbit(RABBIT_URL);

  rabbit.once('connected', create);
  process.once('uncaughtException', onError);

  function create() {
    const exchange = rabbit.topic('partner_leads');
    const rpc = exchange.queue({ exclusive: true, key: PARTNER_TOPIC });
    rpc.consume(onLog,  { noAck: true });
  }

  function onLog(data, msg) {
    console.log(JSON.stringify(data, null, 2));
  }

  function onError(err) {
    console.log({ type: 'error', service: 'partner lead', error: err, stack: err.stack || 'No stacktrace' }, process.stderr);
    console.log({ type: 'info', message: 'killing partner lead' });
    process.exit();
  }
}