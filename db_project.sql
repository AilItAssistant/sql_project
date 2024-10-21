-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-10-2024 a las 10:23:34
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
-- Base de datos: `db_project`
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

--
-- Volcado de datos para la tabla `answers`
--

INSERT INTO `answers` (`id`, `question_id`, `content`, `is_correct`, `status`, `letter`, `photo_id`) VALUES
(195, 68, 'undefined', 0, 'active', 'A', 133),
(196, 68, 'undefined', 0, 'active', 'B', 134),
(197, 68, 'undefined', 1, 'active', 'C', 135),
(198, 69, 'undefined', 0, 'active', 'A', 137),
(199, 69, 'undefined', 1, 'active', 'B', 138),
(200, 69, 'undefined', 0, 'active', 'C', 139),
(201, 69, 'undefined', 0, 'active', 'D', 140),
(202, 70, 'Prueba imagen enunciado Prueba imagen enunciadoPrueba imagen enunciado Prueba imagen enunciado', 0, 'active', 'A', NULL),
(203, 70, 'Prueba imagen enunciado Prueba imagen enunciadoPrueba imagen enunciado Prueba imagen enunciado', 1, 'active', 'B', NULL),
(204, 70, 'Prueba imagen enunciado Prueba imagen enunciadoPrueba imagen enunciado Prueba imagen enunciado', 0, 'active', 'C', NULL);

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
  `base64_data` text NOT NULL,
  `status` text NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `photos`
--

INSERT INTO `photos` (`id`, `base64_data`, `status`) VALUES
(131, 'data:image/png;base64,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', 'active'),
(132, 'data:image/png;base64,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', 'active'),
(133, 'data:image/png;base64,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', 'active'),
(134, 'data:image/png;base64,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', 'active');
INSERT INTO `photos` (`id`, `base64_data`, `status`) VALUES
(135, 'data:image/png;base64,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', 'active'),
(136, 'data:image/png;base64,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', 'active'),
(137, 'data:image/png;base64,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', 'active'),
(138, 'data:image/png;base64,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', 'active'),
(139, 'data:image/png;base64,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', 'active'),
(140, 'data:image/png;base64,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', 'active');

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
(16, 'Francisco escribe una carta sobre:', NULL, NULL, 27, 17, 'active', NULL, '2'),
(17, 'Va a empezar a trabajar:', NULL, NULL, 27, 17, 'active', NULL, '2'),
(18, 'Va a trabajar en:', NULL, NULL, 27, 17, 'active', NULL, '2'),
(19, 'En su trabajo, Francisco tiene que:', NULL, NULL, 27, 17, 'active', NULL, '2'),
(20, 'Cuándo tiene Francisco prácticas de laboratorio:', NULL, NULL, 27, 17, 'active', NULL, '2'),
(68, 'Prueba imagen enunciado ', 65, 345, 34, 49, 'active', 132, '5'),
(69, 'Prueba imagen enunciado Prueba imagen enunciadoPrueba imagen enunciado Prueba imagen enunciado', 65, 345, 34, 49, 'active', 136, '2'),
(70, 'Prueba imagen enunciado Prueba imagen enunciadoPrueba imagen enunciado Prueba imagen enunciado', 65, 345, 34, 49, 'active', NULL, '2');

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
(49, NULL, 'Prueba imagen enunciado Prueba imagen enunciado Prueba imagen enunciado Prueba imagen enunciado Prueba imagen enunciado Prueba imagen enunciado Prueba imagen enunciado ', 345, '', 20, 34, 'active', 131);

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
  ADD KEY `fk_statements_photos` (`photo_id`),
  ADD KEY `statements_ibfk_1` (`exam_id`);

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=205;

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=141;

--
-- AUTO_INCREMENT de la tabla `questions`
--
ALTER TABLE `questions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT de la tabla `skills`
--
ALTER TABLE `skills`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=346;

--
-- AUTO_INCREMENT de la tabla `statements`
--
ALTER TABLE `statements`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

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
  ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`),
  ADD CONSTRAINT `answers_ibfk_2` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`);

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
-- Filtros para la tabla `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`block_id`) REFERENCES `blocks` (`id`),
  ADD CONSTRAINT `questions_ibfk_2` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`),
  ADD CONSTRAINT `questions_ibfk_3` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`),
  ADD CONSTRAINT `questions_ibfk_4` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`),
  ADD CONSTRAINT `questions_ibfk_5` FOREIGN KEY (`statement_id`) REFERENCES `statements` (`id`);

--
-- Filtros para la tabla `skills`
--
ALTER TABLE `skills`
  ADD CONSTRAINT `levels_ibfk_1` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`);

--
-- Filtros para la tabla `statements`
--
ALTER TABLE `statements`
  ADD CONSTRAINT `statements_ibfk_1` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`),
  ADD CONSTRAINT `statements_ibfk_2` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`),
  ADD CONSTRAINT `statements_ibfk_3` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`),
  ADD CONSTRAINT `statements_ibfk_4` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`);

--
-- Filtros para la tabla `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`);

--
-- Filtros para la tabla `student_classes`
--
ALTER TABLE `student_classes`
  ADD CONSTRAINT `student_classes_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`),
  ADD CONSTRAINT `student_classes_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;