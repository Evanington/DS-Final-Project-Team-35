show databases;
create database if not exists msisdb;
use msisdb;

DROP TABLE IF EXISTS `msisdb`.`Referee` ;CREATE TABLE IF NOT EXISTS `msisdb`.`Referee` (RefID INT NOT NULL AUTO_INCREMENT,Name VARCHAR(255) NULL,Age INT NULL,Grade INT NULL,PosStatus VARCHAR(255) NULL,RefereeSkillRating INT NULL,PRIMARY KEY (`RefID`));

create table games(g_id INT AUTO_INCREMENT NOT NULL, field_num int, start_time time, game_level int, num_of_refs int, PRIMARY KEY (g_id));
ALTER TABLE games
ADD start_date date;

CREATE TABLE assignment(a_id int AUTO_INCREMENT NOT NULL, g_id int NOT NULL, RefID int, position varchar(25) NOT NULL, current_status enum('unassigned','notified','accepted','declined'), PRIMARY KEY (a_id), FOREIGN KEY (g_id) REFERENCES games(g_id), FOREIGN KEY (RefID) REFERENCES Referee(RefID));
