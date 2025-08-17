-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 17, 2025 at 06:01 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `spare-parts-management-system`
--

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `id` int(11) NOT NULL,
  `department` varchar(100) NOT NULL,
  `machine_code` varchar(50) NOT NULL,
  `type` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `empNum` int(11) NOT NULL,
  `employee_name` varchar(100) NOT NULL,
  `date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `status` varchar(50) NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `requests`
--

INSERT INTO `requests` (`id`, `department`, `machine_code`, `type`, `description`, `empNum`, `employee_name`, `date_time`, `status`, `created_at`) VALUES
(4, 'D001', 'MC001', 'TYPE02', 'PROBLEM 5', 1, 'Imshan', '2025-08-14 10:48:34', 'pending', '2025-08-14 05:18:34');

-- --------------------------------------------------------

--
-- Table structure for table `spare_parts_tbl`
--

CREATE TABLE `spare_parts_tbl` (
  `id` int(11) NOT NULL,
  `department` varchar(100) NOT NULL,
  `type` varchar(50) NOT NULL,
  `item_name` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `spare_parts_tbl`
--

INSERT INTO `spare_parts_tbl` (`id`, `department`, `type`, `item_name`, `quantity`) VALUES
(1, 'D001', 'T001', 'Tap', 100);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `empNum` int(11) NOT NULL,
  `userName` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `position` varchar(20) NOT NULL DEFAULT 'Technician',
  `status` varchar(20) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`empNum`, `userName`, `email`, `password`, `position`, `status`) VALUES
(1, 'Imshan', 'mohomedamccimshan@gmail.com', '$2b$10$nqw2.wZo7zavOJwW.DlHXe5PeBmkflCPt4u.NpeRUNg96spmi8b5q', 'Engineer', 'Active'),
(2, 'saman', 'saman@gmail.com', '$2b$10$V7jFoyCjHWtDdVBMnF3BeeFySbNVJ7JYe8pbTQWEb6EH181THDb0G', 'Technician', 'Active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `spare_parts_tbl`
--
ALTER TABLE `spare_parts_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`empNum`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `requests`
--
ALTER TABLE `requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `spare_parts_tbl`
--
ALTER TABLE `spare_parts_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `empNum` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
