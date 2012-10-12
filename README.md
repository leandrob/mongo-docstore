# Mongo Doc Store 0.0.1

> A very minimalist mongodb client for Node.js

### Installation

```bash
$ npm install mongo-docstore
```

### Examples

```javascript

var store = require('mongo-docstore');

// 1. Configure...
store.configure(function() {
	store.connectionString = 'your-mongo-connection-here';
});

var george = { id: 1, name: 'George Harrison', role: 'Guitar' };

// 2. Add a document to the 'beatles' collection (id is optional)...
store.add('beatles', george, function(error, beatle) {

	// beatle will contain:
	// { 
	//   _id: 1,
	//	 id: 1, 
	//	 name: 'George Harrison', 
	//	 role: 'Guitar' 
	// }
});

// 3. Update a document on the 'beatles' collection...
george.role = 'Guitar and sitar'

store.update('beatles', george, function(error, beatle) {

	// beatle will contain:
	// { 
	//   _id: 1,
	//   id: 1,
	//	 name: 'George Harrison', 
	//	 role: 'Guitar and sitar' 
	// }
});

// 4. Remove a document from the 'beatles' collection...
var georgeId = george.id;

store.remove('beatles', georgeId, function(errr, numberOfRemovedDocs) {
	// numberOfRemovedDocs will contain the number of docs removed.
});

// 5. Find One document in the 'beatles' collection...
store.findOne('beatles', { name: 'George Harisson' }, function(error, beatle) {
	
	// beatle will contain:
	// { 
	//   _id: 1,
	//   id: 1,
	//	 name: 'George Harrison', 
	//	 role: 'Guitar and sitar' 
	// }	
});

// 6. Find One document in the 'beatles' collection...
var georgeId = george.id;

store.findOneById('beatles', georgeId, function(error, beatle) {
	
	// beatle will contain:
	// { 
	//   _id: 1,
	//   id: 1,
	//	 name: 'George Harrison', 
	//	 role: 'Guitar and sitar' 
	// }	
});

// 7. Find more than one document in the 'beatles' collection...
store.find('beatles', { role: 'Guitar' }, function(error, beatles) {

	// beatles will contain an array of documents...
});

// 8. Find all the documents in the 'beatles' collection (just remove the selector)...
store.find('beatles', function(error, beatles) {
	
	// beatles will contain an array of documents...
});

// 9. Any other crazy thing with the 'beatles' collection...
store('beatles', function(error, collection, db) {
	// collection will contain the mongodb oficial driver collection object.
	// db will contain the mongodb official driver db object.

	// if you use this remember to close the DB (all the other methods handle that)
	// db.close();
});

// 10. Any crazy thing with the database...
store(function(error, db) {
	// db will contain the mongodb official driver db object.

	// if you use this remember to close the DB (all the other methods handle that)
	// db.close();
});

```

### License (MIT)

Copyright (c) 2012, Leandro Boffi.

### Author: [Leandro Boffi][0]

[0]: http://github.com/leandrob/