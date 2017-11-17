var Promise = require('bluebird')
var request = require("request")

class PonyParser {
	constructor (p = {}) {
		this.p = p
		this.jar = request.jar();
	}

	cfg(o) {
		if (typeof o != 'object'){
			o = {url: o}
		} 

		for (var i in this.p) {
			o[i] = this.p[i]
		}

		return o
	}

	do (o) {
		o.jar = this.jar	
		return new Promise((resolve, reject) => {
			request(o, (e, r, b)=>{
				if (!e) {
	                Object.defineProperty(r, "text",{enumerable: false, writable: true});
	                r.text = () =>{
	                    return b
	                }  

	                Object.defineProperty(r, "data",{enumerable: false, writable: true});
	                r.data = () =>{
	                    return JSON.parse(b)
	                }  
					resolve(r)
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