show databases;
create database if not exists msisdb;
use msisdb;

DROP TABLE IF EXISTS `msisdb`.`Referee` ;CREATE TABLE IF NOT EXISTS `msisdb`.`Referee` (RefID INT NOT NULL AUTO_INCREMENT,Name VARCHAR(255) NULL,Age INT NULL,Grade INT NULL,PosStatus VARCHAR(255) NULL,RefereeSkillRating INT NULL,PRIMARY KEY (`RefID`));
insert into Referee (RefID, Name, Age, Grade, PosStatus, RefereeSkillRating) values(01, 'Bob', 25, 3, 'A', 9);
insert into Referee (RefID, Name, Age, Grade, PosStatus, RefereeSkillRating) values(02, 'Rob', 26, 5, 'B', 4);
insert into Referee (RefID, Name, Age, Grade, PosStatus, RefereeSkillRating) values(15, 'Hob', 27, 2, 'F', 10);
insert into Referee (RefID, Name, Age, Grade, PosStatus, RefereeSkillRating) values(09, 'Mob', 82, 4, 'GG', 7);
insert into Referee (RefID, Name, Age, Grade, PosStatus, RefereeSkillRating) values(11, 'Cob', 24, 5, 'A', 8);
