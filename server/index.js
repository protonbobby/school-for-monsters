const app = require('./app');
const { sync, syncAndSeed } = require('./db/index');
const PORT = process.env.PORT || 8753;

app.listen(PORT, () => console.log(`And we're live at at http://localhost:${PORT}`));

// syncAndSeed();
sync();
