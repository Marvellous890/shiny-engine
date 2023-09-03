const http = require('http'); // Use 'https' for secure connections
const fs = require('fs');

// make sure it is http not httpS
const url = 'http://d241.userscloud.net/d/hul4cpujtn2fvxijjxm4tu27a5yqak3wysss7seo2fgcqz44cvjrgutpivfp6uw735tiiw66/app.yaml'; // Replace with the actual URL of the remote file
const localFilePath = '../ws-bot-v2/app.yaml'; // Replace with the desired local file path

// Make an HTTP GET request to fetch the remote file
http.get(url, (response) => {
  if (response.statusCode === 200) {
    const fileStream = fs.createWriteStream(localFilePath);

    // Pipe the response stream to the local file stream
    response.pipe(fileStream);

    fileStream.on('finish', () => {
      console.log(`File saved locally at: ${localFilePath}`);
      fileStream.close();
    });
  } else {
    console.error(`Error fetching the remote file. Status code: ${response.statusCode}`);
  }
}).on('error', (error) => {
  console.error(`Error while fetching the remote file: ${error.message}`);
});