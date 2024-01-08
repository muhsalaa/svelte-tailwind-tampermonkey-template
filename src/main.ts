import App from "./App.svelte";
import { services } from "./service";

const app = new App({
  target: document.getElementById("app")!,
});
services();

export default app;
