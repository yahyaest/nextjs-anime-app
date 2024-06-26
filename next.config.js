const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
} = require("next/constants");

const withPlugins = require("next-compose-plugins");
const withCSS = require("@zeit/next-css");
const withTM = require("next-transpile-modules")([
  "react-quill",
  "quill",
  "react-chat-engine",
]);

// module.exports = withPlugins([withCSS, withTM], {
//   // Your next setConfiguration

// });

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    console.log("Development Mode");
    return {
      reactStrictMode: true,
      images: {
        domains: [
          "media.kitsu.io",
          "lh3.googleusercontent.com",
          "platform-lookaside.fbsbx.com",
          "avatars.githubusercontent.com",
          "i.ytimg.com"
        ],
      },
      env: {
        DEV_URL: "http://localhost:3000",
        PROD_URL: "http://localhost:3000",
        NEXT_APP_API_URL: "http://localhost:3000/api",
        NEXT_APP_ROOT_URL: "http://localhost:3000",
        NEXTAUTH_SECRET: "gA1DhrUS5WOD20XjptadhMTnqzHg-Bcmu6YLkSQk4SYkxfcI7R7UdV6cgm5bHHk3pet8GI-pyutZs7Kh51NL7g",
        NEXTAUTH_URL: "http://localhost:3100",
        GOOGLE_CLIENT_ID:
          "111284700249-rsk6ps62ndp0ql5koi6rkoijpf14d5kk.apps.googleusercontent.com",
        GOOGLE_CLIENT_SECRET: "NLgyP0_59rhyAzIb2Gi4Zl_x",
        //FACEBOOK_CLIENT_ID: "4494106827311978",
        //FACEBOOK_CLIENT_SECRET: "ee4f3297acf33e5540c9f9282e8b9a9f",
        FACEBOOK_CLIENT_ID: "1163848264098065",
        FACEBOOK_CLIENT_SECRET: "38aff095d144c3fe5ad049b7913965aa",
        GITHUB_CLIENT_ID: "ef0a3c9d6d81236bb7b9",
        GITHUB_CLIENT_SECRET: "bae7976880c2310e3cb3e15bb96ea88094ccb92e",
        DB_USERNAME: "yahya",
        DB_PASSWORD: "25020680",
        DB_NAME: "anime-app",
        CHAT_PROJECT_ID: "8783cfe9-1aeb-4896-bb14-9b8449243209",
        CHAT_PRIVATE_KEY: "2b8356e1-ace2-48bb-b5f7-bea448c3a5af",
        CHAT_SECRET: "25020680",
        HUGGINGFACE_TOKEN: "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"
      },
    };
  }

  // production
  console.log("Production Mode");
  return {
    reactStrictMode: true,
    images: {
      domains: [
        "media.kitsu.io",
        "lh3.googleusercontent.com",
        "platform-lookaside.fbsbx.com",
        "avatars.githubusercontent.com",
        "res.cloudinary.com",
        "i.ytimg.com"
      ],
    },
    env: {
      DEV_URL: "https://anime-app.yahyamachat.com/",
      PROD_URL: "https://anime-app.yahyamachat.com/",
      NEXT_APP_API_URL: "https://anime-app.yahyamachat.com/api",
      NEXT_APP_ROOT_URL: "https://anime-app.yahyamachat.com/",
      NEXTAUTH_SECRET: "gA1DhrUS5WOD20XjptadhMTnqzHg-Bcmu6YLkSQk4SYkxfcI7R7UdV6cgm5bHHk3pet8GI-pyutZs7Kh51NL7g",
      NEXTAUTH_URL: "https://anime-app.yahyamachat.com/",
      GOOGLE_CLIENT_ID:
        "111284700249-rsk6ps62ndp0ql5koi6rkoijpf14d5kk.apps.googleusercontent.com",
      GOOGLE_CLIENT_SECRET: "NLgyP0_59rhyAzIb2Gi4Zl_x",
      FACEBOOK_CLIENT_ID: "1163848264098065",
      FACEBOOK_CLIENT_SECRET: "38aff095d144c3fe5ad049b7913965aa",
      // https://github.com/settings/applications/1675712 || Homepage URL - Authorization callback URL  https://nextjs-anime-app-aaaqify4h-yahyaest.vercel.app/
      GITHUB_CLIENT_ID: "ef0a3c9d6d81236bb7b9",
      GITHUB_CLIENT_SECRET: "bae7976880c2310e3cb3e15bb96ea88094ccb92e",
      DB_USERNAME: "yahya",
      DB_PASSWORD: "25020680",
      DB_NAME: "anime-app",
      CHAT_PROJECT_ID: "8783cfe9-1aeb-4896-bb14-9b8449243209",
      CHAT_PRIVATE_KEY: "2b8356e1-ace2-48bb-b5f7-bea448c3a5af",
      CHAT_SECRET: "25020680",
      HUGGINGFACE_TOKEN: "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"
      },
  };
};
