-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 09-12-2021 a las 01:08:16
-- Versión del servidor: 5.7.36
-- Versión de PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `archive-manager`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `file`
--

DROP TABLE IF EXISTS `file`;
CREATE TABLE IF NOT EXISTS `file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) COLLATE utf8_estonian_ci NOT NULL,
  `path` varchar(255) COLLATE utf8_estonian_ci NOT NULL,
  `level` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `mimetype` varchar(255) COLLATE utf8_estonian_ci NOT NULL,
  `size` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_b2d8e683f020f61115edea206b3` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_estonian_ci;

--
-- Volcado de datos para la tabla `file`
--

INSERT INTO `file` (`id`, `filename`, `path`, `level`, `userId`, `mimetype`, `size`) VALUES
(9, 'pdf.pdf', 'files\\pdf-1638929917139-670485377.pdf', 1, 1, 'application/pdf', 722818),
(10, 'pdf.docx', 'files\\pdf-1638930012920-464580236.docx', 3, 1, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 388951),
(14, 'test.txt', 'files\\test-1638948738965-90887450.txt', 2, 1, 'text/plain', 786),
(18, 'otrotest.txt', 'files\\otrotest-1639009760067-372470821.txt', 3, 1, 'text/plain', 14),
(19, 'custom', 'files\\google-1639009865715-595366970.jpg', 3, 1, 'image/jpeg', 46449);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `file`
--
ALTER TABLE `file`
  ADD CONSTRAINT `FK_b2d8e683f020f61115edea206b3` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
