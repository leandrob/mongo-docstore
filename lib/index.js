// mongo-docstore, yes this is all...
var mongodb = require('mongodb');

module.exports = store = function(collectionName, cb) {

	store.exec(function(err_db, db) {

		if (err_db) { 
			db.close();
			cb(err_db);
			return; 
		}

		db.collection(collectionName, function(err_collection, collection) {
			cb(err_collection, collection, db);
		});
	});
}

store.exec = function (cb) {
	
	if (!store.connectionString) {
		throw 'Please set the connectionstring...';
	};

	mongodb.Db.connect(store.connectionString, cb);
};

store.add = function(collectionName, doc, add_cb) {

	store(collectionName, function(err, collection, db) {

		if (err) { 
			db.close();
			add_cb(err); 
			return; 
		}

		if(doc.id && doc.id != 0) {
			doc["_id"] = doc.id;
		}

		collection.insert(doc, function(err_insert, result) {

			db.close();

			if (err_insert || !result) { 
				add_cb(err_insert, result); 
				return; 
			}

			add_cb(err, result[0])
		});
	});
};

store.update = function(collectionName, doc, update_cb) {
	
	store(collectionName, function(err, collection, db) {

		if (err) { 
			update_cb(err); 
			return; 
		}

		if(doc.id && doc.id != 0) {
			doc._id = doc.id;
		}		

		var mongoId = doc._id;

		delete doc._id;

		collection.update(
			{ _id : mongoId }, 
			{ $set: doc }, 
			{ upsert: true, safe: true }, 
			function(err_update, result) {

				db.close();

				console.log(JSON.stringify(result));

				if (err_update || !result) { 
					update_cb(err_update, result); 
					return; 
				}

				doc._id = mongoId;

				update_cb(err_update, doc);
			});
	});
}

store.findOne = function(collectionName, selector, get_cb) {

	store(collectionName, function(err, collection, db) {

		if (err) { 
			get_cb(err); 
			return; 
		}

		collection.findOne(selector, function(find_err, result) {
			db.close();
			get_cb(find_err, result);
		});
	});
}

store.findOneById = function(collectionName, id, get_cb) {

	store(collectionName, function(err, collection, db) {

		if (err) { 
			get_cb(err); 
			return; 
		}

		var BSON = mongodb.BSONPure;
		var o_id = new BSON.ObjectID(id);

		collection.findOne({ _id: o_id }, function(find_err, result) {
			db.close();
			get_cb(find_err, result);
		});
	});
}

store.find = function(collectionName, selector, get_cb) {

	if (typeof selector == 'function') {
		//then selector is the callback and there is no selector.
		get_cb = selector;
		selector = null;
	};


	store(collectionName, function(err, collection, db) {

		if (err) { 
			get_cb(err); 
			return; 
		}

		collection.find(selector).toArray(function(find_err, result) {
			db.close();
			get_cb(find_err, result);
		});
	});
}

store.removeById = function(collectionName, id, remove_cb) {

	store(collectionName, function(err, collection, db) {

		if (err) { 
			remove_cb(err); 
			return; 
		}
		
		var BSON = mongodb.BSONPure;
		var o_id = new BSON.ObjectID(id);

		collection.remove({ _id: o_id }, function(find_err, numberOfRemovedDocs) {
			db.close();
			remove_cb(find_err, numberOfRemovedDocs);
		});
	});
}

store.version = '0.0.2';


