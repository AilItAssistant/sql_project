-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-11-2024 a las 15:58:40
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
-- Base de datos: `test`
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
  `status_id` bigint(20) NOT NULL DEFAULT 1,
  `letter` varchar(1) DEFAULT NULL,
  `photo_id` bigint(20) DEFAULT NULL,
  `response` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `answers`
--

INSERT INTO `answers` (`id`, `question_id`, `content`, `is_correct`, `status_id`, `letter`, `photo_id`, `response`) VALUES
(542, 180, 'Sus compañeros de clase', 0, 1, 'A', NULL, NULL),
(543, 180, 'Sus sentimientos', 1, 1, 'B', NULL, NULL),
(544, 180, 'Su nuevo trabajo y sus estudios', 0, 1, 'C', NULL, NULL),
(545, 180, 'Sus exámenes', 0, 1, 'D', NULL, NULL),
(546, 181, 'En las vacaciones', 1, 1, 'A', NULL, NULL),
(547, 181, 'En mayo', 0, 1, 'B', NULL, NULL),
(548, 181, 'El próximo mes', 0, 1, 'C', NULL, NULL),
(549, 181, 'El próximo martes', 0, 1, 'D', NULL, NULL),
(550, 182, 'Una oficina', 0, 1, 'A', NULL, NULL),
(551, 182, 'Una biblioteca', 0, 1, 'B', NULL, NULL),
(552, 182, 'Un archivo', 1, 1, 'C', NULL, NULL),
(553, 182, 'Una clase', 0, 1, 'D', NULL, NULL),
(554, 183, 'Comprar libros', 0, 1, 'A', NULL, NULL),
(555, 183, 'Hacer fotocopias', 0, 1, 'B', NULL, NULL),
(556, 183, 'Ordenar la sala de lectura', 0, 1, 'C', NULL, NULL),
(557, 183, 'Dar formularios a los estudiantes', 1, 1, 'D', NULL, NULL),
(558, 184, 'Todos los días', 1, 1, 'A', NULL, NULL),
(559, 184, 'Una vez al mes', 0, 1, 'B', NULL, NULL),
(560, 184, 'Los miércoles por la tarde', 0, 1, 'C', NULL, NULL),
(561, 184, 'Un día a la semana por la mañana', 0, 1, 'D', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `blocks`
--

CREATE TABLE `blocks` (
  `id` bigint(20) NOT NULL,
  `name` text NOT NULL,
  `status_id` bigint(20) NOT NULL DEFAULT 1,
  `is_selected` tinyint(4) DEFAULT 0,
  `max_score` int(3) DEFAULT NULL,
  `question_type_id` bigint(20) DEFAULT NULL,
  `individual_score` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `blocks`
--

INSERT INTO `blocks` (`id`, `name`, `status_id`, `is_selected`, `max_score`, `question_type_id`, `individual_score`) VALUES
(75, 'Estar o hay', 1, 1, 2, 1, 1),
(78, 'Gustar y similares', 1, 1, 2, 1, 1),
(79, 'Preguntas con frases', 1, 1, 2, 1, 1),
(80, 'Presente irregular', 1, 1, 2, 1, 1),
(81, 'Pronombres OD y OI gustar', 1, 1, 2, 1, 1),
(82, 'Género y número', 1, 1, 2, 1, 1),
(83, 'Preguntas con imágenes', 1, 1, 5, 5, 1),
(84, 'Tener y haber', 1, 1, 2, 1, 1),
(85, 'Descripción física', 1, 1, 2, 1, 1),
(86, 'Cantidad', 1, 1, 2, 1, 1),
(87, 'Reflexivos', 1, 1, 2, 1, 1),
(88, 'Ropa', 1, 1, 2, 1, 1),
(89, 'Tiempo atmosférico', 1, 1, 2, 1, 1),
(90, 'Pretérito perfecto', 1, 1, 2, 1, 1),
(91, 'Preposiciones', 1, 1, 2, 1, 1),
(92, 'Vocabulario', 1, 1, 2, 1, 1),
(93, 'Variadas gramatica', 1, 1, 2, 1, 1),
(94, 'General comprensión lectora', 1, 1, 15, 3, 15),
(95, 'Preguntas con frases', 1, 1, 5, 4, 1),
(96, 'General oral', 1, 1, 25, 6, 25),
(97, 'General redacción', 1, 1, 20, 2, 20),
(98, 'Estar o hay', 1, 1, 10, 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cities`
--

CREATE TABLE `cities` (
  `id` bigint(20) NOT NULL,
  `name` text NOT NULL,
  `status_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cities`
--

INSERT INTO `cities` (`id`, `name`, `status_id`) VALUES
(1, 'Madrid', 1),
(2, 'Barcelona', 1),
(3, 'Málaga', 1),
(4, 'Valencia', 1);

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
  `status_id` bigint(20) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `classes`
--

INSERT INTO `classes` (`id`, `name`, `schedule`, `room_number`, `level_id`, `status_id`) VALUES
(30, 'Español básico', '22/11/2024', 'Atocha', 41, 1),
(32, 'Español Medio', 'Lunes', 'Sol', 41, 1);

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
(30, 10),
(32, 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departments`
--

CREATE TABLE `departments` (
  `id` bigint(20) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `departments`
--

INSERT INTO `departments` (`id`, `name`) VALUES
(1, 'Gramática');

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `exam_statements`
--

CREATE TABLE `exam_statements` (
  `exam_id` bigint(20) NOT NULL,
  `statement_id` bigint(20) NOT NULL,
  `status` varchar(255) DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `levels`
--

CREATE TABLE `levels` (
  `id` bigint(20) NOT NULL,
  `name` text NOT NULL,
  `status_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `levels`
--

INSERT INTO `levels` (`id`, `name`, `status_id`) VALUES
(41, 'A1', 1),
(42, 'A2', 1),
(43, 'B1', 1),
(44, 'B2', 1),
(45, 'C1', 1),
(46, 'C2', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `levels_blocks`
--

CREATE TABLE `levels_blocks` (
  `level_id` bigint(20) NOT NULL,
  `block_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `levels_blocks`
--

INSERT INTO `levels_blocks` (`level_id`, `block_id`) VALUES
(41, 78),
(41, 75),
(41, 79),
(42, 79),
(42, 78),
(42, 75),
(41, 80),
(42, 80),
(41, 81),
(42, 81),
(41, 82),
(42, 82),
(41, 83),
(42, 83),
(41, 84),
(42, 84),
(41, 85),
(42, 85),
(41, 86),
(42, 86),
(41, 87),
(42, 87),
(41, 88),
(42, 88),
(41, 89),
(42, 89),
(41, 90),
(42, 90),
(41, 91),
(42, 91),
(41, 92),
(42, 92),
(41, 93),
(42, 93),
(41, 94),
(42, 94),
(41, 95),
(42, 95),
(41, 96),
(42, 96),
(41, 97),
(42, 97),
(43, 98);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `levels_skills`
--

CREATE TABLE `levels_skills` (
  `level_id` bigint(20) NOT NULL,
  `skill_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `levels_skills`
--

INSERT INTO `levels_skills` (`level_id`, `skill_id`) VALUES
(41, 349),
(41, 351),
(42, 351),
(41, 352),
(42, 352),
(41, 353),
(42, 353),
(41, 354),
(42, 354),
(41, 355),
(42, 355),
(42, 349);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `levels_unions`
--

CREATE TABLE `levels_unions` (
  `level_id` bigint(20) NOT NULL,
  `union_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `levels_unions`
--

INSERT INTO `levels_unions` (`level_id`, `union_id`) VALUES
(41, 4),
(42, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) NOT NULL,
  `name` text NOT NULL,
  `status_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `status_id`) VALUES
(1, 'admin', 1),
(2, 'employee', 1),
(3, 'student', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `photos`
--

CREATE TABLE `photos` (
  `id` bigint(20) NOT NULL,
  `base64_data` longtext NOT NULL,
  `status_id` bigint(20) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `photos`
--

INSERT INTO `photos` (`id`, `base64_data`, `status_id`) VALUES
(292, 'data:image/png;base64,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', 1);
INSERT INTO `photos` (`id`, `base64_data`, `status_id`) VALUES
(293, 'data:image/png;base64,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CF70ohcdbnzjGw9XvOIVt/guFre85S2Hf//3fx/OfOYzb/H5b1z/+tcv/eAc5zjHFp+OHQlbO992dGwmmMNDB9bYHsbBP//bBFuuSwFPOeWUsoq2peeeotl7772Hf/3Xfy2KjhKbF7ZiWCRsx1zkIhcZLnzhCw/nP//5yyck5PW5z32u5AO2zX71q18Npz/96YcznvGMxS+DPM4xff7zny+rf7LttNNOyw3DMoDcefbb3/62pBP/HSa/T3/60yW8srL8UKzC/P73vx+++tWvlvMytnTOec5zljT5I4qsT+KQVxhpUoYIgvL9/Oc/Hz72sY8N73//+8v1BS94wVIuyv+4444rcVmrnP1hubrqVa86XOhCF1pm8+r/0pe+dCEi5GTlYOWS3te//vXSJtPq5Ic//OHwtre9rYQlu/T97rXXXsOZznSmkp76ePnLXz585CMfGb7yla+UNmgpemBled/73lesLtpEGRHjWGU8//nPL7KoC2Fshe6yyy7FQmPL8j3veU8pe5BpZEidqWvtjzRpQ9ZOVi71oy1sL57lLGcZdt5551Jf+s473vGO4fjjjx9OPvnkUjf6Bnmk9853vrPIqU31A/0LtBsnX/JIgzXxm9/8ZgkT9VgPZjIgP/qOcvz6178ueelv6vaVr3xl2e61tacMZz3rWUu9fvSjHy1lYIGyHfjGN76x1N8lL3nJEl7+rHn6y3nPe96S19vf/vbhqKOOGm52s5uVdrLVq8zGHDnFufKVr1z6qTpRT895znOG1772taUM2i6I2OMe97hSN/re0572tFI3CKJ+S+7HPvaxw6GHHlrG1cUvfvGSpv5KBnH1iaOPPnq42tWuVuoe6npZS6gn40H96Fv64z777FP60o4EbaXd9Xl1f/azn324053utOXp9g9zHau/MRBzzFgYq8aIrXb919yy6P5rDjBnmtflYeFXY73Gy0ogo/loI8iyGtCP2ozOestb3lLmSfeXvexlh913373cr7ZPbBSsK9GidA2Ce9zjHqUThAN53f3udy8d+AUveMHwmte8pihFxIJlJ6/qNQql9IAHPGCZWFBKV7jCFQqxMWBvfetbFwVMeXjmHBTLkbQoZBY1Z5coJbIJi0jJV/7S1ODqADH62c9+Nhx22GHlDI34zhlRkp/85CcLWVJHlNXDH/7w8pwipnj577bbbqWM8rElFXEN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', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `questions`
--

CREATE TABLE `questions` (
  `id` bigint(20) NOT NULL,
  `content` text DEFAULT NULL,
  `block_id` bigint(20) DEFAULT NULL,
  `skill_id` bigint(20) NOT NULL DEFAULT 1,
  `level_id` bigint(20) DEFAULT NULL,
  `statement_id` bigint(20) DEFAULT NULL,
  `photo_id` bigint(20) DEFAULT NULL,
  `score` int(3) DEFAULT NULL,
  `status_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `questions`
--

INSERT INTO `questions` (`id`, `content`, `block_id`, `skill_id`, `level_id`, `statement_id`, `photo_id`, `score`, `status_id`) VALUES
(180, 'Francisco escribe una carta sobre:', NULL, 352, 41, 83, NULL, 2, 1),
(181, 'Va a empezar a trabajar: ', 94, 352, 41, 83, NULL, 2, 0),
(182, 'Va a trabajar en:', NULL, 352, 41, 83, NULL, 2, 0),
(183, 'En su trabajo, Francisco tiene que:', NULL, 352, 41, 83, NULL, 2, 0),
(184, 'Cuándo tiene Francisco prácticas de laboratorio:', NULL, 352, 41, 83, NULL, 2, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `question_types`
--

CREATE TABLE `question_types` (
  `id` bigint(20) NOT NULL,
  `name` text NOT NULL,
  `statement` int(11) NOT NULL,
  `photo` int(11) DEFAULT NULL,
  `text` int(11) DEFAULT NULL,
  `question` int(11) DEFAULT NULL,
  `answer` int(11) DEFAULT NULL,
  `space` int(11) DEFAULT NULL,
  `test_type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `question_types`
--

INSERT INTO `question_types` (`id`, `name`, `statement`, `photo`, `text`, `question`, `answer`, `space`, `test_type`) VALUES
(1, 'Preguntas a granel', 0, 0, 0, 30, 3, 4, 1),
(2, 'Redactar', 1, 1, 0, 0, 0, 2, 0),
(3, 'Compresión lectora', 1, 0, 1, 2, 4, 2, 1),
(4, 'Audio con frases', 0, 0, 0, 5, 5, 1, 0),
(5, 'Audio con fotos', 0, 9, 0, 1, 9, 2, 0),
(6, 'Oral', 1, 1, 0, 0, 0, 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `skills`
--

CREATE TABLE `skills` (
  `id` bigint(20) NOT NULL,
  `name` text NOT NULL,
  `status_id` bigint(20) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `skills`
--

INSERT INTO `skills` (`id`, `name`, `status_id`) VALUES
(349, 'Léxico', 1),
(351, 'Gramática', 1),
(352, 'Compresión lectora', 1),
(353, 'Redacción', 1),
(354, 'Oral', 1),
(355, 'Audio', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `skills_blocks`
--

CREATE TABLE `skills_blocks` (
  `skill_id` bigint(20) NOT NULL,
  `block_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `skills_blocks`
--

INSERT INTO `skills_blocks` (`skill_id`, `block_id`) VALUES
(351, 75),
(351, 78),
(351, 80),
(355, 79),
(351, 81),
(351, 82),
(355, 83),
(351, 84),
(349, 85),
(349, 86),
(349, 88),
(349, 89),
(351, 90),
(351, 91),
(349, 92),
(351, 93),
(351, 87),
(352, 94),
(355, 95),
(354, 96),
(353, 97),
(349, 75),
(351, 98);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `skills_to_unions`
--

CREATE TABLE `skills_to_unions` (
  `skill_id` bigint(20) NOT NULL,
  `union_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `skills_to_unions`
--

INSERT INTO `skills_to_unions` (`skill_id`, `union_id`) VALUES
(351, 4),
(349, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `skills_unions`
--

CREATE TABLE `skills_unions` (
  `id` bigint(20) NOT NULL,
  `name` text NOT NULL,
  `statement` text DEFAULT NULL,
  `status_id` bigint(20) NOT NULL DEFAULT 1,
  `max_score` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `skills_unions`
--

INSERT INTO `skills_unions` (`id`, `name`, `statement`, `status_id`, `max_score`) VALUES
(4, 'Lexico y gramatica', 'Unión de léxico y gramática', 1, 30);

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
  `score` int(3) DEFAULT NULL,
  `level_id` bigint(20) DEFAULT NULL,
  `status_id` bigint(20) DEFAULT 1,
  `photo_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `statements`
--

INSERT INTO `statements` (`id`, `exam_id`, `content`, `skill_id`, `text`, `score`, `level_id`, `status_id`, `photo_id`) VALUES
(79, NULL, 'Un amigo quiere saber cómo es tu vida en Madrid Escríbele un correo breve en el que lo saludes le cuentes sobre tu rutina diaria y actividades de tiempo libre y finalmente te despidas El texto debe tener entre 20 y 30 palabras.', 353, '', 20, 41, 1, NULL),
(80, NULL, 'Tu amigo está interesado en mudarse a tu barrio. Escríbele un correo breve para contarle cómo es. Incluye un saludo, describe las características del barrio y finaliza con una despedida. El texto debe tener entre 20 y 30 palabras.', 353, '', 20, 41, 1, NULL),
(81, NULL, 'Preséntate dando información personal como tu nombre, nacionalidad y edad. Habla también de tu trabajo o estudios y explica por qué estudias español. Elige tres de estas opciones y habla durante 2 o 3 minutos.', 354, '', 25, 41, 1, 292),
(82, NULL, 'Preséntate incluyendo información personal como tu nombre, nacionalidad y edad. Además, puedes hablar sobre tu trabajo o estudios, explicar por qué estás aprendiendo español, o elegir otros temas similares. Selecciona tres de estas opciones y prepárate para hablar durante 2 o 3 minutos.', 354, '', 25, 41, 1, 293),
(83, NULL, 'Lea este mensaje de correo electrónico. A continuación, responda a cinco preguntas sobre el texto. Elija la respuesta correcta (a, b, c, d):', 352, '', 10, 41, 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `status`
--

CREATE TABLE `status` (
  `id` bigint(20) NOT NULL,
  `name` text NOT NULL DEFAULT '\'active\''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `status`
--

INSERT INTO `status` (`id`, `name`) VALUES
(0, 'inactive'),
(1, 'active');

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
  `city_id` bigint(20) DEFAULT NULL,
  `level_id` bigint(20) DEFAULT NULL,
  `status_id` bigint(20) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `students`
--

INSERT INTO `students` (`id`, `name`, `email`, `date_of_birth`, `enrollment_date`, `phone_number`, `address`, `last_name`, `identification_document`, `city_id`, `level_id`, `status_id`) VALUES
(8, 'Manolo', 'pepe@gmail.com', '2024-11-21', '0000-00-00', '7896542123', 'calle barbara de braganza, 155 alcala de hernares, comunidada de madrid', 'Gonzalez Fernandez', '8512136974E', 4, 41, 1),
(9, 'Francisco', 'pepee@gmail.com', '2024-11-07', '0000-00-00', '852146397', 'calle barbara de braganza, 155 alcala de hernares, comunidada de madird', 'Férnandez López', '8612136974E', 3, 41, 1),
(10, 'Pepe', 'paco.jones@gmail.es', '2024-11-20', '0000-00-00', '7896542123', 'calle barbara de braganza, 155 alcala de hernares, comunidada de madrid', 'Jimenez Alvarez', '8712138974E', 1, 41, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `student_classes`
--

CREATE TABLE `student_classes` (
  `student_id` bigint(20) NOT NULL,
  `class_id` bigint(20) NOT NULL,
  `enrollment_date` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `department_id` bigint(20) DEFAULT NULL,
  `last_name` text DEFAULT NULL,
  `status_id` bigint(20) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `teachers`
--

INSERT INTO `teachers` (`id`, `name`, `email`, `hire_date`, `phone_number`, `address`, `department_id`, `last_name`, `status_id`) VALUES
(10, 'María', 'maria@gmail.com', '2024-01-20', '987521364', 'su casa nº3, su ciudad 852641', 1, 'Fernández', 1),
(11, 'Francisco', 'pepe@gmail.com', '2024-11-07', '789654212', 'calle barbara de braganza, 155 alcala de hernares, comunidada de madrid', 1, 'Jiménez Alvarez', 1);

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
  `city_id` bigint(20) DEFAULT NULL,
  `permission_id` bigint(20) DEFAULT NULL,
  `status_id` bigint(20) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `created_at`, `name`, `last_name`, `phone_number`, `city_id`, `permission_id`, `status_id`) VALUES
(1, 'admin_user', 'admin@example.com', '$2b$11$T/Pjr7e5oVv4RsGHi1irtuOhhFTMz7lkh5VfyBUxff96F1fNkoDTO', '2024-08-22 09:44:43', 'Fernando', 'Fernandez Gimenez', '714258369', 1, 1, 1),
(2, 'pepete', 'qwerty@qmail.com', 'undefined', '2024-08-22 09:44:43', 'pepete', 'fernandez', '854631279', 2, 2, 1),
(3, 'viewer_john', 'john.smith@example.com', 'undefined', '2024-08-22 09:44:43', 'john', 'john', '7428536774', 3, 2, 1),
(4, 'editor_mary', 'mary.jones@example.com', 'undefined', '2024-08-22 09:44:43', 'mary', 'mary', '987654321', 4, 3, 1),
(11, 'PEPE', 'pepe@gmail.com', '$2b$11$tMoN8Db8wR7tIhhaAjpujOTZPbJgQwUFselQzcp8x8.XFVfeOpBrG', '2024-10-03 13:57:25', 'Pepito', 'Jimenez Alvarez', '7896542123', 2, 2, 1),
(19, 'qw', 'pepee@gmail.com', '$2b$11$/99cNAaLh5WruxCZFGq/Q.MeWC0ZmvT1s0MXBxSZUgQvh7EoratLy', '2024-10-04 07:22:02', 'qw', 'qw', '7896542123', 3, 2, 1),
(23, 'website', 'website@ailmadrid.com', '$2b$11$eNeb504b1EK4LBUpvVUG4OajNNnsUwpE3Qm2Nlakr5ITBMer9sXh2', '2024-11-20 13:22:19', 'otro', '', '852136479', 1, 1, 1),
(24, 'asdw', 'madkkfweo@sfisaifk.com', '$2b$11$rUGUhdfWUt9cAwdUyxCsr.xp9gL/L0xlMNBh7q9gjLnEA.ZLet8ni', '2024-11-20 13:56:39', 'prueba', 'lopez', '234190657756', 1, 3, 1);

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
  ADD KEY `fk_answers_photos` (`photo_id`),
  ADD KEY `answer_status` (`status_id`);

--
-- Indices de la tabla `blocks`
--
ALTER TABLE `blocks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_type_id` (`question_type_id`),
  ADD KEY `block_status` (`status_id`);

--
-- Indices de la tabla `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `city_status` (`status_id`);

--
-- Indices de la tabla `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `level_id` (`level_id`),
  ADD KEY `claases_status` (`status_id`);

--
-- Indices de la tabla `class_teachers`
--
ALTER TABLE `class_teachers`
  ADD PRIMARY KEY (`class_id`,`teacher_id`),
  ADD KEY `teacher_id` (`teacher_id`);

--
-- Indices de la tabla `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

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
  ADD KEY `level_status` (`status_id`);

--
-- Indices de la tabla `levels_blocks`
--
ALTER TABLE `levels_blocks`
  ADD KEY `level_blocks` (`level_id`),
  ADD KEY `block_levels` (`block_id`);

--
-- Indices de la tabla `levels_skills`
--
ALTER TABLE `levels_skills`
  ADD KEY `level_skills` (`level_id`),
  ADD KEY `skill_levels` (`skill_id`);

--
-- Indices de la tabla `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `permission_status` (`status_id`);

--
-- Indices de la tabla `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `photo_status` (`status_id`);

--
-- Indices de la tabla `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `block_id` (`block_id`),
  ADD KEY `skill_id` (`skill_id`),
  ADD KEY `level_id` (`level_id`),
  ADD KEY `fk_questions_photos` (`photo_id`),
  ADD KEY `statements_ibfk4` (`statement_id`),
  ADD KEY `question_status` (`status_id`);

--
-- Indices de la tabla `question_types`
--
ALTER TABLE `question_types`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`id`),
  ADD KEY `skill_status` (`status_id`);

--
-- Indices de la tabla `skills_blocks`
--
ALTER TABLE `skills_blocks`
  ADD KEY `skill_blocks` (`skill_id`),
  ADD KEY `block_skills` (`block_id`);

--
-- Indices de la tabla `skills_unions`
--
ALTER TABLE `skills_unions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `union_status` (`status_id`);

--
-- Indices de la tabla `statements`
--
ALTER TABLE `statements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `skill_id` (`skill_id`),
  ADD KEY `level_id` (`level_id`),
  ADD KEY `fk_statements_photos` (`photo_id`),
  ADD KEY `statements_ibfk_1` (`exam_id`),
  ADD KEY `statement_status` (`status_id`);

--
-- Indices de la tabla `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`) USING HASH,
  ADD UNIQUE KEY `identification_document` (`identification_document`) USING HASH,
  ADD KEY `level_id` (`level_id`),
  ADD KEY `student_status` (`status_id`),
  ADD KEY `student_city` (`city_id`);

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
  ADD UNIQUE KEY `email` (`email`) USING HASH,
  ADD KEY `teacher_status` (`status_id`),
  ADD KEY `teacher_department` (`department_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`) USING HASH,
  ADD UNIQUE KEY `email` (`email`) USING HASH,
  ADD KEY `user_status` (`status_id`),
  ADD KEY `user_permission` (`permission_id`),
  ADD KEY `user_city` (`city_id`);

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=562;

--
-- AUTO_INCREMENT de la tabla `blocks`
--
ALTER TABLE `blocks`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT de la tabla `cities`
--
ALTER TABLE `cities`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `classes`
--
ALTER TABLE `classes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `departments`
--
ALTER TABLE `departments`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT de la tabla `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `photos`
--
ALTER TABLE `photos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=294;

--
-- AUTO_INCREMENT de la tabla `questions`
--
ALTER TABLE `questions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=185;

--
-- AUTO_INCREMENT de la tabla `question_types`
--
ALTER TABLE `question_types`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `skills`
--
ALTER TABLE `skills`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=356;

--
-- AUTO_INCREMENT de la tabla `skills_unions`
--
ALTER TABLE `skills_unions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `statements`
--
ALTER TABLE `statements`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT de la tabla `status`
--
ALTER TABLE `status`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `students`
--
ALTER TABLE `students`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

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
  ADD CONSTRAINT `answer_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`),
  ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`),
  ADD CONSTRAINT `answers_ibfk_2` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`);

--
-- Filtros para la tabla `blocks`
--
ALTER TABLE `blocks`
  ADD CONSTRAINT `block_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`),
  ADD CONSTRAINT `blocks_ibfk_3` FOREIGN KEY (`question_type_id`) REFERENCES `question_types` (`id`);

--
-- Filtros para la tabla `cities`
--
ALTER TABLE `cities`
  ADD CONSTRAINT `city_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`);

--
-- Filtros para la tabla `classes`
--
ALTER TABLE `classes`
  ADD CONSTRAINT `claases_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`),
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
  ADD CONSTRAINT `exam_questions_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`);

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
-- Filtros para la tabla `levels`
--
ALTER TABLE `levels`
  ADD CONSTRAINT `level_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`);

--
-- Filtros para la tabla `levels_blocks`
--
ALTER TABLE `levels_blocks`
  ADD CONSTRAINT `block_levels` FOREIGN KEY (`block_id`) REFERENCES `blocks` (`id`),
  ADD CONSTRAINT `level_blocks` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`);

--
-- Filtros para la tabla `levels_skills`
--
ALTER TABLE `levels_skills`
  ADD CONSTRAINT `level_skills` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`),
  ADD CONSTRAINT `skill_levels` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`);

--
-- Filtros para la tabla `permissions`
--
ALTER TABLE `permissions`
  ADD CONSTRAINT `permission_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`);

--
-- Filtros para la tabla `photos`
--
ALTER TABLE `photos`
  ADD CONSTRAINT `photo_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`);

--
-- Filtros para la tabla `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `question_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`),
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`block_id`) REFERENCES `blocks` (`id`),
  ADD CONSTRAINT `questions_ibfk_2` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`),
  ADD CONSTRAINT `questions_ibfk_3` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`),
  ADD CONSTRAINT `questions_ibfk_4` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`),
  ADD CONSTRAINT `questions_ibfk_5` FOREIGN KEY (`statement_id`) REFERENCES `statements` (`id`);

--
-- Filtros para la tabla `skills`
--
ALTER TABLE `skills`
  ADD CONSTRAINT `skill_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`);

--
-- Filtros para la tabla `skills_blocks`
--
ALTER TABLE `skills_blocks`
  ADD CONSTRAINT `block_skills` FOREIGN KEY (`block_id`) REFERENCES `blocks` (`id`),
  ADD CONSTRAINT `skill_blocks` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`);

--
-- Filtros para la tabla `skills_unions`
--
ALTER TABLE `skills_unions`
  ADD CONSTRAINT `union_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`);

--
-- Filtros para la tabla `statements`
--
ALTER TABLE `statements`
  ADD CONSTRAINT `statement_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`),
  ADD CONSTRAINT `statements_ibfk_1` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`),
  ADD CONSTRAINT `statements_ibfk_2` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`),
  ADD CONSTRAINT `statements_ibfk_3` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`),
  ADD CONSTRAINT `statements_ibfk_4` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`);

--
-- Filtros para la tabla `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `student_city` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`),
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`),
  ADD CONSTRAINT `student_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`);

--
-- Filtros para la tabla `student_classes`
--
ALTER TABLE `student_classes`
  ADD CONSTRAINT `student_classes_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`),
  ADD CONSTRAINT `student_classes_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`);

--
-- Filtros para la tabla `teachers`
--
ALTER TABLE `teachers`
  ADD CONSTRAINT `teacher_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`),
  ADD CONSTRAINT `teacher_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `user_city` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`),
  ADD CONSTRAINT `user_permission` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`),
  ADD CONSTRAINT `user_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
