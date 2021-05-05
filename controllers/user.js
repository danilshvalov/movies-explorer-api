const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const InternalServerError = require('../errors/InternalServerError');
const errorMessages = require('../errors/error-messages');

const {secretKey} = require('../utils/config');

const updateParams = {new: true, runValidators: true, upsert: true};
const tokenDuration = 1000 * 3600 * 24 * 7; // 1 неделя

const getUserById = (userId) => User.findById(userId).catch(() => {
  throw new BadRequestError('Переданы некорректные данные для получения пользователя');
});

const takeProfileData = ({email, name}) => {
  if (!email || !name) {
    throw new InternalServerError(errorMessages.internalServer);
  }
  return {email, name};
};

module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  getUserById(userId)
    .then((data) => {
      res.send(takeProfileData(data));
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then(({_id}) => {
      res.send({
        _id,
        name,
        about,
        avatar,
        email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные для создания пользователя');
      } else if (err.name === 'MongoError' && err.code === 11000) {
        throw new ConflictError(`Пользователь с email «${email}» уже существует`);
      } else {
        throw new InternalServerError(errorMessages.internalServer);
      }
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const {email, name} = req.body;
  // User.update
  User.findByIdAndUpdate(req.user._id, {email, name}, updateParams)
    .then((data) => {
      res.send(takeProfileData(data));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные для обновления профиля');
      } else if (err.codeName === 'DuplicateKey') {
        throw new ConflictError('Пользователь с таким email уже существует');
      } else {
        throw new InternalServerError(errorMessages.internalServer);
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const {email, password} = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({_id: user._id}, secretKey, {expiresIn: tokenDuration});

      res
        .cookie('jwt', token, {
          maxAge: tokenDuration,
          httpOnly: true,
        })
        .send({token});
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  try {
    res.clearCookie('jwt').send({message: 'Вы успешно вышли из аккаунта'});
  } catch (err) {
    next(err);
  }
};
