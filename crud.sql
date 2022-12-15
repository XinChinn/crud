-- Create database
CREATE DATABASE `crud-api`;

-- Create users table
CREATE TABLE `crud-api`.`books`
(
    `id` int NOT NULL auto_increment,
    `title` varchar(50),
    `isbn` varchar(60),
    `author` varchar(60),
    `publisher` varchar(60),
    `year_published` varchar(60),
    `category` varchar(60),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id)
);