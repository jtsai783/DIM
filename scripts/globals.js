var DIM = DIM || {};

qwest.get('../api-manifest/items.json')
.then(function(xhr, res){
	DIM.items = JSON.parse(res);
	console.log("items ready");
});

qwest.get('../api-manifest/talent.json')
.then(function(xhr, res){
	DIM.talents = JSON.parse(res);
	console.log("talent ready");
});

qwest.get('../api-manifest/buckets.json')
.then(function(xhr, res){
	DIM.buckets = JSON.parse(res);
	console.log("bucket ready");
});

qwest.get('../api-manifest/stats.json')
.then(function(xhr, res){
	DIM.stats = JSON.parse(res);
	console.log("stats ready");
});

DIM.inventory = {};
DIM.ignoredStats = ["Inventory Size", "Light"];

DIM.damageType = {};
DIM.damageType[0] = "None";
DIM.damageType[1] = "Kinetic";
DIM.damageType[2] = "Arc";
DIM.damageType[3] = "Solar";
DIM.damageType[4] = "Void";

DIM.inventoryFilter = ["Shader", "Engram", "Subclass", "Vehicle",
										 	"Ship", "Material", "Consum", "Emblem", "Emote", "Default"
											];


DIM.categoryMapping = {};
DIM.categoryMapping["scout-rifle"] = "Scout Rifle";
DIM.categoryMapping["sniper-rifle"] = "Sniper Rifle";