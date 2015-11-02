var DIM = DIM || {};

DIM.readyItemState = function(myName, destName, myIcon, destIcon){
	var itemStateCopy = _.clone(DIM.itemState);
	itemStateCopy[1].right.id = myName;
	itemStateCopy[1].right.locName = myName;
	itemStateCopy[1].right.isEquipped = false;
	itemStateCopy[1].right.icon = myIcon;


	itemStateCopy[2].left.id = myName;
	itemStateCopy[2].left.locName = myName;
	itemStateCopy[2].left.isEquipped = true;
	itemStateCopy[2].left.icon = myIcon;

	itemStateCopy[2].right.id = myName;
	itemStateCopy[2].right.locName = "Vault";
	itemStateCopy[2].right.isEquipped = false;
	itemStateCopy[2].right.icon = "../myicons/vault.png";


	itemStateCopy[3].left.id = myName;
	itemStateCopy[3].left.locName = myName;
	itemStateCopy[3].left.isEquipped = false;
	itemStateCopy[3].left.icon = myIcon;

	itemStateCopy[3].right.id = destName;
	itemStateCopy[3].right.locName = destName;
	itemStateCopy[3].right.isEquipped = false;
	itemStateCopy[3].right.icon = destIcon;


	itemStateCopy[4].left.id = destName;
	itemStateCopy[4].left.locName = "Vault";
	itemStateCopy[4].left.isEquipped = false;
	itemStateCopy[4].left.icon = "../myicons/vault.png";

	itemStateCopy[4].right.id = destName;
	itemStateCopy[4].right.locName = destName;
	itemStateCopy[4].right.isEquipped = true;
	itemStateCopy[4].right.icon = destIcon;


	itemStateCopy[5].left.id = destName;
	itemStateCopy[5].left.locName = destName;
	itemStateCopy[5].left.isEquipped = false;
	itemStateCopy[5].left.icon = destIcon;

	return itemStateCopy;
};

DIM.promiseWhile = function(body, start, end, card, itemState) {
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
			if (res.Message === "Ok"){
				card.set("item.isEquipped", itemState[start][direction].isEquipped);
				card.set("item.location.name", itemState[start][direction].locName);
				card.set("item.location.icon", itemState[start][direction].icon);
			}
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

	

	if (pocketItems.length !== 0){
		// var pivot = pocketItems[0];
		// var itemOnPage = DIM.invRef.$$("#id-" + pivot.id);
		// if(itemOnPage){
		// 	var state = {
		// 		2: {
		// 			left: {
		// 				locName: charId,
		// 				isEquipped: true,
		// 				icon: "http://www.bungie.net/" + char.emblemPath
		// 			}
		// 		}
		// 	};
		// 	debugger
		// 	DIM.promiseWhile(function(){
		// 		return DIM.equip(charId, pivot.instanceId);
		// 	}, 2, 1, itemOnPage, state);
		// }
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




	if (vaultItems.length !== 0){
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
		return DIM.fromVault(charId, vaultItems[0].instanceId, vaultItems[0].itemHash).then(DIM.equip(charId, vaultItems[0].instanceId));
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