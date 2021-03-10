-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 10, 2021 at 01:32 PM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 5.6.37

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `realtime`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `id` int(11) NOT NULL,
  `from_id` varchar(255) NOT NULL,
  `to_id` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `chat`
--

INSERT INTO `chat` (`id`, `from_id`, `to_id`, `message`, `created_at`) VALUES
(1, '10', '11', 'Adell, have you seen the new episode of Wanda Vision?', '2021-03-10 01:03:28'),
(2, '11', '10', 'I did. I watched it last night and it was so confusing', '2021-03-10 06:48:57'),
(3, '10', '11', 'Me too. I was so confused when her brother showed up', '2021-03-10 06:57:00');

-- --------------------------------------------------------

--
-- Table structure for table `friends`
--

CREATE TABLE `friends` (
  `idFriends` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_friend` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `friends`
--

INSERT INTO `friends` (`idFriends`, `id_user`, `id_friend`) VALUES
(1, 10, 11),
(2, 11, 10),
(9, 10, 14),
(10, 14, 10),
(11, 10, 18),
(12, 18, 10),
(13, 14, 17),
(14, 17, 14),
(15, 14, 16),
(16, 16, 14),
(17, 14, 19),
(18, 19, 14),
(19, 10, 19),
(20, 19, 10),
(21, 19, 13),
(22, 13, 19),
(25, 21, 19),
(26, 19, 21),
(27, 24, 19),
(28, 19, 24),
(29, 24, 12),
(30, 12, 24),
(31, 12, 17),
(32, 17, 12),
(37, 27, 10),
(38, 10, 27);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `room_id` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `bio` varchar(255) NOT NULL,
  `latitude` varchar(255) NOT NULL,
  `longitude` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `room_id`, `email`, `username`, `name`, `password`, `image`, `phone`, `bio`, `latitude`, `longitude`) VALUES
(10, '365', 'tasya@gmail.com', 'tasyaaaa', 'Tasya', '$2b$10$mjzbWqZx4/isawgR3zeKIecEL.8Qq1W/nFKqZqW9JgVIJXTHPle/e', '1615342604906.jpg', '+6281263594760', 'Hello! Tasya here!!', '3.596046803488549', '98.67275547271525'),
(11, '906', 'adel@gmail.com', 'adelll', 'Adel', '$2b$10$Aozi1CgXBShmAzg8/gALjOEF3GICfKw.fizjltJGk9Fl8gj0Moodu', '1613738780082.jpg', '+6232', 'Hello there!!!', '3.596046803488549', '98.67275547271525'),
(12, '989', 'syafa@gmail.com', 'syafa', 'Syafa', '$2b$10$OgRfJAJqt67je/vC77Ico.KTgMTJYdkT.aJ9YkBQ0BZIQ3EESxGS2', '1613911497869.jpg', '+6282165265094', 'Hello there!', '3.596046803488549', '98.67275547271525'),
(13, '611', 'sarah@gmail.com', 'sarah', 'Sarah', '$2b$10$HrhUJRoYKt2lfRy8Cl6G4e0wq22.at0r/a0CDo9Ys3NflFeJxm3vu', '1613738927471.jpg', '+62', 'Hello there!', '3.596046803488549', '98.67275547271525'),
(14, '162', 'fika@gmail.com', 'fika', 'Fika', '$2b$10$/Gy2PWY.OGweUQbJwNHUQufuHfSHUhZ8d1kHMrgexXzTg2a.PWQ5O', '1613842437176.jpg', '+6282165265094', 'Fikaa here!!!', '3.596046803488549', '98.67275547271525'),
(16, '997', 'dea@gmail.com', 'dea', 'Dea', '$2b$10$kwONeSCH/xxZJmwSCQ6qgeDL7DBV6I9wU8mk9J84UvAJdP1UedkC6', '1613739104682.jpg', '+62', 'Hello there!', '3.596046803488549', '98.67275547271525'),
(17, '484', 'rina@gmail.com', 'rina', 'Rina', '$2b$10$WomHSKP25QBRruOX/5bq3.biYCl7qEzJPrCuTc1EB9YNSIxyyUH5C', '1613739155015.jpg', '+62', 'Hello there!', '3.596046803488549', '98.67275547271525'),
(18, '730', 'reno@gmail.com', 'reno', 'Reno', '$2b$10$vECTsJTISwJ7xVkD8wQXpekclqs3UYFjQehzeg9oO0yG3mKNe0keG', '1613739203797.jpg', '+62', 'Hello there!', '3.596046803488549', '98.67275547271525'),
(19, '727', 'della@gmail.com', 'della', 'Della', '$2b$10$nJXUpQzrcBxVls9.ghmxVew9Mfvyisgp4.jnkz5EntZmEucJd35Aq', '1613739251175.jpg', '+62', 'Hello there!', '3.596046803488549', '98.67275547271525'),
(27, '326', 'farah@gmail.com', 'farahh', 'Farah', '$2b$10$ZhY9ZWAhtRVA3sMowY5E1.f.AUcAOrlEvBQ6DgV.wAA/u16biWXwq', '1613963960531.jpg', '+62', 'Hello there!', '3.596046803488549', '98.67275547271525');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `friends`
--
ALTER TABLE `friends`
  ADD PRIMARY KEY (`idFriends`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `friends`
--
ALTER TABLE `friends`
  MODIFY `idFriends` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
