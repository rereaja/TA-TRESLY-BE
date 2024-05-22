const jwt = require(`jsonwebtoken`);
const userModel = require(`../models/index`).user;

const secret = `rereaja`;
const tokenExpiry = '1m'; // Waktu kedaluwarsa token 

const authenticate = async (request, response) => {
  try {
    let dataLogin = {
      username: request.body.username,
      password: request.body.password
    };
    
    let dataUser = await userModel.findOne({ where: dataLogin });
    
    if (!dataUser) {
      return response.json({
        success: false,
        logged: false,
        message: `Authentication Failed. Invalid username or password`
      });
    }
    
    // Menambahkan data tambahan ke payload token
    let payload = {
      user: dataUser,
      version: '1.0' 
    };

    // Membuat token dengan waktu kedaluwarsa
    let token = jwt.sign(payload, secret, { expiresIn: tokenExpiry });

    return response.json({
      success: true,
      logged: true,
      message: `Authentication Success`,
      token: token,
      data: dataUser
    });
  } catch (error) {
    return response.json({
      success: false,
      logged: false,
      message: `Authentication Failed. ${error.message}`
    });
  }
};

const authorize = (request, response, next) => {
  const authHeader = request.headers.authorization;
  
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    
    try {
      // Verifikasi token
      let verifiedUser = jwt.verify(token, secret);

      // Periksa apakah versi token sesuai
      if (verifiedUser.version !== '1.0') {
        throw new Error('Invalid token version');
      }

      request.User = verifiedUser.user; // payload
      next();
    } catch (error) {
      // Tangani jika token tidak valid atau kedaluwarsa
      return response.json({
        success: false,
        auth: false,
        message: `Token Expired or Invalid: ${error.message}`
      });
    }
  } else {
    return response.json({
      success: false,
      auth: false,
      message: `User Unauthorized`
    });
  }
};

module.exports = { authenticate, authorize };
