set path=%path%;C:\NodeJS;C:\MySQL\bin

start cmd /k "mysqld --console"
nodemon server.js