/* eslint-env jest */

const getMockConfig = () => ({
  debug: false,
  loginRedirectURL: undefined, // TODO
  appRedirectURL: undefined, // TODO
  firebaseAdminInitConfig: {
    credential: {
      projectId: 'my-example-app',
      clientEmail: 'my-example-app@example.com',
      privateKey: 'fakePrivateKey123',
    },
    databaseURL: 'https://my-example-app.firebaseio.com',
  },
  firebaseClientInitConfig: {
    apiKey: 'fakeAPIKey123',
    authDomain: 'my-example-app.firebaseapp.com',
    databaseURL: 'https://my-example-app.firebaseio.com',
    projectId: 'my-example-app-id',
  },
  cookies: {
    cookieName: 'someExample',
    keys: ['abc', 'def'],
    cookieOptions: {
      domain: undefined,
      httpOnly: true,
      maxAge: 172800, // two days
      overwrite: true,
      path: '/',
      sameSite: 'strict',
      secure: true,
      signed: true,
    },
  },
})

export default getMockConfig
