const SDK = require('inline-sdk');
const superagent = require('superagent');
const CommandType = SDK.CommandType;
const inline = new SDK();

inline.onCommand((type, payload, context) => {
  switch(type) {
    case CommandType.MESSAGE:
      const args = payload.args;
      if (args.length === 0) {
        context.sendText('Type "@light on" to turn on light.\nType "@light off" to turn off light.');
      } else if (args[0] === 'setup') {
        context.sendText(`Connect you Inline™ Lightbulb to ${process.env.API_URL}/io/${context.getContextId()}`);
      } else if (['on', 'off'].indexOf(args[0]) >= 0) {
        superagent.get(`${process.env.API_URL}/${context.getContextId()}/${args[0]}`).end();
      } else {
        context.sendText('Type "@light on" to turn on light.\nType "@light off" to turn off light.');
      }
      break;
    case CommandType.SCHEDULE:
      break;
    case CommandType.WEBHOOK:
      break;
    default:
      console.log('Something wrong');
  }
});