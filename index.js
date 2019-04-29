const jackrabbit = require('jackrabbit');
const RABBIT_URL = process.env.CLOUDAMQP_URL || 'amqp://localhost:5672';
const PARTNER_TOPIC = process.env.PARTNER_TOPIC || 'partner.p_test';

start();

function start() {
  console.log({ type: 'info', message: 'Subscribed to lead service.' });

  const rabbit = jackrabbit(RABBIT_URL);

  rabbit.once('connected', create);
  process.once('uncaughtException', onError);

  function create() {
    const exchange = rabbit.direct("partner_leads", {noReply:true});
    const rpc = exchange.queue({key:PARTNER_TOPIC,name: PARTNER_TOPIC, durable:true});
    rpc.consume(onLog,  { noAck: true });
  }

  function onLog(data) {
    const payload = JSON.parse(data.toString("utf-8"));
    console.log("--- Message ---");
    console.log(JSON.stringify(payload, null, 2));
    console.log("---------------");
  }

  function onError(err) {
    console.log({ type: 'error', service: 'partner lead', error: err, stack: err.stack || 'No stacktrace' }, process.stderr);
    console.log({ type: 'info', message: 'killing partner lead' });
    process.exit();
  }
}