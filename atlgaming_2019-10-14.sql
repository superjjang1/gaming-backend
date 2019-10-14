# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.27)
# Database: atlgaming
# Generation Time: 2019-10-14 18:07:49 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table bracket
# ------------------------------------------------------------

DROP TABLE IF EXISTS `bracket`;

CREATE TABLE `bracket` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `tid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table community
# ------------------------------------------------------------

DROP TABLE IF EXISTS `community`;

CREATE TABLE `community` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  `type` varchar(50) NOT NULL DEFAULT '',
  `description` varchar(400) NOT NULL DEFAULT '',
  `uid` int(11) unsigned NOT NULL,
  `joined` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reluser` (`uid`),
  CONSTRAINT `reluser` FOREIGN KEY (`uid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `community` WRITE;
/*!40000 ALTER TABLE `community` DISABLE KEYS */;

INSERT INTO `community` (`id`, `name`, `type`, `description`, `uid`, `joined`)
VALUES
	(1,'The Big Ones','casual','Casual community trying to beat games!',4,NULL),
	(2,'Big Things Poppin','casual','Beating them Gamez',4,NULL),
	(3,'The big ones','combination','we\'re getting competitive',4,NULL),
	(4,'Extras','casual','Just want to finish games with others',4,NULL),
	(5,'Hello?','casual','is there anyone there?',4,NULL),
	(6,'Something should be made','casual','We do a lot of things casually, sometimes it\'s a little different but what we do is always different. We\'re the best somethings in the world.',5,NULL),
	(7,'We\'re doing something special','competitive','Trying to become god gamers',5,NULL),
	(8,'123 users','competitive','We\'re going to be the best',6,NULL),
	(9,'Some powerful memes','casual','becoming the worst gamers on the planet',6,NULL),
	(10,'Something should happen','casual','Very casual',7,NULL),
	(20,'Hello? ','competitive','We\'re doing stuff',5,NULL),
	(21,'Hey','casual','I did',5,NULL),
	(23,'Making it big','casual','Hopefully doing something',8,NULL),
	(25,'I\'m making things','casual','What\'s going on',5,NULL),
	(27,'The only ones','casual','The only ones playing right',5,NULL),
	(28,'Woooooo Big Power','competitive','So POWERFUL',9,NULL),
	(29,'Helloo new community','casual','hurdurr',9,NULL),
	(30,'TestingThings','competitive','Doing a Test',9,NULL),
	(31,'WORK DAMMIT','casual','IS IT WORKING?',9,NULL),
	(47,'MOAR COMMUNITIES','competitive','WHAT?  3',9,NULL),
	(48,'Some Power test','casual','we\'re testing things',10,NULL);

/*!40000 ALTER TABLE `community` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table communityUsers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `communityUsers`;

CREATE TABLE `communityUsers` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `UID` int(10) unsigned NOT NULL,
  `CID` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `communIdUserId` (`UID`),
  KEY `communityUzer` (`CID`),
  CONSTRAINT `communIdUserId` FOREIGN KEY (`UID`) REFERENCES `users` (`id`),
  CONSTRAINT `communityUzer` FOREIGN KEY (`CID`) REFERENCES `community` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `communityUsers` WRITE;
/*!40000 ALTER TABLE `communityUsers` DISABLE KEYS */;

INSERT INTO `communityUsers` (`id`, `UID`, `CID`)
VALUES
	(1,4,1),
	(2,9,30),
	(3,9,47),
	(4,10,48),
	(5,4,48);

/*!40000 ALTER TABLE `communityUsers` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table tournament
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tournament`;

CREATE TABLE `tournament` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) unsigned NOT NULL,
  `name` varchar(60) NOT NULL,
  `bid` int(11) DEFAULT NULL,
  `game` varchar(60) NOT NULL DEFAULT '',
  `url` varchar(60) NOT NULL DEFAULT '',
  `description` varchar(400) NOT NULL DEFAULT '',
  `participants` int(2) NOT NULL,
  `date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date1` varchar(11) NOT NULL DEFAULT '',
  `time` varchar(11) NOT NULL DEFAULT '',
  `date2` varchar(11) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `tournament_ibfk_1` (`uid`),
  CONSTRAINT `tournament_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `tournament` WRITE;
/*!40000 ALTER TABLE `tournament` DISABLE KEYS */;

INSERT INTO `tournament` (`id`, `uid`, `name`, `bid`, `game`, `url`, `description`, `participants`, `date_added`, `date1`, `time`, `date2`)
VALUES
	(3,4,'Please work',NULL,'why','whelp','123game',8,'2019-10-11 14:00:59','2019-10-05','00:00:00','2019-10-06'),
	(4,4,'Please work',NULL,'why','whelp','123game',8,'2019-10-11 14:01:01','2019-10-05','00:00:00','2019-10-06'),
	(5,4,'Please work',NULL,'why','whelp','123game',8,'2019-10-11 14:01:02','2019-10-05','00:00:00','2019-10-06'),
	(6,4,'Please work',NULL,'why','whelp','123game',8,'2019-10-11 14:01:03','2019-10-05','00:00:00','2019-10-06'),
	(16,1,'This is a tournament',NULL,'Using our Fists','What?','hey, we\'re going to fight using our fists.',16,'2019-10-13 18:53:46','2019-10-31','13:00','2019-11-01'),
	(17,4,'WOW New TOURNAMENT',NULL,'Super Bootleg Brothers','hahhahhahhahahhahhhhaha not using it','we\'re not actually playing smash, we\'re going to punch each other in the face',8,'2019-10-14 11:43:47','2019-10-14','22:00','2019-10-14');

/*!40000 ALTER TABLE `tournament` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `first` varchar(50) NOT NULL DEFAULT '',
  `last` varchar(50) NOT NULL DEFAULT '',
  `email` varchar(50) NOT NULL DEFAULT '',
  `pass` varchar(60) NOT NULL DEFAULT '',
  `token` varchar(60) DEFAULT NULL,
  `date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `displayname` varchar(50) NOT NULL DEFAULT '',
  `profile` varchar(200) DEFAULT NULL,
  `imageUrl` varchar(100) DEFAULT NULL,
  `bannerUrl` varchar(100) DEFAULT NULL,
  `community` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `first`, `last`, `email`, `pass`, `token`, `date_added`, `date_updated`, `displayname`, `profile`, `imageUrl`, `bannerUrl`, `community`)
