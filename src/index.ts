import app from './app';

import { env } from './env';

const port = env.PORT || 4091;

app.listen(port, () => {
  console.log(`listening: http:localhost:${port}`);
});
