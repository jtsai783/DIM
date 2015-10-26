

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

DIM.characters = null;

DIM.ignoredStats = ["Inventory Size", "Light"];

DIM.damageType = {};
DIM.damageType[0] = "None";
DIM.damageType[1] = "Kinetic";
DIM.damageType[2] = "Arc";
DIM.damageType[3] = "Solar";
DIM.damageType[4] = "Void";

DIM.inventoryFilter = [
	"Shader", "Engram", "Subclass", "Vehicle", "Ship", "Material", "Consum",
	"Emblem", "Emote", "Default"
];

DIM.filterMapping = {};
DIM.filterMapping["scout-rifle"] = ["Scout Rifle", "All"];
DIM.filterMapping["auto-rifle"] = ["Auto Rifle", "All"];
DIM.filterMapping["hunter-class-armor"] = ["Class Armor", "Hunter"];
DIM.filterMapping["fusion-rifle"] = ["Fusion Rifle", "All"];
DIM.filterMapping["sword"] = ["Sword", "All"];
DIM.filterMapping["shotgun"] = ["Shotgun", "All"];
DIM.filterMapping["hunter-artifact"] = ["Artifact", "Hunter"];
DIM.filterMapping["hunter-helmet"] = ["Helmet", "Hunter"];

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
	"action": "uneqip"
}, right: {}};