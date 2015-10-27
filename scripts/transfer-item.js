var DIM = DIM || {};

DIM.apiKey = "17046260b2014770afb509a3e96a1fe2";
DIM.csrf = null;

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

DIM.promiseWhile = function promiseWhile(body, start, end) {
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
	    // When the result of calling `condition` is no longer true, we are
	    // done.
	    if (start === end) return done.resolve();
	    // Use `when`, in case `body` does not return a promise.
	    // When it completes loop again otherwise, if it fails, reject the
	    // done promise
	    Q.when(body(start, end, direction), loop(start + inc, end), done.reject);
	}

	// Start running the loop in the next tick so that this function is
	// completely async. It would be unexpected if `body` was called
	// synchronously the first time.
	setTimeout(loop, 0, start, end);

	// The promise
	return done.promise;
};

DIM.unequip = function(charId, itemId){

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