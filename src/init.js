import "./dababase/db";
import app from "./server";

const PORT = 4000;

const handleListening = () =>
  console.log(`✅ Server listening on http://13.209.41.30:${PORT}✨`);

app.listen(PORT, handleListening);
