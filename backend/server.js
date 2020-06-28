import app from './app';

const port = process.env.PORT || 3500;
app.listen(port);

console.log(`Backend service running at port - ${port}`);