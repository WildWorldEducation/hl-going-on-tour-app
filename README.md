# hl-going-on-tour-app

## Tech Stack
### Front End
* Vue 3
* Pinia
* Vue Router
* Vite
### Back End
* Node with Express
* MariaDB

### Game
* Phaser 3


## Project Setup
### Install dependancies
npm install

### Create database
```sh
CREATE DATABASE `healthy_lifestyles` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(200) NOT NULL,
  `first_name` varchar(200) DEFAULT NULL,
  `last_name` varchar(200) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `start_date` date NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `last_slide` varchar(45) NOT NULL DEFAULT 'Scene1_1',
  `module_unlocked` int(11) NOT NULL DEFAULT 1,
  `clever_id` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

### Compile and Hot-Reload for Development


npm run dev


