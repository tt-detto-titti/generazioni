const config = require('../config/auth.config');

module.exports = (mongoose) => {
  return mongoose.model(
    'Ruolo',
    mongoose.Schema(
      {
        _id: {
          type: String,
          enum: config.ruoli
        }
      },
      { collection: 'ruoli' }
    )
  );
};
