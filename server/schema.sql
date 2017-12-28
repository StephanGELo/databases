CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  id INTEGER NOT NULL AUTO_INCREMENT,
  text VARCHAR(200) NOT NULL,
  userId INTEGER NOT NULL,
  roomname VARCHAR(30) NOT NULL,
  PRIMARY KEY (ID)
);

/* Create other tables and define schemas for them here! */
CREATE TABLE users (
  id INTEGER NOT NULL AUTO_INCREMENT,
  username VARCHAR(30) NOT NULL,
  PRIMARY KEY (ID)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

 /*
 This is the line that works: 
 mysql -u root < + \. (sourse - execute an SQL script file. takes a file name as an argument)
 + absolute path to file.sql, that is:

 mysql -u root < \. /Users/Blackeagle/Desktop/hrsf88-databases copy/server/schema.sql
 */