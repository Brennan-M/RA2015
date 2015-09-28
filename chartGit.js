var gh = require('octonode');
var fs = require('fs');
var request = require('request');

var client = gh.client();
var infoRepo = process.argv[2];
var ghrepo = client.repo(infoRepo);


getRepoIssuesStats();

function getRepoIssuesStats(count, cur_page) {
  if (cur_page == null) {cur_page = 1};
  if (count == null) {count = 0};

  ghrepo.issues({page: cur_page, per_page: 100, state: "open"},
                function(err, data, headers) {
    if (err) {
      console.log(err);
    } else {
      if (data.length === 0) {
        console.log(count + ' Issues Stored in File.');
      } else {
        count += data.length;
        fs.writeFile("jsonDump.txt", JSON.stringify(data), function(err) {
        	if (err) {
        		return console.log(err);
        	}
        	console.log("Saving json data to 'jsonDump.txt'...");
        });
        getRepoIssuesStats(count, cur_page+1);
      }
    }
  });
};