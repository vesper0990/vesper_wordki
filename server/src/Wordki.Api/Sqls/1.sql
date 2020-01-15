CREATE TABLE `users` (
    `id`                BIGINT UNIQUE AUTO_INCREMENT PRIMARY KEY,
    `name`              VARCHAR(50) UNIQUE NOT NULL,
    `password`          VARCHAR(32) NOT NULL,
    `creation_date`     DATE NOT NULL,
    `last_login_date`   DATETIME
);

CREATE TABLE `groups` (
    `id`                BIGINT UNIQUE AUTO_INCREMENT PRIMARY KEY,
    `user_id`           BIGINT NOT NULL,
    `name`              VARCHAR(50) NOT NULL,
    `language1`         INT NOT NULL,
    `language2`         INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE `words` (
    `id`                BIGINT UNIQUE AUTO_INCREMENT PRIMARY KEY,
    `group_id`          BIGINT NOT NULL,
    `language1`         VARCHAR(100),
    `language2`         VARCHAR(100),
    `example1`          VARCHAR(100),
    `example2`          VARCHAR(100),
    `comment`           VARCHAR(100),
    `drawer`            INT NOT NULL,
    `is_visible`        TINYINT(1) NOT NULL,
    `next_repeat`       DATETIME NOT NULL,
    FOREIGN KEY (group_id) REFERENCES groups(id)
);

CREATE TABLE `repeats` (
    `id`                BIGINT UNIQUE AUTO_INCREMENT PRIMARY KEY,
    `word_id`           BIGINT NOT NULL,
    `result`            TINYINT(1) NOT NULL,
    `date`              DATETIME,
    FOREIGN KEY (word_id) REFERENCES words(id)
);
