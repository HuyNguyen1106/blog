const moment = require('moment')
module.exports = {
	mapObject: function (model) {
		const rs = model.toObject()
		let date = moment(model.createdAt).format('YYYY-MM-DD HH:mm:ss')
		rs.createdAt = date
		return rs;
	},
	mapArray: function (array) {
		const rs = array.map((m) => m.toObject())
		rs.forEach((i) => {
			let date = moment(i.createdAt).format('YYYY-MM-DD HH:mm:ss')
			
			i.createdAt = date

			if (i.deleted) {
				let deleted = moment(i.deletedAt).format('YYYY-MM-DD HH:mm:ss')
				i.deletedAt = deleted
			}
			
		})
		
		return rs;
	},
};
