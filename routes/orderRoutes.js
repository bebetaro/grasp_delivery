//This route is for controlling routes of order information

const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const AWS = require('aws-sdk');
const { map } = require('p-iteration');

const Order = mongoose.model('order');
const User = mongoose.model('users');
const keys = require('../config/keys');

AWS.config.update({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey
});
// then make instance
const s3 = new AWS.S3();

module.exports = app => {
  app.get('/api/orderList', requireLogin, async (req, res) => {
    const orderList = await Order.find({ _sender: req.user._id });
    //console.log(orderList);
    res.send(orderList); // get all of order list and return it
  });

  app.get('/api/answerList', requireLogin, async (req, res) => {
    const company = req.user.company;
    //console.log(company);
    const orderList = await Order.find({ reciever: company }).sort({
      delivery: 1
    });

    const newList = await map(orderList, async order => {
      user = await User.findById(order._sender);
      customer = user.company;
      const newArray = { ...order };
      const { _doc } = newArray;
      //console.log({ ..._doc, company_name });
      return { ..._doc, customer };
    });
    //console.log(newList);
    res.send(newList);
  });

  app.put('/api/order', requireLogin, async (req, res) => {
    //console.log(req.body);
    const order = await Order.findById(req.body.id);
    //console.log(order);
    res.send(order);
  });

  app.post('/api/new/order', requireLogin, async (req, res) => {
    //console.log(req.user);
    const { drawNum, delivery, quantity, reciever, designUrl } = req.body; //reciever should be unique ID *NOT _id*

    await new Order({
      // Don't forget await
      drawNum,
      delivery,
      quantity,
      _sender: req.user._id,
      reciever,
      designUrl,
      dateSent: Date.now(),
      process: []
    }).save();
    //req.user.controlNum += 1; // Control number will be reflected to user side interface
    const user = await req.user.save(); //save and make variable user
    res.send(user); //send back user here
  });
  app.post('/api/update/order', requireLogin, async (req, res) => {
    //console.log(req.body);
    const { delivery, quantity, _id, reciever } = req.body;
    await Order.findByIdAndUpdate(
      _id,
      {
        $set: { delivery, quantity, reciever }
      },
      { upsert: true }
      //{ new: true }
    );
    const orderList = await Order.find({ _sender: req.user._id });
    res.send(orderList);
  });

  app.post('/api/response/order', requireLogin, async (req, res) => {
    const { price, delivery, _id } = req.body;
    //console.log(_id);
    await Order.findByIdAndUpdate(
      _id,
      { $set: { price, delivery } },
      { upsert: true }
      //{ new: true } //To update, this option is required
    );
    const orderList = await Order.find({ reciever: req.user.company }).sort({
      delivery: 1
    });
    //console.log(orderList);
    res.send(orderList);
    //res.send({});
  });

  app.put('/api/delete/order/', requireLogin, async (req, res) => {
    //console.log(req.body);
    //Don't use delete API this time, just modify

    const { id, designUrl } = req.body;
    if (designUrl !== '') {
      s3.deleteObject(
        { Bucket: 'graspdelivery', Key: designUrl },
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`Success to delete ${designUrl}`, data);
          }
        }
      );
    } else {
      console.log('No design files');
    }

    await Order.findByIdAndRemove(id, async err => {
      if (err) {
        console.log(err);
      }
      const orderList = await Order.find({ _sender: req.user._id });

      res.send(orderList);
    });
  });

  app.post(
    '/api/process',
    requireLogin,

    async (req, res) => {
      const { _id, process, worker, imageUrl } = req.body;

      Order.findById(_id, async (err, order) => {
        if (err) {
          console.log(err);
        }
        //console.log(order);
        await order.process.push({ process, worker, imageUrl });
        await order.save();
        //console.log(order.process);
        res.send(order.process);
      });
    }
  );

  app.post('/api/delete/process', requireLogin, async (req, res) => {
    const { id, _id, imageUrl } = req.body;
    //console.log(imageUrl);
    s3.deleteObject({ Bucket: 'graspdelivery', Key: imageUrl }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Success to delete ${imageUrl}`, data);
      }
    });
    Order.findById(id, async (err, order) => {
      if (err) {
        console.log(err);
      }
      await order.process.id(_id).remove();
      await order.save();
      res.send(order.process);
    });
  });

  app.post('/api/get/process', requireLogin, async (req, res) => {
    const { id } = req.body;
    Order.findById(id, async (err, order) => {
      if (err) {
        console.log(err);
      }
      res.send(order.process);
    });
  });
};
