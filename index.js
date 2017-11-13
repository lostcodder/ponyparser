var Promise = require('bluebird')
var request = require("request")

class PonyParser {
	constructor () {
		this.jar = request.jar();
	}

	cfg(o) {
		if (typeof o != 'object'){
			o = {url: o}
		} 

		return o
	}

	do (o) {
		o.jar = this.jar	
		return new Promise((resolve, reject) => {
			request(o, (e, r, b)=>{
				if (!e) {
					resolve(b)
				} else {
					reject(e)
				}
			})
		})
	}

	get (o) {
		o = this.cfg(o)
		o.method = 'GET'
		return this.do (o) 
	}

	post (o) {
		o = this.cfg(o)
		o.method = 'POST'
		return this.do (o) 
	}
}

module.exports = PonyParser