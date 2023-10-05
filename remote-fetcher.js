const http = require('https');
const fs = require('fs');

const url = 'https://d3174.userscloud.net/d/ael7cy4btn2fvxijvdninwigd3uvyumclbqy2hxx45aohun2axdhyim6rkmdwjbu5tpkkrmp/guru.data.json'; // Replace with the actual URL of the remote file
const localFilePath = '../GURU-BOT/guru.data.json'; // Replace with the desired local file path

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