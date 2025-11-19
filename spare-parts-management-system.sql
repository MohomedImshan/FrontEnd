-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 18, 2025 at 01:57 PM
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
(8, 1, 'Electrical', 'Sds44', 'sda444', 'pasda55', 'Imshan', 'Approved', '2025-09-01 14:49:14', '2025-09-01 15:34:32', '[{\"id\":3,\"item_name\":\"Screwdriver set\",\"quantity\":\"3\"}]'),
(9, 1, 'Electrical', 'Elec5 ', 'Type 02', 'Sample Testing to reduce spare parts from data base', 'Imshan', 'Approved', '2025-09-01 15:19:55', '2025-09-01 15:30:30', '[{\"id\":2,\"item_name\":\"Pipe\",\"quantity\":\"10\"},{\"id\":3,\"item_name\":\"Screwdriver set\",\"quantity\":\"3\"}]'),
(10, 1, 'Electrical', 'Elec 8', 'Yus', 'Testing 2', 'Imshan', 'Approved', '2025-09-01 15:36:39', '2025-09-01 15:36:44', '[{\"id\":1,\"item_name\":\"Tap\",\"quantity\":\"10\"},{\"id\":3,\"item_name\":\"Screwdriver set\",\"quantity\":\"5\"}]'),
(11, 1, 'Mechanical', 'SS', 'Test2 ', 'Test 4', 'Imshan', 'Approved', '2025-09-01 15:38:18', '2025-09-01 15:38:44', '[{\"id\":3,\"item_name\":\"Screwdriver set\",\"quantity\":\"6\"}]'),
(12, 1, 'Electrical', 'Saas', 'sasdasd', 'Test 4', 'Imshan', 'Rejected', '2025-09-01 15:45:05', '2025-09-01 16:17:28', '[{\"id\":3,\"item_name\":\"Screwdriver set\",\"quantity\":\"6\"}]'),
(13, 1, 'Electrical', 'MC00', 'Type 2', 'sample test', 'Imshan', 'Approved', '2025-09-03 06:19:54', '2025-09-03 06:20:10', '[{\"id\":7,\"item_name\":\"Elec item\",\"quantity\":\"5\"},{\"id\":2,\"item_name\":\"Pipe\",\"quantity\":\"4\"}]'),
(14, 1, 'General', 'MAGen4', 'Type 6', 'problem 4', 'Imshan', 'Rejected', '2025-09-03 06:21:41', '2025-09-03 06:22:24', '[{\"id\":1,\"item_name\":\"Tap\",\"quantity\":\"4\"},{\"id\":3,\"item_name\":\"Screwdriver set\",\"quantity\":\"2\"}]'),
(15, 1, 'Electrical', 'elec 5', 'type 7', 'problem', 'Imshan', 'Rejected', '2025-09-03 06:26:29', '2025-09-17 17:12:44', '[{\"id\":7,\"item_name\":\"Elec item\",\"quantity\":\"1000\"}]'),
(16, 8, 'Electrical', 'M5', 'T5', '...', 'tec1', 'Approved', '2025-09-03 06:44:33', '2025-09-17 17:27:15', '[{\"id\":2,\"item_name\":\"Pipe\",\"quantity\":\"10\"}]'),
(17, 8, 'Mechanical', 'M6', 'T6', '..', 'tec1', 'Rejected', '2025-09-03 06:45:22', '2025-09-18 10:40:18', '[]'),
(18, 2, 'Electrical', 'm998', 'y67', 'problem 5', 'saman', 'Approved', '2025-09-17 17:25:29', '2025-10-13 09:32:48', '[{\"id\":1,\"item_name\":\"Tap\",\"quantity\":\"5\"},{\"id\":3,\"item_name\":\"Screwdriver set\",\"quantity\":\"5\"}]'),
(19, 1, 'Electrical', 'fff33', 'DSFQ', 'wdfgh', 'Mohomed Imshan', 'Approved', '2025-09-17 17:30:51', '2025-09-17 17:31:09', '[{\"id\":1,\"item_name\":\"Tap\",\"quantity\":\"10\"}]'),
(20, 1, 'Electrical', 'mc001', 'type 2', '[roblem 2', 'Mohomed Imshan', 'Approved', '2025-09-18 10:40:08', '2025-09-29 17:43:04', '[{\"id\":2,\"item_name\":\"Pipe\",\"quantity\":\"43\"}]'),
(21, 1, 'Mechanical', 'mc 001', 'type 2', 'hhshhs', 'Mohomed Imshan', 'Rejected', '2025-10-13 09:33:47', '2025-10-13 09:34:00', '[{\"id\":5,\"item_name\":\"E004151\",\"quantity\":\"5\"},{\"id\":3,\"item_name\":\"Screwdriver set\",\"quantity\":\"2\"},{\"id\":1,\"item_name\":\"Tap\",\"quantity\":\"2\"}]'),
(22, 16, 'Electrical', '5522', 'ppoo 55', 'jujujss', 'kavishka', 'Approved', '2025-10-13 09:43:50', '2025-10-13 09:45:24', '[{\"id\":7,\"item_name\":\"Elec item\",\"quantity\":\"5\"},{\"id\":5,\"item_name\":\"E004151\",\"quantity\":\"6\"}]'),
(24, 17, 'Electrical', 'gelatine', 'breakdown', 'repair', 'Ifran01', 'Approved', '2025-10-19 07:08:05', '2025-10-19 07:13:53', '[{\"id\":9,\"item_name\":\"10A 3pole MCB\",\"quantity\":\"2\"},{\"id\":10,\"item_name\":\"20A 3pole MCB\",\"quantity\":\"1\"}]'),
(26, 1, 'Mechanical', 'mchn2', 'ppp', 'abcd', 'Mohomed Imshan', 'Approved', '2025-10-29 15:21:08', '2025-11-18 12:22:18', '[{\"id\":3,\"item_name\":\"Screwdriver set\",\"quantity\":\"2\"}]'),
(28, 1, 'Electrical', 'MC2442', 'Normal', 'Probelm', 'Mohomed Imshan', 'Approved', '2025-11-18 12:23:06', '2025-11-18 12:23:14', '[{\"id\":3,\"item_name\":\"Screwdriver set\",\"quantity\":\"5\"}]');

