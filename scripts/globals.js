var DIM = DIM || {};

qwest.get('../api-manifest/items.json')
.then(function(xhr, res){
	DIM.items = JSON.parse(res);
	console.log("items ready");
});

qwest.get('../api-manifest/talent.json')
.then(function(xhr, res){
	DIM.talent = JSON.parse(res);
	console.log("talent ready");
});

qwest.get('../api-manifest/buckets.json')
.then(function(xhr, res){
	DIM.talent = JSON.parse(res);
	console.log("bucket ready");
});

DIM.categoryMapping = {};
DIM.categoryMapping["scout-rifle"] = "Scout Rifle";
DIM.categoryMapping["sniper-rifle"] = "Sniper Rifle";