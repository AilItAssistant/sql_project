-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-09-2024 a las 12:56:08
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
  `content` text NOT NULL,
  `is_correct` tinyint(1) NOT NULL,
  `explanation` text DEFAULT NULL,
  `status` varchar(255) DEFAULT 'active',
  `letter` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `answers`
--

INSERT INTO `answers` (`id`, `question_id`, `content`, `is_correct`, `explanation`, `status`, `letter`) VALUES
(1, 1, 'Veloz', 0, NULL, 'active', 'A'),
(2, 1, 'Lento', 0, NULL, 'active', 'B'),
(3, 2, 'Fui', 0, NULL, 'active', 'A'),
(4, 2, 'Voy', 0, NULL, 'active', 'B'),
(5, 3, '4', 1, NULL, 'active', 'A'),
(6, 3, '5', 0, NULL, 'active', 'B'),
(7, 1, 'Rápido', 0, 'Rápido es un sinónimo, no un antónimo.', 'active', 'C'),
(8, 1, 'Lento', 1, 'Lento es el antónimo de rápido.', 'active', 'D'),
(9, 2, 'Temporal', 1, 'Efímero significa que dura poco tiempo.', 'active', 'C'),
(10, 2, 'Permanente', 0, 'Permanente es lo opuesto a efímero.', 'active', 'D'),
(11, 4, 'París', 1, NULL, 'active', 'A'),
(12, 4, 'Londres', 0, NULL, 'active', 'B'),
(13, 4, 'Berlín', 0, NULL, 'active', 'C'),
(14, 4, 'Madrid', 0, NULL, 'active', 'D'),
(15, 5, 'qwewqeewq', 0, NULL, 'active', NULL),
(16, 5, 'wqeqwee', 0, NULL, 'active', NULL),
(17, 5, 'wqeqew', 1, NULL, 'active', NULL),
(18, 6, 'ewqeq', 0, NULL, 'active', NULL),
(19, 6, 'qweqwe', 0, NULL, 'active', NULL),
(20, 6, 'qwewqe', 0, NULL, 'active', NULL),
(21, 7, 'qwe', 1, NULL, 'active', NULL),
(22, 7, 'ert', 0, NULL, 'active', NULL),
(23, 7, 'yui', 0, NULL, 'active', NULL);

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
(1, 'Vocabulario Básico', 1, 'Bloque de vocabulario básico', 'active'),
(2, 'Gramática Avanzada', 2, 'Bloque de gramática avanzada', 'active'),
(3, 'Matemáticas Intermedias', 3, 'Bloque de matemáticas intermedias', 'active');

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
(1, 'Clase de Vocabulario', 'Lunes y Miércoles 10:00-12:00', '103', 1, 'active'),
(2, 'Clase de Gramática', 'Lunes y Miércoles 10:00-12:00', '106', 2, 'active'),
(3, 'Clase de Matemáticas', 'Lunes y Miércoles 10:00-12:00', '104', 3, 'active'),
(4, 'Matemáticas Avanzadas', 'Lunes y Miércoles 10:00-12:00', 'Aula 101', 13, 'active'),
(5, 'Matemáticas Avanzadas', 'Lunes y Miércoles 10:00-12:00', 'Aula 101', 16, 'active'),
(6, 'Matemáticas Avanzadas', 'Lunes y Miércoles 10:00-12:00', 'Aula 105', 17, 'active');

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
(1, 1);

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
(1, 1, 1, 1, '2024-08-22 07:18:47', 0, NULL, NULL, 1, 'active'),
(2, 2, 2, 2, '2024-08-22 07:18:47', 0, NULL, NULL, 2, 'active'),
(3, 3, 3, 3, '2024-08-22 07:18:47', 0, NULL, NULL, 3, 'active');

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
(3, 3, 3, '2024-08-22 07:19:03', 'Reprobado', 'activo');

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
(1, 'Principiante', 'active'),
(2, 'Intermedio', 'active'),
(3, 'Avanzado', 'active'),
(13, 'B1', 'active'),
(16, 'B2', 'active'),
(17, 'C1', 'active'),
(20, 'C2', 'active');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `photos`
--

