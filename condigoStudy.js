export const createReview = (req, res) => {
    const review = new Review();
    review.username = req.body.username;
    review.rating = req.body.rating;
    review.body = req.body.body;
    review.save()
      .then((result) => {
        User.findOne({ username: review.username }, (err, user) => {
            if (user) {
                // The below two lines will add the newly saved review's 
                // ObjectID to the the User's reviews array field
                user.reviews.push(review);
                user.save();
                res.json({ message: 'Review created!' });
            }
        });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
};
/* 
46
router.get('/:gender', (req, res, next) => {
    Product.find({
        "userTbId.gender": req.params.gender
    })
    .populate({
        path: 'userTbId',
        match: {
            userId: req.params.userId
        }
    })
    .exec()
    .then(docs => {
        res.status(200).json({
            docs
        }); 
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

As respostas anteriores a esta pergunta foram úteis, mas pode ser útil ver um código mais detalhado. O código abaixo é do meu backend Express.js para meu aplicativo. Meu aplicativo permite que os usuários escrevam comentários. Ao consultar o usuário, devolvo todas as avaliações que o usuário fez.

user_model.js
 */
import mongoose, { Schema } from 'mongoose';


const UserSchema = new Schema({
  firstname: String,
  lastname: String,
  username: { type: String, unique: true },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
}, {
  toJSON: {
    virtuals: true,
  },
});

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
review_model.js

import mongoose, { Schema } from 'mongoose';

const ReviewSchema = new Schema({
  body: String,
  username: String,
  rating: Number,
}, {
  toJSON: {
    virtuals: true,
  },
});

const ReviewModel = mongoose.model('Review', ReviewSchema);
export default ReviewModel;
review_controller.js

// . . .
export const createReview = (req, res) => {
    const review = new Review();
    review.username = req.body.username;
    review.rating = req.body.rating;
    review.body = req.body.body;
    review.save()
      .then((result) => {
        User.findOne({ username: review.username }, (err, user) => {
            if (user) {
                // The below two lines will add the newly saved review's 
                // ObjectID to the the User's reviews array field
                user.reviews.push(review);
                user.save();
                res.json({ message: 'Review created!' });
            }
        });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
};
user_controller.js

 export const createUser = (req, res) => {
   const user = new User();
   user.username = req.body.username;
   user.email = req.body.email;
   user.save()
       .then((result) => {
            res.json({ message: 'User created!', result });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    };

// . . .
// returns the user object associated with the username if any
// with the reviews field containing an array of review objects 
// consisting of the reviews created by the user
export const getUser = (req, res) => {
    User.findOne({ username: req.params.username })
      .populate('reviews')
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  };