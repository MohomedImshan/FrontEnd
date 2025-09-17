-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 01, 2025 at 07:04 PM
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
  `empNum` int(11) NOT NULL,
  `department` varchar(100) NOT NULL,
  `machine_code` varchar(50) NOT NULL,
  `type` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `userName` varchar(100) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `approved_date` timestamp NULL DEFAULT NULL,
  `parts` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`parts`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `requests`
--

INSERT INTO `requests` (`id`, `empNum`, `department`, `machine_code`, `type`, `description`, `userName`, `status`, `created_at`, `approved_date`, `parts`) VALUES
(7, 1, 'D001', 'Mc001', 'Type001', 'Problem 1', 'Imshan', 'Approved', '2025-08-28 06:19:06', '2025-09-01 14:52:26', '[{\"id\":\"1\",\"item_name\":\"Pipe\",\"quantity\":\"3\"},{\"id\":\"2\",\"item_name\":\"ScrewDriver\",\"quantity\":\"1\"}]'),
(8, 1, 'Electrical', 'Sds44', 'sda444', 'pasda55', 'Imshan', 'Approved', '2025-09-01 14:49:14', '2025-09-01 15:34:32', '[{\"id\":3,\"item_name\":\"Screwdriver set\",\"quantity\":\"3\"}]'),
(9, 1, 'Electrical', 'Elec5 ', 'Type 02', 'Sample Testing to reduce spare parts from data base', 'Imshan', 'Approved', '2025-09-01 15:19:55', '2025-09-01 15:30:30', '[{\"id\":2,\"item_name\":\"Pipe\",\"quantity\":\"10\"},{\"id\":3,\"item_name\":\"Screwdriver set\",\"quantity\":\"3\"}]'),
(10, 1, 'Electrical', 'Elec 8', 'Yus', 'Testing 2', 'Imshan', 'Approved', '2025-09-01 15:36:39', '2025-09-01 15:36:44', '[{\"id\":1,\"item_name\":\"Tap\",\"quantity\":\"10\"},{\"id\":3,\"item_name\":\"Screwdriver set\",\"quantity\":\"5\"}]'),
(11, 1, 'Mechanical', 'SS', 'Test2 ', 'Test 4', 'Imshan', 'Approved', '2025-09-01 15:38:18', '2025-09-01 15:38:44', '[{\"id\":3,\"item_name\":\"Screwdriver set\",\"quantity\":\"6\"}]'),
(12, 1, 'Electrical', 'Saas', 'sasdasd', 'Test 4', 'Imshan', 'Rejected', '2025-09-01 15:45:05', '2025-09-01 16:17:28', '[{\"id\":3,\"item_name\":\"Screwdriver set\",\"quantity\":\"6\"}]');

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
(1, 'D001', 'T001', 'Tap', 90),
(2, 'D001', 'T003', 'Pipe', 90),
(3, 'D003', 'Type 4', 'Screwdriver set', 4),
(5, 'D004', 'Type 5', 'E004151', 200),
(6, 'Mechanical', 'T002', 'Nut', 50);

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` int(11) NOT NULL,
  `action` varchar(100) NOT NULL,
  `item_id` int(11) NOT NULL,
  `item_name` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL,
  `date_of_accept` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id`, `action`, `item_id`, `item_name`, `quantity`, `date_of_accept`) VALUES
(1, 'Add Spare parts', 6, 'Nut', 50, '2025-09-01 14:16:14'),
(2, 'Issued', 3, 'Screwdriver set', 3, '2025-09-01 15:34:32'),
(3, 'Issued', 1, 'Tap', 10, '2025-09-01 15:36:44'),
(4, 'Issued', 3, 'Screwdriver set', 5, '2025-09-01 15:36:44'),
(5, 'Issued', 3, 'Screwdriver set', 6, '2025-09-01 15:38:44');

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
(2, 'saman', 'saman@gmail.com', '$2b$10$V7jFoyCjHWtDdVBMnF3BeeFySbNVJ7JYe8pbTQWEb6EH181THDb0G', 'Technician', 'Active'),
(3, 'santha', 'santha@gmail.com', '$2b$10$0wXyWt5aA88hPCF2qFGgBuArUk6Q388.eheCx0j2osDC3e.FCJ1qi', 'Technician', 'pending'),
(4, 'Mahasen', 'mahasen@gmail.com', '$2b$10$P5.5KbeZOczaamoiZCSfLumYZjjLdEmkrYT6tERG2i7B/zk45nKuW', 'Technician', 'pending'),
(5, 'Pasindu', 'pasindu@gmail.com', '$2b$10$jwgG3vanz7Q5UyGCftphA.jBkxnEbxNClbwOV0DmOM9XPKlks1jqa', 'Technician', 'Active'),
(6, 'Ravindu Kalhara', 'kalhara@gmail.com', '$2b$10$GbU5wFKOoy/OECM0VfvtWuYkCvMbOV5vHD6CLRr6iJ9oUveEJ4faW', 'Technician', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `user_logs`
--

CREATE TABLE `user_logs` (
  `id` int(11) NOT NULL,
  `empNum` varchar(100) NOT NULL,
  `action` varchar(50) NOT NULL,
  `details` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_logs`
--

INSERT INTO `user_logs` (`id`, `empNum`, `action`, `details`, `timestamp`) VALUES
(1, '1', 'LOGIN', 'User logged IN', '2025-09-01 08:56:16'),
(2, '1', 'LOGIN', 'User logged IN', '2025-09-01 14:09:40'),
(3, '1', 'Register', 'New user Registered', '2025-09-01 14:24:05'),
(4, '1', 'LOGIN', 'User logged IN', '2025-09-01 15:18:50'),
(5, '1', 'LOGIN', 'User logged IN', '2025-09-01 15:56:37');

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
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`empNum`);

--
-- Indexes for table `user_logs`
--
ALTER TABLE `user_logs`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `requests`
--
ALTER TABLE `requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `spare_parts_tbl`
--
ALTER TABLE `spare_parts_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `empNum` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user_logs`
--
ALTER TABLE `user_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
