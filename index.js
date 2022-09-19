let method = async () => {
const url = await ngrok.connect({
  proto: 'http',
  addr: 80,
  authtoken: '1fswFeNP8ZW0CxbreF0x663kuxf_2thUXdi3mitTtUKQoi1m'
});
}
const NgrokFreenom = require("@sundawning/ngrok-freenom-redirect");
NgrokFreenom.start({
  ngrok: {
    token: "1fswFeNP8ZW0CxbreF0x663kuxf_2thUXdi3mitTtUKQoi1m",
    port: 80,
  },
  freenom: {
    username: "cazwinns@gmail.com",
    password: "caz123caz123",
    domain: "daboistag.ml",
  },
});
