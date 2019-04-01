const AWS = require('aws-sdk');
const keys = require('../config/keys');
const uuid = require('uuid/v1');
const requireLogin = require('../middleware/requireLogin');

// need setup about credential information
AWS.config.update({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey
});
// then make instance
const s3 = new AWS.S3();

module.exports = app => {
  app.get('/api/upload/image', requireLogin, (req, res) => {
    const file = req.query.type; //image/jpeg

    const key = `${req.user.id}/${uuid()}.jpeg`;

    s3.getSignedUrl(
      'putObject',
      {
        Bucket: 'graspdelivery',
        Key: key,
        ContentType: file,
        Expires: 60
      },
      (err, url) => {
        if (err) {
          res.send(err);
        }
        res.send({ key, url });
      }
    );
  });

  app.get('/api/upload/design', requireLogin, (req, res) => {
    const file = req.query.type;
    const extensiton = req.query.name.split('.').pop(); // file name ***.jpg
    const key = `${req.user.id}/${uuid()}.${extensiton}`;

    s3.getSignedUrl(
      'putObject',
      {
        Bucket: 'graspdelivery',
        Key: key,
        ContentType: file,
        Expires: 60
      },
      (err, url) => {
        if (err) {
          res.send(err);
        }
        res.send({ key, url });
      }
    );
  });
};