CREATE TABLE `photos` (
  `id` bigint(20) NOT NULL,
  `base64_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `questions`
--

CREATE TABLE `questions` (
  `id` bigint(20) NOT NULL,
  `content` text NOT NULL,
  `block_id` bigint(20) DEFAULT NULL,
  `skill_id` bigint(20) DEFAULT NULL,
  `level_id` bigint(20) DEFAULT NULL,
  `statement_id` bigint(20) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'active',
  `photo_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `questions`
--

INSERT INTO `questions` (`id`, `content`, `block_id`, `skill_id`, `level_id`, `statement_id`, `status`, `photo_id`) VALUES
(1, '¿Cuál es el sinónimo de \'rápido\'?', 1, 1, 1, 1, 'active', NULL),
(2, '¿Cómo se conjuga el verbo \'ir\' en pasado?', 2, 2, 2, 2, 'active', NULL),
(3, '¿Cuánto es 2 + 2?', 3, 3, 3, 3, 'active', NULL),
(4, '¿Cuál es la capital de Francia?', NULL, NULL, NULL, 1, 'active', NULL),
(5, 'qwewqeq', NULL, 1, 1, 1, 'active', NULL),
(6, 'qwewe', NULL, 1, 1, 1, 'active', NULL),
(7, 'qwerty', NULL, 1, 1, 1, 'active', NULL);

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
(1, 'Vocabulario', 'Habilidad de vocabulario', 1, 'active'),
(2, 'Gramática', 'Habilidad de gramática', 2, 'active'),
(3, 'Matemáticas', 'Habilidad de matemáticas', 3, 'active');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `statements`
--

CREATE TABLE `statements` (
  `id` bigint(20) NOT NULL,
  `exam_id` bigint(20) DEFAULT NULL,
  `content` text NOT NULL,
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
(1, NULL, 'Este examen evalúa el vocabulario básico.', 1, 'text1', 10, 1, 'active', NULL),
(2, NULL, 'Este examen evalúa la gramática avanzada.', 2, 'text2', 20, 2, 'active', NULL),
(3, NULL, 'Este examen evalúa las matemáticas intermedias.', 3, 'text3', 30, 3, 'active', NULL),
(4, NULL, 'texto prueba ', 1, 'texto prueba  2', 10, 1, 'active', NULL),
(5, NULL, 'qwerty', 2, 'tyutuytutuytuytuyuuytuyutyuyuuuuuytutyuututyutyutyutytyu', 20, 1, 'active', NULL);

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
(1, 'Juán Manuel', 'juan.perez@example.com', '2024-09-04', '2024-08-22', '963852741123', 'Juan de esplandiú', 'Pérez Rodriguez', '96332154K', 'Madrid', 1, 'active'),
(2, 'María', 'maria.lopez@exple.com', '2024-09-06', '2024-08-22', '96321458741', 'odonell', 'Giménez Álvarez', '85463129P', 'Barcelona', 2, 'active'),
(3, 'Carlos', 'carlos.garcia@example.com', '2024-09-03', '2024-08-22', '213654789512', 'Barbara de braganza', 'Fernandez Alonso', '74569832N', 'Málaga', 3, 'active');

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
(1, 1, '2024-09-11', 'active'),
(1, 2, '2024-09-16', 'active'),
(1, 3, '2024-09-16', 'active'),
(1, 6, '2024-08-28', 'active'),
(2, 1, '2024-09-11', 'active'),
(2, 2, '2024-08-22', 'active'),
(3, 1, '2024-09-11', 'active'),
(3, 3, '2024-08-22', 'active');

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
(3, 'juan', 'qwerty@qwwrty.com', '2024-09-26', '987456321', 'juan de esplandiu', '6546554789321', 'gonzalez', 'active');

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
  `role` enum('admin','editor','viewer') NOT NULL,
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

INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `role`, `created_at`, `name`, `last_name`, `phone_number`, `city`, `permissions`, `status`) VALUES
(1, 'admin_user', 'admin@example.com', 'hashed_password_1', 'admin', '2024-08-22 09:44:43', NULL, NULL, NULL, NULL, NULL, 'active'),
(2, 'editor_jane', 'jane.doe@example.com', 'hashed_password_2', 'editor', '2024-08-22 09:44:43', NULL, NULL, NULL, NULL, NULL, 'active'),
(3, 'viewer_john', 'john.smith@example.com', 'hashed_password_3', 'viewer', '2024-08-22 09:44:43', NULL, NULL, NULL, NULL, NULL, 'active'),
(4, 'editor_mary', 'mary.jones@example.com', 'hashed_password_4', 'editor', '2024-08-22 09:44:43', NULL, NULL, NULL, NULL, NULL, 'active'),
(5, 'viewer_anna', 'anna.brown@example.com', 'hashed_password_5', 'viewer', '2024-08-22 09:44:43', NULL, NULL, NULL, NULL, NULL, 'active');

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
  ADD KEY `question_id` (`question_id`);

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
  ADD KEY `fk_questions_photos` (`photo_id`);

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
  ADD KEY `exam_id` (`exam_id`),
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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `blocks`
--
ALTER TABLE `blocks`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `classes`
--
ALTER TABLE `classes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `photos`
--
ALTER TABLE `photos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `questions`
--
ALTER TABLE `questions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `skills`
--
ALTER TABLE `skills`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `statements`
--
ALTER TABLE `statements`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `students`
--
ALTER TABLE `students`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `triggers`
--
ALTER TABLE `triggers`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  ADD CONSTRAINT `questions_ibfk_3` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`);

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
  ADD CONSTRAINT `statements_ibfk_1` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`),
  ADD CONSTRAINT `statements_ibfk_2` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`),
  ADD CONSTRAINT `statements_ibfk_3` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`);

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