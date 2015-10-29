var DIM = DIM || {};

DIM.readyItemState = function(myName, destName){
	var itemStateCopy = DIM.itemState;
	itemStateCopy[1].right.id = myName;
	itemStateCopy[2].left.id = myName;
	itemStateCopy[2].right.id = myName;
	itemStateCopy[3].left.id = myName;
	itemStateCopy[3].right.id = destName;
	itemStateCopy[4].left.id = destName;
	itemStateCopy[4].right.id = destName;
	itemStateCopy[5].left.id = destName;
	return itemStateCopy;
};

DIM.promiseWhile = function(body, start, end) {
	var done = Q.defer();
	var direction = null;
	var inc = null;
	if (start > end) {
		direction = "left";
		inc = -1;
	} else {
		direction = "right";
		inc = 1;
	}
	start = start - inc;

	function loop() {
		if(arguments.length !== 0){
			var res = JSON.parse(arguments[0].responseText);
			console.log(res.Message);
		}
		start = start + inc;
    if (start === end) return done.resolve();
    body(start, end, direction).then(loop, done.reject);
	}

	setTimeout(loop, 0);

	return done.promise;
};

DIM.unequip = function(charId, itemId, itemHash, itemBucket, char){

	//find all items in current pocket
	var pocketItems = _.filter(DIM.inventory, function(item){
		return (
			item.location.name === charId &&
			item.bucket.bucketHash === itemBucket &&
			item.instanceId !== itemId &&
			item.levelReq <= char.characterLevel &&
			(item.klassType === char.characterBase.classType || item.klassType === 3)
		);
	});

	pocketItems = pocketItems.sort(function(a, b){
		var key = Object.keys(a.primaryStat)[0];
		if(a.primaryStat[key] > b.primaryStat[key]){
			return -1;
		}
		if(a.primaryStat[key] < b.primaryStat[key]){
			return 1;
		}
		return 0;
	});

	if (pocketItems.length !== 0){
		return DIM.equip(charId, pocketItems[0].instanceId);
	}

	var vaultItems = _.filter(DIM.inventory, function(item){
		return (
			item.location.name === "Vault" &&
			item.bucket.bucketHash === itemBucket &&
			item.levelReq <= char.characterLevel &&
			(item.klassType === char.characterBase.classType || item.klassType === 3) &&
			!item.typeName.includes("Engram") &&
			!item.typeName.includes("Armsday")
		);
	});

	vaultItems = vaultItems.sort(function(a, b){
		var key = Object.keys(a.primaryStat)[0];
		if(a.primaryStat[key] > b.primaryStat[key]){
			return -1;
		}
		if(a.primaryStat[key] < b.primaryStat[key]){
			return 1;
		}
		return 0;
	});

	if (vaultItems.length !== 0){
		return DIM.fromVault(charId, itemId, itemHash).then(DIM.equip(charId, itemId));
	}
	
};

DIM.equip = function(charId, itemId){
	var url = "https://www.bungie.net/Platform/Destiny/EquipItem/";
	var dataHash = {
		"membershipType": 1,
    "itemId": itemId,
    "characterId": charId,
	};
	var postReq = qwest.post(url, dataHash, {
		"dataType": "json",
		"headers": {
			"X-API-KEY": DIM.apiKey,
			"X-CSRF": DIM.csrf
		}
	});

	return Q(postReq);
};

DIM.toVault = function(charId, itemId, itemHash){

	var url = "https://www.bungie.net/Platform/Destiny/TransferItem/";
	var dataHash = {
		"membershipType": 1,
    "itemReferenceHash": itemHash,
    "itemId": itemId,
    "stackSize": 1,
    "characterId": charId,
    "transferToVault": true
	};
	var postReq = qwest.post(url, dataHash, {
		"dataType": "json",
		"headers": {
			"X-API-KEY": DIM.apiKey,
			"X-CSRF": DIM.csrf
		}
	});

	return Q(postReq);

};

DIM.fromVault = function(charId, itemId, itemHash){

	var url = "https://www.bungie.net/Platform/Destiny/TransferItem/";
	var dataHash = {
		"membershipType": 1,
    "itemReferenceHash": itemHash,
    "itemId": itemId,
    "stackSize": 1,
    "characterId": charId,
    "transferToVault": false
	};
	var postReq = qwest.post(url, dataHash, {
		"dataType": "json",
		"headers": {
			"X-API-KEY": DIM.apiKey,
			"X-CSRF": DIM.csrf
		}
	});

	return Q(postReq);

};