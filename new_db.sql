-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-11-2024 a las 11:38:58
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
(75, 'Estar o hay', 1, 1, 2, 7, 1),
(78, 'Gustar y similares', 1, 1, 2, 7, 1),
(79, 'Preguntas con frases', 1, 1, 2, 7, 1),
(80, 'Presente irregular', 1, 1, 2, 7, 1),
(81, 'Pronombres OD y OI gustar', 1, 1, 2, 7, 1);

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
(41, 75);

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
(42, 349),
(41, 351),
(42, 351);

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
(41, 4);

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
  `photo_status` bigint(20) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `photo_id` bigint(20) DEFAULT NULL,
  `score` int(3) DEFAULT NULL,
  `status_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(6, 'Oral', 1, 1, 0, 0, 0, 1, 0),
(7, 'Granel', 1, 0, 0, 30, 3, 4, 1);

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
(351, 'Gramática', 1);

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
(349, 75),
(349, 78),
(351, 75),
(351, 78),
(349, 79),
(351, 79),
(349, 80),
(351, 80);

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
(4, 'Lexico y gramatica', 'union de lexico y gramatica', 1, 30);

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
  ADD KEY `photo_status` (`photo_status`);

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=542;

--
-- AUTO_INCREMENT de la tabla `blocks`
--
ALTER TABLE `blocks`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=292;

--
-- AUTO_INCREMENT de la tabla `questions`
--
ALTER TABLE `questions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=179;

--
-- AUTO_INCREMENT de la tabla `question_types`
--
ALTER TABLE `question_types`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `skills`
--
ALTER TABLE `skills`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=352;

--
-- AUTO_INCREMENT de la tabla `skills_unions`
--
ALTER TABLE `skills_unions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `statements`
--
ALTER TABLE `statements`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

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
  ADD CONSTRAINT `photo_status` FOREIGN KEY (`photo_status`) REFERENCES `status` (`id`);

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
