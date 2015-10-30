

var DIM = DIM || {};

DIM.apiKey = "17046260b2014770afb509a3e96a1fe2";
DIM.csrf = null;

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

DIM.inventory = [];
DIM.invCount = 0;

DIM.ignoredStats = ["Inventory Size", "Light"];

DIM.damageType = {};
DIM.damageType[0] = "None";
DIM.damageType[1] = "Kinetic";
DIM.damageType[2] = "Arc";
DIM.damageType[3] = "Solar";
DIM.damageType[4] = "Void";

DIM.itemState = {};
DIM.itemState[1] = {left: {}, right: {
	"action": "unequip"
}};
DIM.itemState[2] = {left: {
	"action": "equip"
}, right: {
	"action": "toVault"
}};
DIM.itemState[3] = {left: {
	"action": "fromVault"
}, right: {
	"action": "fromVault"
}};
DIM.itemState[4] = {left: {
	"action": "toVault"
}, right: {
	"action": "equip"
}};
DIM.itemState[5] = {left: {
	"action": "unequip"
}, right: {}};