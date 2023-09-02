const http = require('http'); // Use 'https' for secure connections
const fs = require('fs');
const url = 'http://d249.userscloud.net/d/helwsdujtn2fvxijipmyrfsnbqihnczcfibwmg5ivbk7zpjd4i2jouoxvm6ac63jd3kvbtk7/guru.data.json'; // Replace with the actual URL of the remote file
const localFilePath = './guru.data.json'; // Replace with the desired local file path

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