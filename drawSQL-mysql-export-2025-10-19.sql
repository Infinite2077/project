-- Active: 1760875650506@@127.0.0.1@3306@lighting
CREATE TABLE `products`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `desc` TEXT NOT NULL,
    `image` TEXT NOT NULL
);
CREATE TABLE `comments`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `post_id` INT NOT NULL,
    `author` VARCHAR(255) NOT NULL,
    `comment` TEXT NOT NULL
);
ALTER TABLE
    `comments` ADD CONSTRAINT `comments_post_id_foreign` FOREIGN KEY(`post_id`) REFERENCES `products`(`id`);