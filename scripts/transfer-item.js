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

	function loop(start, end) {
    if (start === end) return done.resolve();
    Q.when(body(start, end, direction), loop(start + inc, end), done.reject);
	}

	setTimeout(loop, 0, start, end);

	return done.promise;
};

DIM.unequip = function(charId, itemId, itemHash, itemBucket, char){

	var guy = _.find(DIM.charactersInv, function(guy){
		return guy.characterId === charId;
	});
	var bucket = _.find(guy.buckets.Equippable, function(bucket){
		return bucket.bucketHash === itemBucket;
	});
	debugger

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