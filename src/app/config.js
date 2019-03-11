console.log('Environment :: ' + process.env.NODE_ENV )

let CONFIG = {
	//base_node_url :"https://api.ddriven.xyz/api/tag/tagdata",
	base_node_url :"http://localhost:3000/api/tag/tagdata",
	base_url: "https://api.signal.ddriven.in:1111/trender/signals",
	base_api_url : "https://api.signal.ddriven.in:1111/trender",
	 BASE_URL: "https://api.ddriven.xyz/api",
	//BASE_URL: "http://192.168.0.90:3000/api",
	trenderURL :"http://trender.ddriven.xyz",
	workbenchURL :"http://workbench.ddriven.xyz",
	//trenderURL :"http://localhost:8081/",
	maxReductionPoints:250,
	RepresentationAlgorithm: "average",
	limit:250
}



export default CONFIG