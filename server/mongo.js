
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
mongoose.connect(`mongodb+srv://davoszhang:${password}@node-server.cbpnrl3.mongodb.net/first_mongoDB?retryWrites=true&w=majority`);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('we\'re connected!');
});
// 定义一个模型
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})
// 编译模型
const Note = mongoose.model('Note', noteSchema)
function addDB({ content, important }) {
  // 创建一个文档
  const note = new Note({
    content: content,
    date: new Date(),
    important: important,
  })
  // 保存文档
  return note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
  }).catch((err) => {
    console.log('note save err!', err);
    mongoose.connection.close()
  });
}

function findDB(query = {}) {
  Note.find(query).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
    return result;
  }).catch((error) => {
    console.error('Error finding notes:', error);
    mongoose.connection.close()
    throw error; // 抛出错误以便调用者可以处理
  })
}

module.exports = {
  addDB,
  findDB
};