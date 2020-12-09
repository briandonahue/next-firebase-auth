import { getCustomIdAndRefreshTokens } from 'src/firebaseAdmin'
import { setCookie } from 'src/cookies'
import {
  getAuthUserCookieName,
  getAuthUserTokensCookieName,
} from 'src/authCookies'
import { getConfig } from 'src/config'

const setAuthCookies = async (req, res) => {
  // TODO: throw instead of returning a response. Let the
  //   calling API route handle its response.
  if (!(req.headers && req.headers.authorization)) {
    return res.status(400).json({ error: 'Missing Authorization header value' })
  }

  // This should be the original Firebase ID token from
  // the Firebase JS SDK.
  const token = req.headers.authorization

  // Get a custom ID token and refresh token, given a valid
  // Firebase ID token.
  const { idToken, refreshToken, AuthUser } = await getCustomIdAndRefreshTokens(
    token
  )

  const { keys, cookieOptions } = getConfig().cookies

  // Store the ID and refresh tokens in a cookie. This
  // cookie will be available to future requests to pages,
  // providing a valid Firebase ID token (refreshed as needed)
  // for server-side rendering.
  setCookie(
    getAuthUserTokensCookieName(),
    // Note: any change to cookie data structure needs to be
    // backwards-compatible.
    JSON.stringify({
      idToken,
      refreshToken,
    }),
    { req, res },
    {
      keys,
      ...cookieOptions,
    }
  )

  // Store the AuthUser data. This cookie will be available
  // to future requests to pages, providing the user data. It
  // will not necessarily contain a valid Firebase ID token,
  // because it may have expired, but provides the AuthUser
  // data without any additional server-side requests.
  setCookie(
    getAuthUserCookieName(),
    // Note: any change to cookie data structure needs to be
    // backwards-compatible.
    AuthUser.serialize(),
    {
      req,
      res,
    },
    {
      keys,
      ...cookieOptions,
    }
  )

  return {
    idToken,
    refreshToken,
    AuthUser,
  }
}

export default setAuthCookies
