var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
	name: String,
	email: String,
	number: Number,
	password: String,
	created_at: {type: Date, default: new Date},
	updated_at: {type: Date, default: new Date},
})
var TasksSchema = new mongoose.Schema({
	_charity: {type: Schema.ObjectId, ref: 'Charity'},
	title: String,
	description: String,
	done: Boolean,
	date: Date,
	created_at: {type: Date, default: new Date},
	updated_at: {type: Date, default: new Date},
})
var DonationsSchema = new mongoose.Schema({
	user_tasks: {type: Schema.ObjectId, ref: 'UserTask'},
	_sponsor: {type: Schema.ObjectId, ref: 'User'},
	pledge: Number
	// created_at: {type: Date, default: new Date},
	// updated_at: {type: Date, default: new Date},
})
var CharitiesSchema = new mongoose.Schema({
	title: String,
	bio: String,
	tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}],
	created_at: {type: Date, default: new Date},
	updated_at: {type: Date, default: new Date},
})

var UserTaskSchema = new mongoose.Schema({
	_user: {type: Schema.ObjectId, ref:"User"},
	task: {type: Schema.ObjectId, ref:"Task"},
	hours: Number,
	completion: Boolean,
	donations: [{type: Schema.Types.ObjectId, ref:"Donation"}]
})

var DonationSchema = new mongoose.Schema({
	_sponsor: {type: Schema.ObjectId, ref:"User"},
	user_tasks: {type: Schema.ObjectId, ref:"UserTask"},
	pledge: Number
})

mongoose.model('UserTask', UserTaskSchema)
mongoose.model('User', UserSchema);
mongoose.model('Task', TasksSchema);
mongoose.model('Donation', DonationSchema);
mongoose.model('Charity', CharitiesSchema);
