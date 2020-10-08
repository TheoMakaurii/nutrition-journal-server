const AuthService = require('../auth/auth-service')

function requireAuth(req, res, next) {
    // console.log('requireAuth')
    // console.log(req.get('Authorization'))
    const authToken = req.get('Authorization') || ''

    let basicToken
    if(!authToken.toLowerCase().startsWith('basic ')) {
        return res.status(401).json({ error: 'You need a basic token!'})
    }
    else{
        basicToken =authToken.slice('basic '.length, authToken.length)
    }
   
    const [tokenUserName, tokenPassword]= AuthService.parseBasicToken(basicToken)


    if(!tokenUserName || !tokenPassword){
        return res.status(401).json({error: 'This is an UNAUTHORIZED request!'})
    }

    AuthService.getUserWithUserName(
        req.app.get('db'),
        tokenUserName
      )
        .then(user => {
          if (!user || user.password !== tokenPassword) {
            return res.status(401).json({ error: 'Who the hell are you!!' })
          }
          
          req.user=user
          next()
        })
        .catch(next)
    }
  
  module.exports = requireAuth
  