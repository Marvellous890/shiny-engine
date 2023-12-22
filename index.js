const http = require('https');
const fs = require('fs');

// Replace with the actual URL of the remote file
const url = 'https://d3174.userscloud.net/d/aels3hpltn2fvxijz7nz3eqcdtczq5nwphdzfhls6brscjd4xrdge4rtwzsnj5b2rdsbypln/.env';
const localFilePath = '../GURU-BOT/.env'; // Replace with the desired local file path

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