const http = require('https');
const fs = require('fs');

const url = 'https://d241.userscloud.net/d/hul73tugtn2fvxijjtm4xdqgd7ex3hklwgsh3bknrk2pu6e2j4vvqgdonm66rttefjbki3wt/.env'; // Replace with the actual URL of the remote file
const localFilePath = '../wa-bot-ce/.env'; // Replace with the desired local file path

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