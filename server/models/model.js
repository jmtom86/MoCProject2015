var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
	name: String,
	email: String,
	number: Number,
	password: String,
	created_at: {type: Date, default: new Date},
	updated_at: {type: Date, default: new Date},
	tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}]
})
var TasksSchema = new mongoose.Schema({
	_charity: {type: Schema.ObjectId, ref: 'Charity'},
	title: String,
	description: String,
	done: Boolean,
	created_at: {type: Date, default: new Date},
	updated_at: {type: Date, default: new Date},
})
var DonationsSchema = new mongoose.Schema({
	_task: {type: Schema.ObjectId, ref: 'Task'},
	_user: {type: Schema.ObjectId, ref: 'User'},
	hours: Number,
	pledge: Number,
	total: Number,
	created_at: {type: Date, default: new Date},
	updated_at: {type: Date, default: new Date},
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
	_task: {type: Schema.ObjectId, ref:"Task"}
})

mongoose.model('UserTask', UserTaskSchema)
mongoose.model('User', UserSchema);
mongoose.model('Task', TasksSchema);
mongoose.model('Donation', DonationsSchema);
mongoose.model('Charity', CharitiesSchema);