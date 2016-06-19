#### Rankings Table

For use:

````
$ git clone https://github.com/sivanpatel/rankings_table 
$ cd rankings_table
$ npm install
$ bower install
$ http-server
````
Visit: http://localhost:8080

To run the tests:

1.For Karma (unit) tests:
````
$ karma start test/unit/karma.conf.js
````

2.For Protractor (feature) tests:
In separate terminal windows
````
$ webdriver-manager start
$ http-server
$ protractor test/e2e/conf.js
````
If the protractor tests fail without running, you may need to update your version of node to the latest stable version, found here: http://nodejs.org
#### File Structure

* The bulk of the code can be found inside the js folder - with rankingsController.js having the majority of the logic
* The tests can be found in the test file, separated into two files, one for unit testing (unit), and one for feature testing (e2e)
````
  ├── README.md
  ├── bower.json
  ├── bower_components
  ├── node_modules
  ├── css
  │   └── style.css
  ├── index.html
  ├── js
  │   ├── app.js
  │   ├── combination.js
  │   ├── match.js
  │   ├── rankingsFactory.js
  │   └── rankingsController.js
  ├── package.json
  ├── rankings.json
  └── test
      ├── e2e
      │   ├── conf.js
      │   └── predictorFeature.js
      └── unit
          ├── karma.conf.js
          └── rankingsController.spec.js`
````
#### My approach
* I created a simple JSON file to store the product information in, and used a factory to incorporate that data in my app
* I decided to use AngularJS for the development of this
* The development was test driven using Karma for the unit tests and Protractor for the feature tests

#### Things to do
* Reinstate tests that failed due to extracting json retrieval to a factory
* More feature testing, pretty basic tests at the moment
* More styling - fairly barebones at the moment

