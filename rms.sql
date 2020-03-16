-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 09, 2020 at 08:38 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rms`
--

-- --------------------------------------------------------

--
-- Table structure for table `contact_form`
--

CREATE TABLE `contact_form` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `food_experience`
--

CREATE TABLE `food_experience` (
  `f_id` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `u_name` varchar(255) NOT NULL,
  `f_about` text NOT NULL,
  `r_location` varchar(255) NOT NULL,
  `f_exp` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `food_experience`
--

INSERT INTO `food_experience` (`f_id`, `u_id`, `u_name`, `f_about`, `r_location`, `f_exp`) VALUES
(15, 20, 'xyztameem', 'Nice and good', 'dhaka ', 'new'),
(16, 20, 'xyztameem', 'sadasd', 'asdasdsadsa', 'saddsad'),
(17, 20, 'xyztameem', 'sdsd', 'Gulsan-1', 'sdsd'),
(19, 49, 'member', 'cafe shania', 'Gulsan-1', ' gg');

-- --------------------------------------------------------

--
-- Table structure for table `item_details`
--

CREATE TABLE `item_details` (
  `i_id` int(11) NOT NULL,
  `r_id` int(11) NOT NULL,
  `i_name` varchar(255) NOT NULL,
  `i_detail` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `item_details`
--

INSERT INTO `item_details` (`i_id`, `r_id`, `i_name`, `i_detail`) VALUES
(18, 8, 'Item 1', 'Item 1'),
(19, 8, 'Item 2', 'Item 2'),
(21, 8, 'Item 1', 'Item 1'),
(22, 8, 'Item 2', 'Item 2'),
(23, 8, 'Item 1', 'Item 1'),
(24, 8, 'Item 2', 'Item 2'),
(25, 8, 'Item 1', 'Item 1'),
(26, 8, 'Item 2', 'Item 2');

-- --------------------------------------------------------

--
-- Table structure for table `pic`
--

CREATE TABLE `pic` (
  `p_id` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `username` varchar(33) NOT NULL,
  `filename` varchar(44) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pic`
--

