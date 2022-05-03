import 'dotenv/config';

import { server } from '../websocket/socket';

server.listen(process.env.APP_PORT, () => {
  console.info('Server started successful');
});
