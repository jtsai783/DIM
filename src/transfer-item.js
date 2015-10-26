var DIM = DIM || {};

DIM.apiKey = "17046260b2014770afb509a3e96a1fe2";

DIM.transferItem = function(charId, itemId, itemHash, toVault ){

	var url = "https://www.bungie.net/Platform/Destiny/TransferItem/";
	var dataHash = {
		"membershipType": 2,
    "itemReferenceHash": itemHash,
    "itemId": itemId,
    "stackSize": 1,
    "characterId": charId,
    "transferToVault": toVault 
	};
	var data = JSON.stringify(dataHash);
	var postReq = qwest.post(url, data, {
		"dataType": "json",
		"headers": {
			"X-API-KEY": that.apiKey
		}
	});

	return Q(postReq);

};