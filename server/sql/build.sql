CREATE TABLE `Users` (
    `guid`              BINARY(16) PRIMARY KEY,
	`id`                BIGINT UNIQUE AUTO_INCREMENT NOT NULL
    `name`              VARCHAR(50) UNIQUE NOT NULL,
    `password`          VARCHAR(32) NOT NULL,
    `creation_date`     DATE NOT NULL,
	`last_login_date`   DATETIME
);

CREATE TABLE `Groups` (
    `id`                BINARY(16) PRIMARY KEY,
	`user_id`           BINARY(16) NOT NULL,
	`name`              VARCHAR(50) NOT NULL,
	`language1`         INT NOT NULL,
	`language2`         INT NOT NULL,
);

CREATE TABLE `words` (
    `id`                BINARY(16) PRIMARY KEY,
	`group_id`          BINARY(16) NOT NULL,
	`language1`         VARCHAR(100),
	`language2`         VARCHAR(100),
	`example1`          VARCHAR(100),
	`example2`          VARCHAR(100),
	`comment`           VARCHAR(100),
	`drawer`            INT NOT NULL,
	`is_visible`        TINYINT(1) NOT NULL
)

CREATE TABLE `repeats` (
    `id`                BINARY(16) PRIMARY KEY
)
