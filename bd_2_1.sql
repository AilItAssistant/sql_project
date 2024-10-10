-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-10-2024 a las 11:43:55
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_2.1`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `answers`
--

CREATE TABLE `answers` (
  `id` bigint(20) NOT NULL,
  `question_id` bigint(20) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `is_correct` tinyint(1) NOT NULL,
  `status` varchar(255) DEFAULT 'active',
  `letter` varchar(1) DEFAULT NULL,
  `photo_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `blocks`
--

CREATE TABLE `blocks` (
  `id` bigint(20) NOT NULL,
  `name` text NOT NULL,
  `skill_id` bigint(20) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` varchar(255) DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `blocks`
--

INSERT INTO `blocks` (`id`, `name`, `skill_id`, `description`, `status`) VALUES
(48, 'Estar o hay', 2, NULL, 'active'),
(49, 'Tener y haber', 2, NULL, 'active'),
(50, 'Gustar y similares', 2, NULL, 'active'),
(51, 'Presente irregular', 2, NULL, 'active'),
(52, 'Descripción física', 1, NULL, 'active'),
(53, 'Género y número', 2, NULL, 'active'),
(54, 'Cantidad', 1, NULL, 'active'),
(55, 'Reflexivos', 2, NULL, 'active'),
(56, 'Ropa', 1, NULL, 'active'),
(57, 'Tiempo atmosférico', 1, NULL, 'active'),
(58, 'Pretérito perfecto', 2, NULL, 'active'),
(59, 'Pronombres OD y OI gustar', 2, NULL, 'active'),
(60, 'Preposiciones', 2, NULL, 'active'),
(61, 'Vocabulario', 1, NULL, 'active'),
(62, 'Variadas gramatica', 2, NULL, 'active'),
(63, 'Preguntas con frases', 26, NULL, 'active'),
(64, 'Preguntas con imágenes', 26, NULL, 'active'),
(65, 'prueba Bloque', 345, NULL, 'active');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `classes`
--

CREATE TABLE `classes` (
  `id` bigint(20) NOT NULL,
  `name` text NOT NULL,
  `schedule` text DEFAULT NULL,
  `room_number` text DEFAULT NULL,
  `level_id` bigint(20) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `classes`
--

INSERT INTO `classes` (`id`, `name`, `schedule`, `room_number`, `level_id`, `status`) VALUES
(1, 'Clase de Vocabulario', 'Lunes y Miércoles 10:00-12:00', '102', 31, 'active'),
(2, 'Clase de Gramática', 'Lunes y Miércoles 10:00-12:00', '106', 31, 'active'),
(3, 'Clase de Matemáticas', 'Lunes y Miércoles 10:00-12:00', '104', 16, 'active'),
(4, 'Matemáticas Avanzadas', 'Lunes y Miércoles 10:00-12:00', 'Aula 101', 13, 'active'),
(5, 'Matemáticas Avanzadas', 'Lunes y Miércoles 10:00-12:00', 'Aula 101', 16, 'active'),
(6, 'Matemáticas Avanzadas', 'Lunes y Miércoles 10:00-12:00', 'Aula 105', 17, 'active'),
(28, 'Lengua', '12:30', 'dfg', 20, 'active');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `class_teachers`
--

CREATE TABLE `class_teachers` (
  `class_id` bigint(20) NOT NULL,
  `teacher_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `class_teachers`
--

INSERT INTO `class_teachers` (`class_id`, `teacher_id`) VALUES
(1, 1),
(2, 2),
(3, 1),
(4, 2),
(4, 3),
(5, 2),
(6, 2),
(28, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `exams`
--

CREATE TABLE `exams` (
  `id` bigint(20) NOT NULL,
  `student_id` bigint(20) DEFAULT NULL,
  `teacher_id` bigint(20) DEFAULT NULL,
  `skill_id` bigint(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `completed` tinyint(1) DEFAULT 0,
  `score` int(11) DEFAULT NULL,
  `feedback` text DEFAULT NULL,
  `level_id` bigint(20) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `exams`
--

INSERT INTO `exams` (`id`, `student_id`, `teacher_id`, `skill_id`, `created_at`, `completed`, `score`, `feedback`, `level_id`, `status`) VALUES
(1, 1, 1, 1, '2024-08-22 07:18:47', 0, NULL, NULL, 17, 'active'),
(2, 2, 2, 2, '2024-08-22 07:18:47', 0, NULL, NULL, 20, 'active'),
(3, 3, 3, 25, '2024-08-22 07:18:47', 0, NULL, NULL, 13, 'active');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `exam_questions`
--

CREATE TABLE `exam_questions` (
  `exam_id` bigint(20) DEFAULT NULL,
  `question_id` bigint(20) DEFAULT NULL,
  `chosen_answer_id` bigint(20) DEFAULT NULL,
  `is_correct` tinyint(1) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `exam_questions`
--

INSERT INTO `exam_questions` (`exam_id`, `question_id`, `chosen_answer_id`, `is_correct`, `status`) VALUES
(1, 1, 1, 1, 'active'),
(2, 2, 3, 1, 'active'),
(3, 3, 5, 1, 'active');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `exam_requests`
--

CREATE TABLE `exam_requests` (
  `id` bigint(20) NOT NULL,
  `teacher_id` bigint(20) DEFAULT NULL,
  `skill_id` bigint(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `resultado` text DEFAULT NULL,
  `status` varchar(255) DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `exam_requests`
--

INSERT INTO `exam_requests` (`id`, `teacher_id`, `skill_id`, `created_at`, `resultado`, `status`) VALUES
(1, 1, 1, '2024-08-22 07:19:03', 'Aprobado', 'activo'),
(2, 2, 2, '2024-08-22 07:19:03', 'Pendiente', 'activo'),
(3, 3, 1, '2024-08-22 07:19:03', 'Reprobado', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `exam_statements`
--

CREATE TABLE `exam_statements` (
  `exam_id` bigint(20) NOT NULL,
  `statement_id` bigint(20) NOT NULL,
  `status` varchar(255) DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `exam_statements`
--

INSERT INTO `exam_statements` (`exam_id`, `statement_id`, `status`) VALUES
(1, 1, 'active'),
(2, 2, 'active'),
(3, 3, 'active');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `levels`
--

CREATE TABLE `levels` (
  `id` bigint(20) NOT NULL,
  `name` text NOT NULL,
  `status` text DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `levels`
--

INSERT INTO `levels` (`id`, `name`, `status`) VALUES
(13, 'B1', 'inactive'),
(16, 'B2', 'inactive'),
(17, 'C1', 'inactive'),
(20, 'C2', 'inactive'),
(27, 'A1', 'active'),
(31, 'A2', 'inactive'),
(34, 'Prueba nivel', 'active');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `photos`
--

CREATE TABLE `photos` (
  `id` bigint(20) NOT NULL,
  `base64_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `photos`
--

INSERT INTO `photos` (`id`, `base64_data`) VALUES
(45, 'data:image/png;base64,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'),
(53, 'data:image/png;base64,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'),
(56, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAYAAACAvzbMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QcbDQIL+nCBhgAADcNJREFUeNrt3c2rpnUdx/H3OWfKhyh0CLVCVwNTlKI9EBJEBgm5kLBN69pK/0Eym1q1KJ2VLaKgRYsKIhSEFiJkSShqT5vJyKissRFDnBnHMy3OJQyD4Zwz9zlzXb/79YKbJoK4z+/3+X4/5zoPnAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYE1sLOR9bk3v9cbq3dX56lz1z2p7egGMsIvPK5DVOVzdUn2iuqe6aSqMf1Q/r56t/ly9JoPAwlxb3TDtuKumT5Zfrn5XvVmdVSCX56Hqtuqzb/O/na6eqh6rvimLwILcNr3uqT5dXd3OV1Zeqn5SPVc9Pf13dunm6nj1enVmeqx7u9eZ6t/VN6rrHRuwAHdXj1QnptJ484Kd9tZXWH5ffXfaheyxPM5f4kuJAEspj19dUBb/b6dtTzvwuBLZ3/JQIsDSyuNSX0rkAMpDiQCjlYcSOcDyUCLAaOWhRA6wPJQIMFp5KJEDLA8lAoxWHkrkAMtDiQCjlYcSOcDyUCLAaOVxcYmspYcPoDgufj0g18AA5XFhiTy8Tk8iB/nk4UkEGLU8LnytxZezrmR5KBFgxPJYi++JzKE8lAgwWnkMXyJzKg8lAoxWHsOWyBzLQ4kAo5XHcCUy5/JQIsBo5TFMiSyhPJQIMFp5LL5EllQeSgQYrTwWWyI3tvNXtJZUHkoEGK08Fvcb6++uvtjOn2LcXmCBKBFgpPK4sEQeqg6v8kC29qFA7q3uqt670JBcW906Hfrz1WlzA8qjOlbdudD3v129UT05fZJ8fo5v8lPVUwt++vAkAoz05HHx62vVoTk+gWxMn7l/pbpugNB4EgGW/uRxsXPVE9V/V/F/trniN/fmKtttBt5ffb2635MIKI8B3NTOtxpWYtUFcmb6TH1biQDKY3be+vbCSqz6m+gb1Yerj+5DOV1JvpwFymMEv6kerV6dY4GcbedLWHe0832QDSUCKI9ZOF19u/p1M/4q0W3VI43xEwt+OgvWqzxG+Wmri19nqsenT4JX9tWhrX24hJemJXukMf+4iScR8OSxNKeqH7Xz5auz2tyTCGBX7WZXuRglAthR67OjXBBgN9lNLkqJgPKwk1yYCwPlYRe5OBcH2EHrsINcIGD32D0uUomAnWPnuFAXCnbNUl9ruWuUCGDHXN6OeWCdd4wSAeyWNfoNcxetRMBOsVNcuAsHu8QucfEuHuwQO0QABACwO+wOQRAEsDPsDIEQCLAr7ArBEAywI+wIAREQsBvsBgQFsBPsBIERGLAL7ALBERywA+wAARIgMPtmX5AECcy8mUegBArMOoIlWGDGzbiACRiYbbMtaIIGZtpMI3Bgls0ygid4YIYRQAEEs2t2BVEQwcyaWYEUSDCrZhXBFEzMqBlFQAUUs2k2EVRBBTNpJgVWYMEsmkUEF8ygGUSABRizZ/YQZEHGzJk5BFqgwayZNcEWbDBjZgwBF3DMltlC0AUdM2WmEHiBxyyZJQRf8MEMgQEAs2N2MAgGATNjZjAQBgKzYlYwGAYDM2JGMCAGBMwGGBSDgpkwExgYA4NZMAsYHIODGTADGCADhOzLPhgkZF7mwUAZKGRd1jFYBgsZl3EMmAFDtmUbg2bQkGmZBgNn4GRZlsHgGTxkWIYxgAYQ2ZVdDKJBRGZlFgwksiqrYDANpozKKBhQA4psgkE1qMikTGJgDSyyKItgcA2uDMogGGADLHuyBwbZICNzYKANNLIma2CwkTEZAwNuwGVLtsCgG3SZkikw8AZelmQJDL7BR4ZkCCwAC0B2ZAcsAotAZmQGLAQLQVZkBSwGi0FGZAQsCAsC2QAsCotCJmQCLAwLQxZkASwOi0MGZAAsEAvE3bt7wCKxSNw5YKFYKO7aXYPFYrG4Y3cMFowF427dLSgRi8adulPAwlnzheMuAYvH4nGHygMsIAvI3bk7UCIWkTtzZ4CFdL27cleAxbSOi8kdARaUBeVulAcoEYvKnSgPwMJyF+4CsLhGWFzuAFAiFpizVx6gRCwyZ648AAtthgvNWQNKxGJzxsoDsOCcrfIALLoZLjpnCigRC89ZKg/A4tv/xecMASViATo75QFYhPu/CI86MwAlspezesVZASgRZ6Q8ACWyrwvS2QBYlLtelM4EwMLc9cJ0FgBKZNeL0xkAKJFdL1DlAaBEdr1IlQeAEtn1QlUeAEpk14v1B9VTygNAiez29YbygLe35Qi4TCeqF6sj1c0Dfnybg97byerB6nh1SoxRICgRlAcKBCWC8kCBoERQHigQUCLKAxQISkR5gAJBiaA8gNGM/nsifs8DQIkoDwAlojyUB6BEvJQHgBJRHgBKRHkAKBHlAaBElAeAEvFSHgDv4Gj1ikJQHgCeRJQHgBJRHgBKRHkAKBHlAYASUR4ASkR5ACgR5QGgRJQHgBJRHgDsqUT+MHh5vFZ9S3mwBJuOAIC92HIELMTR6jvVHYN/nO+qPjI9jTxfnXb1KBDYu7urx6oja/LxXlvdqkRQIHD55XFsjcpDiQCsqDz8IqGfyAJQHkoEQHkoEQDloUQAlIcSAVAeXkqEefNjvMylPI5VdzqKS+JHfFEgoDyUCAoElIcSQYGA8lAioEBQHkoEFAjKAyWCAkF5oERQIKA8lAgKBJSHEgEFgvJQIkoEBYLyQImgQFAeKBEUCCgPJYICAeWhRECBoDxQIigQlAdKBAWC8kCJoEBgrcrjXLWpRECBoDx242T10+ps9SElArC68hj5b5hf+HfHj1av5G+sAyiPPSzUdfyYAZTHihapEgFQHnteoM4AQHnseXE6CwDlseeF6UwALMo9L0pnA2BBOiMlAiiPg1+MzgrAQnRmSgSwCA9+ETo7QHlYgM5QiQAW38EvPmcJKA8Lz5kqEcCic7ZKBLDgFrTgnDGgPCw2Z61EAAvNmSsRwCJb0CJz9oDysMDcgRIB5WFxuQslAlhY7sSdABbVOiwqdwNYUBaUO1IioDwsJnflrkB5WEjuzJ0BFtE6LCJ3B1hAFpA7VCJg8Vg87tJdgoVj4bhTdwpYNO7W3QIWjAXjjpUIWCwWi7t212ChWCju3J2DRWKRuHt3DxaIBSIDMgBYHBaHLMgCWBgWhkzIBFgUFoVsyAZYEBaEjMgIWAwWA7ICWAgWgszIDFgEFoHsyA5YABaADMkQGHyDL0uyBAbewCNTMgUGHdmSLTDgBlzGZAwMtsGWNVkDA22gkTkwyAYZ2ZM9MMDIoAyCwTW4siiLYGANrEzKJBhUg4psyiYG1IAiozKKwTSYyKqsgoE0kDIrs2AQDSKyCwbQACLDMozBM3jIsixj4AwcMi3TYNAMmmzLNhgwA4aMyzgGy2Ah67KOgTJQyLzMY5AMErIv+2CAwAyAwTE4mAWzgIExMJgJM4FBMSiYDbOBATEgmBEzAgYDzIpZwUAYCMyMmcEgGATMjtnBABgAzJAZQvAFH8wSAi/wYKbMFIIu6Jgts4WACzhmzIwh2IKNWTNrCLRAg5kzc4IsyGD2zB4CLMCYQTOI4AouZtEsIrACC2YSQRVUMJtmU0AFFMyoGUUwwayaVQRSIDGzZhZBFEQwu2ZXAAUQzLAZFjzBA7NslhE4MNNmGkETNDDbCJiAgRk344IlWGDWzbpACRSYeTMvSIIEZt/sI0ACBHaAHSA4ggN2gV0gMAIDdoKdICiCAnaD3SAgAgLYEQgGYFfYFQIhEGBn2BmCIAhgd9gdAiAAYIfYIS7exQN2iV3iwgE7xU5x0S4a7Ba7xQW7YLBj7BgX62IBu8aFulDAzln3neMiAbvH7nGBygPsIDvIxbk4UCJ2kQtzYYCdNMJOclGA3WQ3uSDlAUrEjnIxygOwq1yICwHsrEvYWe+b+0V8RnkASmR2r2erz1eHVnVgWyu+gMPVl6svVVcPGLCT1YPV8eqUeYOhnKherI5UNw/48Z2bPsZnpn/PzseqX0xvzpMH4ElkPq/t6vHqjjke+lXV/dWr0xtVHoASmVeBvFB9odpYxSFtrvjx6JrpjW4MFCRftoL181h1rHpyoI9pY9rRm3MskM12vqeyNdCBKw9QIqOUyPnqter16d+zKpBD1Zmp2c4PcNjKAxipRDaq56uX5rqjP1n9Mt/zAMYywvdEXqi+2s6XsVZi1V9uOlPdUN2+yjfpyQO4wkb4Ed9nqh9OH8ds3VU97ckD8CQyq18ivG8ph3zf9IaVB6BElMfQJaI8gBFLZJHlsaQSUR7AiCWy6PJYQokoD2DEEhmiPOZcIsoDGLFEhiqPOZaI8gBGLJEhy2NOJaI8gBFLZOjymEOJKA9gxBJZi/K4kiWiPIARS2StyuNKlIjyAEYskbUsj4MsEeUBjFgia10eB1EiygMYsUSUxz6XiPIARiwR5bHPJaI8gBFLRHnsc4koD2DEElEe+1wiygMYsUSUxz6XiPIARiwR5bHPJaI8gCWWyKnqXLV9wT5769//aeevu862PLZmfMB/rP7Vzt9Y36iumw51Y/rPqr9Xf6m+n79hDizHiepP1d+qs9UHqjNTmZyrnqh+XH2venSuH8TGAg7649Xt1b3VrdV7qterv1Y/q56rflu9KpPAwhyuPlh9rrpm+qT+zFQgL1Qvz/nNbyzkkK+pbqlunP69XZ2cGvyNqbEBluqqaY9tVoemT5LZh8LbXFDxAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC8o/8BjuveS2agP2oAAAAASUVORK5CYII=');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `questions`
--

CREATE TABLE `questions` (
  `id` bigint(20) NOT NULL,
  `content` text DEFAULT NULL,
  `block_id` bigint(20) DEFAULT NULL,
  `skill_id` bigint(20) DEFAULT NULL,
  `level_id` bigint(20) DEFAULT NULL,
  `statement_id` bigint(20) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'active',
  `photo_id` bigint(20) DEFAULT NULL,
  `puntuation` char(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `questions`
--

INSERT INTO `questions` (`id`, `content`, `block_id`, `skill_id`, `level_id`, `statement_id`, `status`, `photo_id`, `puntuation`) VALUES
(16, 'Francisco escribe una carta sobre:', NULL, NULL, 27, 17, 'active', NULL, NULL),
(17, 'Va a empezar a trabajar:', NULL, NULL, 27, 17, 'active', NULL, NULL),
(18, 'Va a trabajar en:', NULL, NULL, 27, 17, 'active', NULL, NULL),
(19, 'En su trabajo, Francisco tiene que:', NULL, NULL, 27, 17, 'active', NULL, NULL),
(20, 'Cuándo tiene Francisco prácticas de laboratorio:', NULL, NULL, 27, 17, 'active', NULL, '2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `skills`
--

CREATE TABLE `skills` (
  `id` bigint(20) NOT NULL,
  `name` text NOT NULL,
  `description` text DEFAULT NULL,
  `level_id` bigint(20) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `skills`
--

INSERT INTO `skills` (`id`, `name`, `description`, `level_id`, `status`) VALUES
(1, 'Léxico', 'Habilidad de vocabulario', 27, 'active'),
(2, 'Gramática', 'Habilidad de gramática', 27, 'active'),
(24, 'Redacción', NULL, 27, 'active'),
(25, 'Compresión lectora', NULL, 27, 'active'),
(26, 'Audio', NULL, 27, 'active'),
(27, 'Oral', NULL, 27, 'active'),
(345, 'Prueba destreza', NULL, 34, 'active');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `statements`
--

CREATE TABLE `statements` (
  `id` bigint(20) NOT NULL,
  `exam_id` bigint(20) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `skill_id` bigint(20) DEFAULT NULL,
  `text` text DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `level_id` bigint(20) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'active',
  `photo_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `statements`
--

INSERT INTO `statements` (`id`, `exam_id`, `content`, `skill_id`, `text`, `score`, `level_id`, `status`, `photo_id`) VALUES
(16, NULL, 'Un amigo le escribe para saber cómo es su vida en Madrid. Escríbale un\ncorreo con esta información. En él debe saludar, describir su rutina y sus actividades de tiempo libre y despedirse. ', 24, 'El numero de palabras debe de ser  entre 20 y 30 palabras.', 30, 27, 'active', NULL),
(17, NULL, 'Lea este mensaje de correo electrónico. A continuación, responda a cinco\npreguntas sobre el texto. Elija la respuesta correcta (a, b, c, d):', 25, '      ¡Hola familia!:\n\n¿Cómo estáis? Yo estoy muy contento porque el martes que viene empiezo a trabajar.\nVoy a trabajar en la biblioteca de mi universidad. Mis tareas son organizar los archivos\ny colocar los libros en las estanterías. Algunas veces también tengo que hablar con los\nestudiantes sobre los libros, pero no tengo que hacer fotocopias.\nTengo un horario muy bueno: todas las tardes de 16:00 a 20:00, así que puedo\nestudiar por las mañanas. Una vez al mes tengo que trabajar los sábados.\nLas clases en la universidad son muy interesantes. Tengo clase todos los días,\nexcepto los miércoles por la mañana, porque tengo prácticas en el laboratorio. Los\nfines de semana estudio con mis compañeros en la biblioteca de la universidad porque\ntenemos muchos exámenes. Por ejemplo, tengo un examen de lengua española el\njueves.\nBueno, ya sabéis las buenas noticias. Nos vemos el próximo mes porque en abril\ntenemos cuatro días de vacaciones.\nOs quiero mucho,\n\n      Francisco', 10, 27, 'active', NULL),
(18, NULL, 'Prueba oral. Preséntese. Debe dar información personal como el nombre, la nacionalidad y la\nedad, y puede hablar de su trabajo o estudios, por qué estudia español, etc.\nSeleccione tres de las cinco opciones para hablar durante 2 o 3 minutos.', 27, 'Seleccione tres de las cinco opciones para hablar durante 2 o 3 minutos.', 15, 27, 'active', NULL),
(43, NULL, 'ghjghhjghj', 345, 'jhgjjghgjhj', 10, 34, 'active', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `students`
--

CREATE TABLE `students` (
  `id` bigint(20) NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `enrollment_date` date DEFAULT curdate(),
  `phone_number` text DEFAULT NULL,
  `address` text DEFAULT NULL,
  `last_name` text DEFAULT NULL,
  `identification_document` text DEFAULT NULL,
  `city` text DEFAULT NULL,
  `level_id` bigint(20) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `students`
--

INSERT INTO `students` (`id`, `name`, `email`, `date_of_birth`, `enrollment_date`, `phone_number`, `address`, `last_name`, `identification_document`, `city`, `level_id`, `status`) VALUES
(1, 'Juán Manuel', 'juan.perez@example.com', '2024-09-04', '2024-08-22', '96385274112', 'Juan de esplandiú', 'Pérez Rodriguez', '96332154K', 'Madrid', 13, 'active'),
(2, 'María', 'maria.lopez@exple.com', '2024-09-06', '2024-08-22', '96321458741', 'odonell', 'Giménez Álvarez', '85463129P', 'Barcelona', 17, 'active'),
(3, 'Carlos', 'carlos.garcia@example.com', '2024-09-03', '2024-08-22', '213654789512', 'Barbara de braganza', 'Fernandez Alonso', '74569832N', 'Málaga', 31, 'active'),
(6, 'Jimeno', 'sddfsfsfsf@efeflfd.cob', '2024-10-24', '2024-10-01', '963215478', 'qwerysddsds', 'Fernandez', '8755365D', 'valencia', 20, 'active');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `student_classes`
--

CREATE TABLE `student_classes` (
  `student_id` bigint(20) NOT NULL,
  `class_id` bigint(20) NOT NULL,
  `enrollment_date` date DEFAULT curdate(),
  `status` varchar(255) DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `student_classes`
--

INSERT INTO `student_classes` (`student_id`, `class_id`, `enrollment_date`, `status`) VALUES
(1, 1, '2024-10-02', 'active'),
(1, 4, '2024-10-02', 'active'),
(1, 6, '2024-10-02', 'active'),
(3, 1, '2024-10-04', 'active'),
(3, 2, '2024-10-04', 'active'),
(3, 3, '2024-10-04', 'active'),
(3, 6, '2024-10-04', 'active'),
(6, 3, '2024-10-04', 'active'),
(6, 4, '2024-10-04', 'active');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `teachers`
--

CREATE TABLE `teachers` (
  `id` bigint(20) NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `hire_date` date DEFAULT curdate(),
  `phone_number` text DEFAULT NULL,
  `address` text DEFAULT NULL,
  `department` text DEFAULT NULL,
  `last_name` text DEFAULT NULL,
  `status` varchar(255) DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `teachers`
--

INSERT INTO `teachers` (`id`, `name`, `email`, `hire_date`, `phone_number`, `address`, `department`, `last_name`, `status`) VALUES
(1, 'José', 'qwrty@qwerty.com', '2024-09-27', '693582471', 'calle barbara de braganza', 'Matematicas', 'Fernández', 'active'),
(2, 'Luis', 'luis.fernandez@example.com', '2024-09-18', '753914826', 'calle odonell', 'Matemáticas', 'Fernández Torres', 'active'),
(3, 'Juan', 'qwerty@qwwrty.com', '2024-09-26', '987456321', 'juan de esplandiu', '6546554789321', 'gonzalez', 'active'),
(9, 'Francisco', 'pepee@gmail.com', '2024-10-03', '95123647', 'calle barbara de braganza, 155 alcala de hernares, comunidada de madird', 'matematicas', 'Gonzalez Fernandez', 'active');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `triggers`
--

CREATE TABLE `triggers` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `event` enum('INSERT','UPDATE','DELETE') NOT NULL,
  `table_name` varchar(255) NOT NULL,
  `action` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `username` text NOT NULL,
  `email` text NOT NULL,
  `password_hash` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `name` text DEFAULT NULL,
  `last_name` text DEFAULT NULL,
  `phone_number` text DEFAULT NULL,
  `city` text DEFAULT NULL,
  `permissions` text DEFAULT NULL,
  `status` text DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `created_at`, `name`, `last_name`, `phone_number`, `city`, `permissions`, `status`) VALUES
(1, 'admin_user', 'admin@example.com', '$2b$11$T/Pjr7e5oVv4RsGHi1irtuOhhFTMz7lkh5VfyBUxff96F1fNkoDTO', '2024-08-22 09:44:43', 'Fernando', 'Fernandez Gimenez', '714258369', 'Malaga', 'admin', 'active'),
(2, 'pepete', 'qwerty@qmail.com', 'undefined', '2024-08-22 09:44:43', 'pepete', 'fernandez', '854631279', 'Valencia', 'employee', 'active'),
(3, 'viewer_john', 'john.smith@example.com', 'undefined', '2024-08-22 09:44:43', 'john', 'john', '7428536774', 'Valencia', 'student', 'active'),
(4, 'editor_mary', 'mary.jones@example.com', 'undefined', '2024-08-22 09:44:43', 'mary', 'mary', '987654321', 'Barcelona', 'employee', 'active'),
(11, 'PEPE', 'pepe@gmail.com', '$2b$11$tMoN8Db8wR7tIhhaAjpujOTZPbJgQwUFselQzcp8x8.XFVfeOpBrG', '2024-10-03 13:57:25', 'Pepito', 'Jimenez Alvarez', '7896542123', 'Madrid', 'employee', 'active'),
(19, 'qw', 'pepee@gmail.com', '$2b$11$/99cNAaLh5WruxCZFGq/Q.MeWC0ZmvT1s0MXBxSZUgQvh7EoratLy', '2024-10-04 07:22:02', 'qw', 'qw', '7896542123', 'qw', 'employee', 'active');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_actions`
--

CREATE TABLE `user_actions` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `action_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `action_type` text NOT NULL,
  `data_before` text DEFAULT NULL,
  `data_after` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_id` (`question_id`),
  ADD KEY `fk_answers_photos` (`photo_id`);

--
-- Indices de la tabla `blocks`
--
ALTER TABLE `blocks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `skill_id` (`skill_id`);

--
-- Indices de la tabla `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `level_id` (`level_id`);

--
-- Indices de la tabla `class_teachers`
--
ALTER TABLE `class_teachers`
  ADD PRIMARY KEY (`class_id`,`teacher_id`),
  ADD KEY `teacher_id` (`teacher_id`);

--
-- Indices de la tabla `exams`
--
ALTER TABLE `exams`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `skill_id` (`skill_id`),
  ADD KEY `level_id` (`level_id`);

--
-- Indices de la tabla `exam_questions`
--
ALTER TABLE `exam_questions`
  ADD KEY `exam_id` (`exam_id`),
  ADD KEY `question_id` (`question_id`),
  ADD KEY `chosen_answer_id` (`chosen_answer_id`);

--
-- Indices de la tabla `exam_requests`
--
ALTER TABLE `exam_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `skill_id` (`skill_id`);

--
-- Indices de la tabla `exam_statements`
--
ALTER TABLE `exam_statements`
  ADD PRIMARY KEY (`exam_id`,`statement_id`),
  ADD KEY `statement_id` (`statement_id`);

--
-- Indices de la tabla `levels`
--
ALTER TABLE `levels`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`) USING HASH;

--
-- Indices de la tabla `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `block_id` (`block_id`),
  ADD KEY `skill_id` (`skill_id`),
  ADD KEY `level_id` (`level_id`),
  ADD KEY `fk_questions_photos` (`photo_id`),
  ADD KEY `statements_ibfk4` (`statement_id`);

--
-- Indices de la tabla `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`id`),
  ADD KEY `level_id` (`level_id`);

--
-- Indices de la tabla `statements`
--
ALTER TABLE `statements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `skill_id` (`skill_id`),
  ADD KEY `level_id` (`level_id`),
  ADD KEY `fk_statements_photos` (`photo_id`);

--
-- Indices de la tabla `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`) USING HASH,
  ADD KEY `level_id` (`level_id`);

--
-- Indices de la tabla `student_classes`
--
ALTER TABLE `student_classes`
  ADD PRIMARY KEY (`student_id`,`class_id`),
  ADD KEY `class_id` (`class_id`);

--
-- Indices de la tabla `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`) USING HASH;

--
-- Indices de la tabla `triggers`
--
ALTER TABLE `triggers`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`) USING HASH,
  ADD UNIQUE KEY `email` (`email`) USING HASH;

--
-- Indices de la tabla `user_actions`
--
ALTER TABLE `user_actions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `answers`
--
ALTER TABLE `answers`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;

--
-- AUTO_INCREMENT de la tabla `blocks`
--
ALTER TABLE `blocks`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT de la tabla `classes`
--
ALTER TABLE `classes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `exams`
--
ALTER TABLE `exams`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `exam_requests`
--
ALTER TABLE `exam_requests`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `levels`
--
ALTER TABLE `levels`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `photos`
--
ALTER TABLE `photos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT de la tabla `questions`
--
ALTER TABLE `questions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT de la tabla `skills`
--
ALTER TABLE `skills`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=346;

--
-- AUTO_INCREMENT de la tabla `statements`
--
ALTER TABLE `statements`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT de la tabla `students`
--
ALTER TABLE `students`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `triggers`
--
ALTER TABLE `triggers`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `user_actions`
--
ALTER TABLE `user_actions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`);

--
-- Filtros para la tabla `blocks`
--
ALTER TABLE `blocks`
  ADD CONSTRAINT `blocks_ibfk_1` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`);

--
-- Filtros para la tabla `classes`
--
ALTER TABLE `classes`
  ADD CONSTRAINT `classes_ibfk_2` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`);

--
-- Filtros para la tabla `class_teachers`
--
ALTER TABLE `class_teachers`
  ADD CONSTRAINT `class_teachers_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `class_teachers_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `exams`
--
ALTER TABLE `exams`
  ADD CONSTRAINT `exams_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`),
  ADD CONSTRAINT `exams_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`),
  ADD CONSTRAINT `exams_ibfk_3` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`),
  ADD CONSTRAINT `exams_ibfk_4` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`);

--
-- Filtros para la tabla `exam_questions`
--
ALTER TABLE `exam_questions`
  ADD CONSTRAINT `exam_questions_ibfk_1` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`),
  ADD CONSTRAINT `exam_questions_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`),
  ADD CONSTRAINT `exam_questions_ibfk_3` FOREIGN KEY (`chosen_answer_id`) REFERENCES `answers` (`id`);

--
-- Filtros para la tabla `exam_requests`
--
ALTER TABLE `exam_requests`
  ADD CONSTRAINT `exam_requests_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`),
  ADD CONSTRAINT `exam_requests_ibfk_2` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`);

--
-- Filtros para la tabla `exam_statements`
--
ALTER TABLE `exam_statements`
  ADD CONSTRAINT `exam_statements_ibfk_1` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`),
  ADD CONSTRAINT `exam_statements_ibfk_2` FOREIGN KEY (`statement_id`) REFERENCES `statements` (`id`);

--
-- Filtros para la tabla `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `fk_questions_photos` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`block_id`) REFERENCES `blocks` (`id`),
  ADD CONSTRAINT `questions_ibfk_2` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`),
  ADD CONSTRAINT `questions_ibfk_3` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`),
  ADD CONSTRAINT `statements_ibfk4` FOREIGN KEY (`statement_id`) REFERENCES `statements` (`id`);

--
-- Filtros para la tabla `skills`
--
ALTER TABLE `skills`
  ADD CONSTRAINT `skills_ibfk_1` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`);

--
-- Filtros para la tabla `statements`
--
ALTER TABLE `statements`
  ADD CONSTRAINT `fk_statements_photos` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `statements_ibfk_2` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`);

--
-- Filtros para la tabla `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`);

--
-- Filtros para la tabla `student_classes`
--
ALTER TABLE `student_classes`
  ADD CONSTRAINT `student_classes_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`),
  ADD CONSTRAINT `student_classes_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`);

--
-- Filtros para la tabla `user_actions`
--
ALTER TABLE `user_actions`
  ADD CONSTRAINT `user_actions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
