import ChatModel from '../models/Chat.js';

export const create = async (req, res) => {
  try {
    const doc = new ChatModel({
      title: req.body.title,
      text: req.body.text,
      user: req.userId,
    });

    const chat = await doc.save();

    res.json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать чат',
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const Chat = await ChatModel.find().populate('user').exec();
    res.json(Chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};

export const remove = async (req, res) => {
  try{
      const postId = req.params.id;
      ChatModel.findOneAndDelete({
          _id: postId,
      })
      .then(doc => res.json(doc))
      .catch(err => {
          console.log(err);
          return res.status(500).json({
              message: 'Не удалось удалить статью'
          });
      });

  } catch(err) {
      console.log(err);
      res.status(500).json({
          message: 'Не удалось получить статьи',
      });
  }
};

export const update = async (req, res) => {
  try {
      const postId = req.params.id;

      await ChatModel.updateOne({
          _id: postId
      }, 
      {
          title: req.body.title,
          text: req.body.text,    
          user: req.userId,
      });

      res.json({
          success: true,
      })
  }   

  catch (err) {
      console.log(err);
      res.status(500).json({
          message: 'Не удалось обновить статью',
      });
  }
}
// export const getOne = async (req, res) => {
//   try {
//     const postId = req.params.id;

//     PostModel.findOneAndUpdate(
//       {
//         _id: postId,
//       },
//       {
//         $inc: { viewsCount: 1 },
//       },
//       {
//         returnDocument: 'after',
//       },
//       (err, doc) => {
//         if (err) {
//           console.log(err);
//           return res.status(500).json({
//             message: 'Не удалось вернуть статью',
//           });
//         }

//         if (!doc) {
//           return res.status(404).json({
//             message: 'Статья не найдена',
//           });
//         }

//         res.json(doc);
//       },
//     ).populate('user');
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: 'Не удалось получить статьи',
//     });
//   }
// };

// export const remove = async (req, res) => {
//   try {
//     const postId = req.params.id;

//     PostModel.findOneAndDelete(
//       {
//         _id: postId,
//       },
//       (err, doc) => {
//         if (err) {
//           console.log(err);
//           return res.status(500).json({
//             message: 'Не удалось удалить статью',
//           });
//         }

//         if (!doc) {
//           return res.status(404).json({
//             message: 'Статья не найдена',
//           });
//         }

//         res.json({
//           success: true,
//         });
//       },
//     );
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: 'Не удалось получить статьи',
//     });
//   }
// };



// export const update = async (req, res) => {
//   try {
//     const postId = req.params.id;

//     await PostModel.updateOne(
//       {
//         _id: postId,
//       },
//       {
//         title: req.body.title,
//         text: req.body.text,
//         imageUrl: req.body.imageUrl,
//         user: req.userId,
//         tags: req.body.tags.split(','),
//       },
//     );

//     res.json({
//       success: true,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: 'Не удалось обновить статью',
//     });
//   }
// };