-- --------------------------------------------------------

--
-- Table structure for table `spare_parts_tbl`
--

CREATE TABLE `spare_parts_tbl` (
  `id` int(11) NOT NULL,
  `department` varchar(100) NOT NULL,
  `supplier` varchar(100) NOT NULL DEFAULT 'No Supplier',
  `type` varchar(50) NOT NULL,
  `item_name` varchar(100) NOT NULL,
  `cost` decimal(10,2) NOT NULL DEFAULT 0.00,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `spare_parts_tbl`
--

INSERT INTO `spare_parts_tbl` (`id`, `department`, `supplier`, `type`, `item_name`, `cost`, `quantity`) VALUES
(1, 'D001', 'No Supplier', 'T001', 'Tap', 0.00, 35),
(2, 'D001', 'No Supplier', 'T003', 'Pipe', 0.00, 33),
(3, 'D003', 'No Supplier', 'Type 4', 'Screwdriver set', 0.00, 48),
(5, 'D004', 'No Supplier', 'Type 5', 'E004151', 0.00, 244),
(9, 'Electrical', 'No Supplier', 'MCB', '10A 3pole MCB', 0.00, 1),
(10, 'Electrical', 'No Supplier', 'MCB', '20A 3pole MCB', 0.00, 2),
(11, 'Electrical', 'No Supplier', 'RCCB', '10A 3pole RCCB', 0.00, 2),
(13, 'General', 'No Supplier', 'T001', 'Tap', 500.00, 1111);

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
(5, 'Issued', 3, 'Screwdriver set', 6, '2025-09-01 15:38:44'),
(6, 'Add Spare parts', 7, 'Elec item', 50, '2025-09-03 06:18:36'),
(7, 'Update Spare parts', 7, 'Elec item', 100, '2025-09-03 06:18:45'),
(8, 'Issued', 7, 'Elec item', 5, '2025-09-03 06:20:10'),
(9, 'Issued', 2, 'Pipe', 4, '2025-09-03 06:20:10'),
(10, 'Issued', 1, 'Tap', 5, '2025-09-17 17:26:55'),
(11, 'Issued', 2, 'Pipe', 10, '2025-09-17 17:27:15'),
(12, 'Issued', 1, 'Tap', 10, '2025-09-17 17:31:09'),
(13, 'Update Spare parts', 5, 'E004151', 250, '2025-09-18 10:39:26'),
(14, 'Issued', 1, 'Tap', 5, '2025-09-18 10:40:25'),
(15, 'Issued', 1, 'Tap', 5, '2025-09-18 10:40:27'),
(16, 'Issued', 1, 'Tap', 5, '2025-09-18 10:40:28'),
(17, 'Issued', 1, 'Tap', 5, '2025-09-29 17:31:11'),
(18, 'Issued', 1, 'Tap', 5, '2025-09-29 17:31:13'),
(19, 'Issued', 1, 'Tap', 5, '2025-09-29 17:31:14'),
(20, 'Issued', 1, 'Tap', 5, '2025-09-29 17:31:14'),
(21, 'Issued', 1, 'Tap', 5, '2025-09-29 17:31:15'),
(22, 'Issued', 1, 'Tap', 5, '2025-09-29 17:31:15'),
(23, 'Issued', 1, 'Tap', 5, '2025-09-29 17:31:25'),
(24, 'Issued', 1, 'Tap', 5, '2025-09-29 17:42:30'),
(25, 'Issued', 1, 'Tap', 5, '2025-09-29 17:42:36'),
(26, 'Issued', 2, 'Pipe', 43, '2025-09-29 17:43:04'),
(27, 'Issued', 1, 'Tap', 5, '2025-09-29 17:46:47'),
(28, 'Update Spare parts', 3, 'Screwdriver set', 54, '2025-09-29 17:47:06'),
(29, 'Update Spare parts', 1, 'Tap', 40, '2025-09-29 18:01:43'),
(30, 'Update Spare parts', 3, 'Screwdriver set', 60, '2025-09-29 18:08:30'),
(31, 'Issued', 1, 'Tap', 5, '2025-10-13 09:32:48'),
(32, 'Issued', 3, 'Screwdriver set', 5, '2025-10-13 09:32:48'),
(33, 'Issued', 7, 'Elec item', 5, '2025-10-13 09:45:24'),
(34, 'Issued', 5, 'E004151', 6, '2025-10-13 09:45:24'),
(35, 'Add Spare parts', 8, '10A 3pole', 3, '2025-10-19 06:56:40'),
(36, 'Add Spare parts', 9, '10A 3pole MCB', 3, '2025-10-19 06:58:03'),
(37, 'Add Spare parts', 10, '20A 3pole MCB', 3, '2025-10-19 06:58:31'),
(38, 'Add Spare parts', 11, '10A 3pole RCCB', 2, '2025-10-19 06:59:07'),
(39, 'Issued', 9, '10A 3pole MCB', 2, '2025-10-19 07:13:53'),
(40, 'Issued', 10, '20A 3pole MCB', 1, '2025-10-19 07:13:53'),
(41, 'Add Spare parts', 12, 'asdad', 3, '2025-10-19 21:15:53'),
(42, 'Add Spare parts', 13, 'Tap', 1111, '2025-10-19 21:17:12'),
(43, 'Update Spare parts', 13, 'Tap', 1111, '2025-11-18 12:16:49'),
(44, 'Issued', 3, 'Screwdriver set', 2, '2025-11-18 12:22:18'),
(45, 'Issued', 3, 'Screwdriver set', 5, '2025-11-18 12:23:14');

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
(1, 'Mohomed Imshan', 'mohomedamccimshan@gmail.com', '$2b$10$nqw2.wZo7zavOJwW.DlHXe5PeBmkflCPt4u.NpeRUNg96spmi8b5q', 'Engineer', 'Active'),
(2, 'saman', 'saman@gmail.com', '$2b$10$V7jFoyCjHWtDdVBMnF3BeeFySbNVJ7JYe8pbTQWEb6EH181THDb0G', 'Assistant-Engineer', 'Active'),
(3, 'santha', 'santha@gmail.com', '$2b$10$0wXyWt5aA88hPCF2qFGgBuArUk6Q388.eheCx0j2osDC3e.FCJ1qi', 'Technician', 'pending'),
(4, 'Mahasen', 'mahasen@gmail.com', '$2b$10$P5.5KbeZOczaamoiZCSfLumYZjjLdEmkrYT6tERG2i7B/zk45nKuW', 'Technician', 'pending'),
(7, 'Pabasara Samara', 'pabasara@gmail.com', '$2b$10$wfgy7kOON8oeEbgjPgPmouAUG.8AKPPwlMiNMoa926Z8QF1H7RsNO', 'Technician', 'Active'),
(8, 'Technician 2', 'tec1@gmail.com', '$2b$10$.bADgSE2mfpxNw0.8jRt2.qAORHi9sATXNQo8BPtxE2fpmcILvMlm', 'Technician', 'pending'),
(9, 'tech3', 'tech3@gmail.com', '$2b$10$Xqb0nDggDIzI92n18O50MenhWgKV25aqiLThw0jgblUi9JZm2bMxy', 'Technician', 'pending'),
(10, 'kasun', 'kasun@gmail.com', '$2b$10$X5ujaxN2e9lbiIvjFF04IekZARrk7v7b/AjpJ3DE6QfVbzUV.BP3O', 'Assistent-Engineer', 'pending'),
(11, 'upul', 'upul@gmail.com', '$2b$10$uzXMuxOYlZjAKA.bmqapGupZ2ZSW3bRtg.4tejfaeFhVQenaHfFyi', 'Assistent-Engineer', 'pending'),
(12, 'tharidu', 'tharidu@gmail.com', '$2b$10$8lc1d/oITUfV0ZHSL0JQi.QGsTXCiRUhdj0VMSrHkAVpi2SHVm4AK', 'Assistant-Engineer', 'pending'),
(15, 'Pasindu wil', 'pasi@gmail.com', '$2b$10$Ptm7hez0TIiMzWXqe7fIf.M9IYXfW1H9cQgUK7H5VthcGLy21lqqW', 'Engineer', 'Active'),
(16, 'Kavishka Imalsha', 'kavishka@gmail.com', '$2b$10$RX8tDnuK8klwARAX2Ioz7u5EORdKX0L88KqYKUZk.2pUW27CGIa1q', 'Technician', 'Active'),
(17, 'Ifran', 'ifrangills@gmail.com', '$2b$10$a0Zsy4kWG674eUjmzgMzmuMWBj.wvxfj.MpBIO3zK.ouT7AcDHhTC', 'Engineer', 'Active');

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
(5, '1', 'LOGIN', 'User logged IN', '2025-09-01 15:56:37'),
(6, '1', 'LOGIN', 'User logged IN', '2025-09-02 15:22:42'),
(7, '1', 'LOGIN', 'User logged IN', '2025-09-03 02:21:47'),
(8, '1', 'LOGIN', 'User logged IN', '2025-09-03 03:25:46'),
(9, '1', 'LOGIN', 'User logged IN', '2025-09-03 06:12:29'),
(10, '1', 'Register', 'New user Registered', '2025-09-03 06:16:37'),
(11, '1', 'UPDATE STATUS', 'Updated the status of Employee Number 7', '2025-09-03 06:16:54'),
(12, '1', 'LOGIN', 'User logged IN', '2025-09-03 06:25:20'),
(13, '1', 'Register', 'New user Registered', '2025-09-03 06:43:25'),
(14, '8', 'LOGIN', 'User logged IN', '2025-09-03 06:43:43'),
(15, '1', 'LOGIN', 'User logged IN', '2025-09-03 14:26:01'),
(16, '1', 'LOGIN', 'User logged IN', '2025-09-03 15:27:24'),
(17, '1', 'LOGIN', 'User logged IN', '2025-09-03 15:29:09'),
(18, '1', 'LOGIN_FAILED', 'wrong password for email:mohomedamccimshan@gmail.com', '2025-09-03 16:03:15'),
(19, '1', 'LOGIN', 'User logged IN', '2025-09-03 16:03:25'),
(20, '1', 'Update Details', 'Changed User details', '2025-09-03 16:33:07'),
(21, '1', 'Update Details', 'Changed User details of 1', '2025-09-03 16:47:55'),
(22, '1', 'Update Details', 'Changed User details of Mohomed Imshan', '2025-09-03 16:48:25'),
(23, '1', 'LOGIN', 'User logged IN', '2025-09-03 16:49:56'),
(24, '1', 'LOGIN', 'User logged IN', '2025-09-04 04:59:43'),
(25, '1', 'LOGIN', 'User logged IN', '2025-09-04 05:14:20'),
(26, '1', 'Register', 'New user Registered', '2025-09-04 05:23:10'),
(27, '9', 'LOGIN', 'User logged IN', '2025-09-04 05:23:23'),
(28, '9', 'Update Details', 'Changed User details of tech3', '2025-09-04 05:31:43'),
(29, '9', 'Update Details', 'Changed the user password', '2025-09-04 05:32:04'),
(30, '9', 'LOGIN', 'User logged IN', '2025-09-04 05:32:16'),
(31, '1', 'LOGIN', 'User logged IN', '2025-09-04 05:33:46'),
(32, '1', 'Register', 'New user Registered', '2025-09-04 05:34:03'),
(33, '10', 'LOGIN', 'User logged IN', '2025-09-04 05:34:13'),
(34, '10', 'LOGIN', 'User logged IN', '2025-09-04 05:37:48'),
(35, '10', 'LOGIN', 'User logged IN', '2025-09-04 05:42:24'),
(36, '10', 'LOGIN', 'User logged IN', '2025-09-04 05:45:44'),
(37, '10', 'LOGIN', 'User logged IN', '2025-09-04 05:51:05'),
(38, '1', 'LOGIN', 'User logged IN', '2025-09-04 05:51:17'),
(39, '1', 'Register', 'New user Registered', '2025-09-04 05:51:43'),
(40, '11', 'LOGIN', 'User logged IN', '2025-09-04 05:51:58'),
(41, '1', 'LOGIN', 'User logged IN', '2025-09-04 05:53:32'),
(42, '1', 'Register', 'New user Registered', '2025-09-04 05:54:03'),
(43, '12', 'LOGIN', 'User logged IN', '2025-09-04 05:54:16'),
(44, '12', 'LOGIN', 'User logged IN', '2025-09-04 05:54:29'),
(45, '12', 'LOGIN', 'User logged IN', '2025-09-04 05:54:30'),
(46, '12', 'LOGIN', 'User logged IN', '2025-09-04 05:56:35'),
(47, '12', 'LOGIN', 'User logged IN', '2025-09-04 05:56:36'),
(48, '12', 'LOGIN', 'User logged IN', '2025-09-04 05:56:48'),
(49, '12', 'LOGIN', 'User logged IN', '2025-09-04 05:57:11'),
(50, '12', 'LOGIN', 'User logged IN', '2025-09-04 05:58:10'),
(51, '1', 'LOGIN', 'User logged IN', '2025-09-04 15:19:27'),
(52, '1', 'LOGIN', 'User logged IN', '2025-09-04 15:49:18'),
(53, '1', 'LOGIN', 'User logged IN', '2025-09-12 13:42:30'),
(54, '1', 'LOGIN', 'User logged IN', '2025-09-13 17:20:26'),
(55, '1', 'LOGIN', 'User logged IN', '2025-09-13 17:38:01'),
(56, '1', 'LOGIN', 'User logged IN', '2025-09-13 17:42:50'),
(57, '1', 'UPDATE STATUS', 'Updated the status of Employee Number 8', '2025-09-13 17:47:49'),
(58, '1', 'LOGIN', 'User logged IN', '2025-09-15 17:26:08'),
(59, '1', 'LOGIN', 'User logged IN', '2025-09-17 06:29:16'),
(60, '1', 'LOGIN', 'User logged IN', '2025-09-17 07:34:05'),
(61, '1', 'LOGIN', 'User logged IN', '2025-09-17 07:45:07'),
(62, '1', 'Register', 'New user Registered', '2025-09-17 08:00:18'),
(63, '5', 'LOGIN', 'User logged IN', '2025-09-17 08:00:28'),
(64, '1', 'LOGIN', 'User logged IN', '2025-09-17 08:00:47'),
(65, '13', 'Login Failed', 'Attempted login but account is pending', '2025-09-17 08:02:34'),
(66, '1', 'LOGIN', 'User logged IN', '2025-09-17 08:03:18'),
(67, '1', 'Register', 'New user Registered', '2025-09-17 08:04:05'),
(68, '14', 'Login Failed', 'Attempted login but account is pending', '2025-09-17 08:04:16'),
(69, '1', 'LOGIN', 'User logged IN', '2025-09-17 08:15:40'),
(70, '1', 'LOGIN', 'User logged IN', '2025-09-17 08:38:40'),
(71, '1', 'LOGOUT', 'User logged out', '2025-09-17 08:52:33'),
(72, '1', 'LOGIN', 'User logged IN', '2025-09-17 08:52:41'),
(73, '1', 'LOGIN', 'User logged IN', '2025-09-17 09:35:23'),
(74, '1', 'LOGOUT', 'User logged out', '2025-09-17 09:37:28'),
(75, '1', 'LOGIN', 'User logged IN', '2025-09-17 09:37:44'),
(76, '1', 'LOGOUT', 'User logged out', '2025-09-17 09:40:47'),
(77, '1', 'LOGIN', 'User logged IN', '2025-09-17 16:36:21'),
(78, '1', 'LOGOUT', 'User logged out', '2025-09-17 17:16:00'),
(79, '1', 'LOGIN', 'User logged IN', '2025-09-17 17:16:39'),
(80, '1', 'UPDATE STATUS', 'Updated the status of Employee Number 2', '2025-09-17 17:17:39'),
(81, '1', 'Register', 'New user Registered', '2025-09-17 17:18:55'),
(82, '1', 'LOGOUT', 'User logged out', '2025-09-17 17:19:11'),
(83, '15', 'Login Failed', 'Attempted login but account is pending', '2025-09-17 17:19:24'),
(84, '1', 'LOGIN', 'User logged IN', '2025-09-17 17:20:14'),
(85, '1', 'UPDATE STATUS', 'Updated the status of Employee Number 15', '2025-09-17 17:20:31'),
(86, '1', 'LOGOUT', 'User logged out', '2025-09-17 17:20:33'),
(87, '15', 'LOGIN', 'User logged IN', '2025-09-17 17:20:49'),
(88, '15', 'Update Details', 'Changed the user password', '2025-09-17 17:21:45'),
(89, '15', 'LOGOUT', 'User logged out', '2025-09-17 17:22:53'),
(90, '2', 'LOGIN', 'User logged IN', '2025-09-17 17:23:16'),
(91, '2', 'LOGOUT', 'User logged out', '2025-09-17 17:26:01'),
(92, '1', 'LOGIN', 'User logged IN', '2025-09-17 17:26:31'),
(93, '1', 'LOGIN', 'User logged IN', '2025-09-18 10:28:28'),
(94, '1', 'LOGIN', 'User logged IN', '2025-09-18 10:38:05'),
(95, '1', 'LOGOUT', 'User logged out', '2025-09-18 10:48:22'),
(96, '1', 'LOGIN', 'User logged IN', '2025-09-29 17:26:57'),
(97, '1', 'LOGOUT', 'User logged out', '2025-09-29 17:47:13'),
(98, '1', 'LOGIN', 'User logged IN', '2025-09-29 17:47:32'),
(99, '1', 'Updated Stock', 'Quantity of Screwdriver set is updated by 60', '2025-09-29 18:08:30'),
(100, '1', 'LOGOUT', 'User logged out', '2025-09-29 18:11:49'),
(101, '1', 'LOGIN', 'User logged IN', '2025-10-13 09:32:33'),
(102, '1', 'LOGIN', 'User logged IN', '2025-10-13 09:42:45'),
(103, '1', 'UPDATE STATUS', 'Updated the status of Employee Number 16', '2025-10-13 09:42:57'),
(104, '1', 'LOGOUT', 'User logged out', '2025-10-13 09:43:01'),
(105, '16', 'LOGIN', 'User logged IN', '2025-10-13 09:43:09'),
(106, '16', 'Update Details', 'Changed User details of Kavishka Imalsha', '2025-10-13 09:44:22'),
(107, '16', 'Update Details', 'Changed User details of Kavishka Imalsha', '2025-10-13 09:44:28'),
(108, '16', 'Update Details', 'Changed the user password', '2025-10-13 09:44:42'),
(109, '16', 'LOGOUT', 'User logged out', '2025-10-13 09:44:49'),
(110, '16', 'LOGIN', 'User logged IN', '2025-10-13 09:44:53'),
(111, '16', 'LOGOUT', 'User logged out', '2025-10-13 09:44:55'),
(112, '1', 'LOGIN', 'User logged IN', '2025-10-13 09:45:10'),
(113, '1', 'LOGOUT', 'User logged out', '2025-10-13 09:46:10'),
(114, '1', 'LOGIN', 'User logged IN', '2025-10-19 06:50:26'),
(115, '1', 'Register', 'New user Registered', '2025-10-19 06:51:52'),
(116, '1', 'UPDATE STATUS', 'Updated the status of Employee Number 17', '2025-10-19 06:52:04'),
(117, '1', 'LOGOUT', 'User logged out', '2025-10-19 06:52:08'),
(118, 'ifrangills@gmail.com', 'LOGIN_FAILED', 'Invalid email', '2025-10-19 06:52:34'),
(119, '1', 'LOGIN', 'User logged IN', '2025-10-19 06:53:35'),
(120, '1', 'UPDATE STATUS', 'Updated the status of Employee Number 17', '2025-10-19 06:54:02'),
(121, '1', 'LOGOUT', 'User logged out', '2025-10-19 06:54:05'),
(122, '17', 'LOGIN', 'User logged IN', '2025-10-19 06:54:18'),
(123, '17', 'Update Details', 'Changed User details of Ifran', '2025-10-19 06:54:29'),
(124, '17', 'ADD SPARE PART', 'Spare part is added 10A 3pole', '2025-10-19 06:56:40'),
(125, '17', 'ADD SPARE PART', 'Spare part is added 10A 3pole MCB', '2025-10-19 06:58:03'),
(126, '17', 'ADD SPARE PART', 'Spare part is added 20A 3pole MCB', '2025-10-19 06:58:31'),
(127, '17', 'ADD SPARE PART', 'Spare part is added 10A 3pole RCCB', '2025-10-19 06:59:07'),
(128, '17', 'LOGOUT', 'User logged out', '2025-10-19 07:15:49'),
(129, '17', 'LOGIN', 'User logged IN', '2025-10-19 07:16:43'),
(130, '17', 'LOGOUT', 'User logged out', '2025-10-19 07:29:21'),
(131, '1', 'LOGIN', 'User logged IN', '2025-10-19 20:10:11'),
(132, '1', 'LOGOUT', 'User logged out', '2025-10-19 20:10:29'),
(133, '1', 'LOGIN', 'User logged IN', '2025-10-19 20:10:37'),
(134, '1', 'LOGIN', 'User logged IN', '2025-10-19 21:14:35'),
(135, '1', 'LOGOUT', 'User logged out', '2025-10-19 21:15:26'),
(136, '1', 'LOGIN', 'User logged IN', '2025-10-19 21:15:44'),
(137, '1', 'ADD SPARE PART', 'Spare part is added asdad', '2025-10-19 21:15:53'),
(138, '1', 'LOGOUT', 'User logged out', '2025-10-19 21:16:17'),
(139, '1', 'LOGIN', 'User logged IN', '2025-10-19 21:16:43'),
(140, '1', 'ADD SPARE PART', 'Spare part is added Tap', '2025-10-19 21:17:12'),
(141, '1', 'LOGIN', 'User logged IN', '2025-10-26 07:58:23'),
(142, '1', 'LOGIN', 'User logged IN', '2025-10-29 15:04:34'),
(143, '1', 'LOGOUT', 'User logged out', '2025-10-29 15:33:37'),
(144, '1', 'LOGIN', 'User logged IN', '2025-11-02 18:55:46'),
(145, '1', 'LOGIN', 'User logged IN', '2025-11-02 19:24:30'),
(146, '1', 'LOGOUT', 'User logged out', '2025-11-02 19:30:14'),
(147, '1', 'LOGIN', 'User logged IN', '2025-11-03 16:38:42'),
(148, '1', 'LOGIN', 'User logged IN', '2025-11-03 16:50:01'),
(149, '1', 'LOGIN', 'User logged IN', '2025-11-06 17:19:21'),
(150, '1', 'LOGOUT', 'User logged out', '2025-11-06 17:20:16'),
(151, 'mohomedmccimshan@gmail.com', 'LOGIN_FAILED', 'Invalid email', '2025-11-06 17:21:05'),
(152, '1', 'LOGIN', 'User logged IN', '2025-11-06 17:21:26'),
(153, '1', 'LOGOUT', 'User logged out', '2025-11-06 17:49:13'),
(154, '1', 'LOGIN', 'User logged IN', '2025-11-06 17:54:59'),
(155, '1', 'LOGIN', 'User logged IN', '2025-11-06 19:17:30'),
(156, '1', 'LOGIN', 'User logged IN', '2025-11-15 06:05:00'),
(157, '1', 'Register', 'New user Registered', '2025-11-15 06:09:34'),
(158, '1', 'LOGIN', 'User logged IN', '2025-11-15 10:50:51'),
(159, '1', 'LOGIN', 'User logged IN', '2025-11-15 12:00:48'),
(160, '1', 'LOGOUT', 'User logged out', '2025-11-15 12:05:00'),
(161, '1', 'LOGIN', 'User logged IN', '2025-11-17 06:30:48'),
(162, '1', 'LOGIN', 'User logged IN', '2025-11-18 10:39:36'),
(163, '1', 'LOGIN', 'User logged IN', '2025-11-18 12:16:32'),
(164, '1', 'Updated Stock', 'Quantity of Tap is updated by 1111', '2025-11-18 12:16:49'),
(165, '1', 'LOGOUT', 'User logged out', '2025-11-18 12:46:03');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `spare_parts_tbl`
--
ALTER TABLE `spare_parts_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `empNum` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `user_logs`
--
ALTER TABLE `user_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=166;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