VALUES
	(1,'Email','Man','email@email.com','$2a$10$LO6Yp8m.0kTRgx6pv9PT3umMGKXVCcJd0PO/Ha.vXQTK/I8hrTqXS','BtiIa6c008YcYKdUIIHP7QbpL7bykaEQdio8geyjgZtW1tlO6B','2019-10-02 14:46:48','2019-10-13 19:13:00','emailboy','Working?','/images//hero_1570821655183.jpg','/images//smile-symbol-1-1305970-640x640_1570821655183.jpg',NULL),
	(4,'Red','Man','red@gmail.com','$2a$10$.i2O0x9sXuGX7g4Z24V6wuD/tKEZb8Ua4JM/IsEiv2c8qyCw4TWEa','5Dae94J8QXlB8ShG5DUnWMYlDqgXbAgrKT9Qf1yEDcaBte1rXC','2019-10-03 10:59:45','2019-10-14 12:01:11','RedMan','working?','/images//smile-symbol-1-1305970-640x640_1570647928191.jpg','/images//hero_1570647928191.jpg',NULL),
	(5,'Something','Man','Something@something.com','$2a$10$KWroe/joP.tXKQgt.oEt1ufuTimgsQpDveuZao6SnTha29WQzG8rS','DkUniNqjp5u4oC59BNqnaxLHlsTH4zR2dkUBCBb0V0utpU9Fcw','2019-10-10 12:42:22','2019-10-11 14:26:38','Something42','I\'m the best gamer in the world!','/images//smile-symbol-1-1305970-640x640_1570807484668.jpg','/images//hero_1570807484669.jpg',NULL),
	(6,'123','User','123@gmail.com','$2a$10$hHslmw1lSrao6ML5poB3h.5cRzIsd4Aopro.6JB.TIsM4bmJdbgjW','lw5hf2xWleeXdJpQXkXQOTiesaC5JmbVk6L2CR2aySI0gzMl5Y','2019-10-11 11:08:21','2019-10-11 15:26:43','123User',NULL,'','',NULL),
	(7,'RedRocket','RedRocket','redRocket@gmail.com','$2a$10$deQmVgZVGwewWnE0DNtFBeilJlC/YIr6LJkQoP4rhYD6NiaW.00WO','ml9dWEESvAhBqYIlAIJH6VjYvdGuR0HUtWK51smycbYNVfGZpY','2019-10-11 11:12:31','2019-10-11 15:26:46','RedRocket',NULL,'','',NULL),
	(8,'Blue','Man','Blue1@gmail.com','$2a$10$UsFLq8ZZDR9myxueLn7cCOiOsSWmdugHLE4bNpOc3UqgVKSNKgS5y','alyzU32B9gMlIYL8QJEaJJtouy7C8CyGLAACeuTfqVVsG374Jl','2019-10-11 13:47:50','2019-10-11 13:48:54','BlueMan','Hello?','/images//smile-symbol-1-1305970-640x640_1570816105535.jpg','/images//wp4088585-rei-kiriyama-wallpapers_1570816105535.jpg',NULL),
	(9,'Dude','Hello','hello@hello.com','$2a$10$3WuppbpWdnhe65KGKAf5COYH7N/uWFVgu4F2CTHdQ3E0wAMPirMJa','9rczLf2WKlS54KDY18X6S4fPES3hldP1xFUq70dNNt7TmeQC9A','2019-10-11 15:24:46','2019-10-11 16:09:18','HelloDude',NULL,NULL,NULL,NULL),
	(10,'Orange','Man','orange@orange.com','$2a$10$LIToXjnYSCbGgOiHbIWBlOXqrLUdwGlraR946qwEd0m0BCkmcziC.','iaI1TPcBolzZ9aoPjGAU31uRArrIjeWGfl5oTswUzf0NlMgQrY','2019-10-13 12:31:15','2019-10-13 15:10:08','OrangeMan',NULL,NULL,NULL,NULL),
	(11,'Cool','Man','Cool@gmail.com','$2a$10$g6fEeB3eNR3qX1WCTLKlXuNDX9KzAud0NRUPp3z9FdY4jVJKfsvFa','YNgBm0GsCwpMpDxdObEJrhBrWtOL28R7CpzQS4eIHqVBqohn2H','2019-10-13 12:36:32','2019-10-13 12:36:32','Coolman',NULL,NULL,NULL,NULL),
	(12,'Cooler','Man','Cooler@email.com','$2a$10$PUCCs77nTW3GDJOci34XoeCPz71h/crq6BSgiY5B93i2Zz5Qbg5em','ytsGNEVnWYWgt5UXd0ZLdu6ovF2np1nzx29c1qXYivbiTXzBmp','2019-10-13 12:37:12','2019-10-13 12:37:12','CoolerMan',NULL,NULL,NULL,NULL),
	(13,'Wow','Dude','Wow@email.com','$2a$10$Llq/8LhlMKUD0ZqukKJUjOto3.zmcUv2MBuKCmSY8R5aVTuYKlZ86','vgVruLnDUe7RRVuavHLUB2flNgPd8XSEd9BF3EY9U2OkVVE8Ec','2019-10-13 12:39:29','2019-10-13 12:39:51','WowDude',NULL,NULL,NULL,NULL);

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