INSERT INTO `pic` (`p_id`, `u_id`, `username`, `filename`) VALUES
(1, 23, 'mahamud', '1583521968553-IMG_20200228_180823.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `reservation_details`
--

CREATE TABLE `reservation_details` (
  `id` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `u_name` varchar(255) NOT NULL,
  `u_email` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `time` varchar(255) NOT NULL,
  `phone_no` varchar(255) NOT NULL,
  `total_guest` int(11) NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reservation_details`
--

INSERT INTO `reservation_details` (`id`, `u_id`, `u_name`, `u_email`, `date`, `time`, `phone_no`, `total_guest`, `status`) VALUES
(1, 20, 'Shahnewaz', 'shahnewaz@gmail.com', '2020-03-01', '2:22', '01675679141  ', 10, 'accepted'),
(4, 20, 'Shahnewaz', 'shahnewaz@gmail.com', '2020-03-01', '2:22', '01675679141  ', 10, 'accepted'),
(5, 20, 'Shahnewaz', 'shahnewaz@gmail.com', '2020-03-01', '2:22', '01675679141  ', 10, 'accepted'),
(6, 20, 'Shahnewaz', 'shahnewaz@gmail.com', '2020-03-01', '2:22', '01675679141  ', 10, 'accepted'),
(7, 20, 'Shahnewaz', 'shahnewaz@gmail.com', '2020-03-01', '2:22', '01675679141  ', 10, 'accepted'),
(8, 20, 'Shahnewaz', 'shahnewaz@gmail.com', '2020-03-01', '2:22', '01675679141  ', 10, 'accepted'),
(9, 20, 'Shahnewaz', 'shahnewaz@gmail.com', '2020-03-01', '2:22', '01675679141  ', 10, 'accepted'),
(10, 20, 'Shahnewaz', 'shahnewaz@gmail.com', '2020-03-01', '2:22', '01675679141  ', 10, 'accepted');

-- --------------------------------------------------------

--
-- Table structure for table `restaurant_info`
--

CREATE TABLE `restaurant_info` (
  `r_id` int(11) NOT NULL,
  `r_name` varchar(255) NOT NULL,
  `r_location` varchar(255) NOT NULL,
  `r_details` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `restaurant_info`
--

INSERT INTO `restaurant_info` (`r_id`, `r_name`, `r_location`, `r_details`) VALUES
(4, 'Cafe XX', 'Mohakhali', 'It is established on 29 feb'),
(5, 'cafe khayer', 'Nikunjo-2', 'Located at tejgaon..'),
(8, 'Cafe reloaded updated', 'Gulsan-2', 'Details about restaurant will go here updated');

-- --------------------------------------------------------

--
-- Table structure for table `users_info`
--

CREATE TABLE `users_info` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `user_firstname` varchar(50) NOT NULL,
  `user_lastname` varchar(50) NOT NULL,
  `user_email` varchar(50) NOT NULL,
  `user_type` varchar(50) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_gender` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users_info`
--

INSERT INTO `users_info` (`id`, `username`, `user_firstname`, `user_lastname`, `user_email`, `user_type`, `user_password`, `user_gender`) VALUES
(17, 'shahnewaztamim', 'shahnewaz', 'tamim', 'shahnewaztamim@gmail.com', 'admin', '$2b$10$UtyVZK9bJ9d0ySCcsxaV7.1TzV/GEHaJAf0gGmEHtl0.sdOsZudCG', 'male'),
(20, 'xyztameem', 'Shahnewaz', 'Tameem', 'tamimcse@gmail.com', 'admin', '$2b$10$W2SWLLyoD2m1HzYCEXAEEeKrWmwqkxszEzSD6/NsEQSa6emRLlbP2', 'male'),
(24, 'test', 'test', 'test', 'test@gmail.com', 'admin', '$2b$10$3WA9OBMVBQkjjZ8GwTexXeqglnNmMsSJZpMwnGE9.2bHHTg5Rvo/W', 'male'),
(26, 'nzannat', 'nzannat', 'nzannat', 'nzannat1988@gmail.com', 'admin', '$2b$10$u4ZuI75EwgReU0HvowuiA.yUJ5kMGJJIMWGtD9ROy46ZQe6C.dQ5y', 'male'),
(30, 'Raul Sauer', 'Gavin', 'Carter', 'Camryn45@gmail.com', 'manager', '$2b$10$Wuo9gQ8Jtrn9ADaBZwMGvuLD5b8hJ3lz/4PEmRSV.O/8.ZjZAIkVK', 'male'),
(33, 'xpiredbrain', 'xb', 'tgt', 'tamimcse@gmail.comzzz', 'admin', '$2b$10$pl.8P0deuZRf2ePlyladg.17mK/ZKznn/3YD5yE8.fIvLgyb0Xqz2', 'male'),
(42, 'newUser', 'new', 'user', 'new@gmail.com', 'admin', '$2b$10$a1usjGOmnSawL4ih1U0iLOhyNUYmMzJdQnwk.C6eO1ks8G6DeAnPG', 'male'),
(43, 'Mertz', 'Lesley', 'Heller', 'Melyssa56@gmail.com', 'admin', '$2b$10$hzcgEI662KbotltdFKBEGe5DKkY/s6Vc/Ye1oYnPUhACagit6ouc6', 'male'),
(45, 'Humayun', 'Rashid', 'sami', 'sami@gmail.com', 'admin', '$2b$10$Y5MvSrwjsasgugCjy3gy/elrK8RkLnEKDyKnyVUjzY1IJcb69NSVG', 'male'),
(49, 'member', 'member', 'mem', 'member@gmail.com', 'member', '$2b$10$CpuXuyVvypygAA8OTIRaTeRDWFHwwrz4KkURByklEqU45nchUzc.u', 'male');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contact_form`
--
ALTER TABLE `contact_form`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `food_experience`
--
ALTER TABLE `food_experience`
  ADD PRIMARY KEY (`f_id`);

--
-- Indexes for table `item_details`
--
ALTER TABLE `item_details`
  ADD PRIMARY KEY (`i_id`);

--
-- Indexes for table `pic`
--
ALTER TABLE `pic`
  ADD PRIMARY KEY (`p_id`),
  ADD UNIQUE KEY `u_id` (`u_id`);

--
-- Indexes for table `reservation_details`
--
ALTER TABLE `reservation_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `restaurant_info`
--
ALTER TABLE `restaurant_info`
  ADD PRIMARY KEY (`r_id`);

--
-- Indexes for table `users_info`
--
ALTER TABLE `users_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_email` (`user_email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact_form`
--
ALTER TABLE `contact_form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `food_experience`
--
ALTER TABLE `food_experience`
  MODIFY `f_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `item_details`
--
ALTER TABLE `item_details`
  MODIFY `i_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `pic`
--
ALTER TABLE `pic`
  MODIFY `p_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `reservation_details`
--
ALTER TABLE `reservation_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `restaurant_info`
--
ALTER TABLE `restaurant_info`
  MODIFY `r_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users_info`
--
ALTER TABLE `users_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
