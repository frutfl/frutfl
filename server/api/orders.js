const router = require('express').Router();
const nodemailer = require('nodemailer');
const {Order, OrderItem, User, Product} = require('../db/models');
const {isLoggedIn, isAdmin} = require('../auth/middleware');

module.exports = router;

router.get('/', isLoggedIn, (req, res, next) => {
  if (req.user.accountType === User.ACCOUNT_TYPES.ADMIN) {
    Order.scope('defaultScope', 'orderItems').findAll({
      order: [
        ['id', 'DESC']
      ]
    })
      .then(products => res.json(products))
      .catch(next);
  } else {
    Order.scope('defaultScope', 'orderItems').findAll({
      where: {
        userId: req.user.id
      },
      order: [
        ['id', 'DESC']
      ]
    })
    .then(products => res.json(products))
    .catch(next);
  }
});

router.put('/:orderId', isAdmin, (req, res, next) => {
  Order.update(
    { status: req.body.status },
    { where: { id: req.params.orderId }}
  )
  .then(() => res.sendStatus(200))
  .catch(next);
});

router.post('/', (req, res, next) => {
  console.log('creating order...');
  Order.create({
    shippingAddressId: req.body.shippingAddressId,
    billingAddressId: req.body.billingAddressId,
    stripeToken: req.body.token.id,
    userId: req.user ? req.user.id : null,
  })
  .then(order => {
    return Promise.all(req.body.items.map(item => {
      return Product.findById(item.id)
      .then(product => {
        return OrderItem.create({
          quantity: item.quantity,
          price: product.price,
          orderId: order.id,
          productId: product.id,
        });
      });
    }));
  })
  .then((result) => {
    const totalCost = result.reduce((accum, curr) => accum + curr.dataValues.quantity * curr.dataValues.price, 0);
    console.log('promise.all result:', totalCost);
    res.sendStatus(201);
    /* eslint-disable handle-callback-err */
    nodemailer.createTestAccount((err, account) => {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false,
          auth: {
              user: 'tbx44giolobdiy6g@ethereal.email',
              pass: 'rRnJNwYeuEWbuuhPfY'
          }
      });

      let mailOptions = {
          from: '"Frutfl Orders" <orders@frutfl.com>',
          to: 'personr@example.com',
          subject: 'Order Confirmation',
          text: 'Hello,\n Your order for ' + totalCost + ' has been received', // plain text body
          // html: '<b>Hello world?</b>' // html body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      });
  });
  })
  .catch(next);
});
