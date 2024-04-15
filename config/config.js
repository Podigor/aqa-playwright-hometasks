const config = {
    baseURL: process.env.BASE_URL,
    httpCredentials: {
        username: process.env.HTTP_CREDENTIALS_USERNAME,
        password: process.env.HTTP_CREDENTIALS_PASSWORD
      },
    userCredentials: {
        username: process.env.TEST_USERNAME,
        password: process.env.TEST_PASSWORD
      }
  }

export default config