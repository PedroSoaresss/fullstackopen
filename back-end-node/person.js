import mongoose from 'mongoose';

const url = process.env.MONGODB_URI || 'mongodb+srv://<username>:<password>@<cluster>.mongodb.net/phonebook?retryWrites=true&w=majority';

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, 'Name must be at least 3 characters'],
    required: [true, 'Name is required']
  },
  number: {
    type: String,
    required: [true, 'Number is required'],
    validate: {
      validator: function(v) {
        // Regex: 2-3 digits, hyphen, at least 5 digits
        return /^\d{2,3}-\d{5,}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
});

const Person = mongoose.model('Person', personSchema);

export default Person;
