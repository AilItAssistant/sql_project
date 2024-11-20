SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
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
CREATE TABLE `blocks` (
  `id` bigint(20) NOT NULL,
  `name` text NOT NULL,
  `status_id` bigint(20) NOT NULL DEFAULT 1,
  `is_selected` tinyint(4) DEFAULT 0,
  `max_score` int(3) DEFAULT NULL,
  `question_type_id` bigint(20) DEFAULT NULL,
  `individual_score` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE `cities` (
  `id` bigint(20) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE `classes` (
  `id` bigint(20) NOT NULL,
  `name` text NOT NULL,
  `schedule` text DEFAULT NULL,
  `room_number` text DEFAULT NULL,
  `level_id` bigint(20) DEFAULT NULL,
  `status_id` bigint(20) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE `class_teachers` (
  `class_id` bigint(20) NOT NULL,
  `teacher_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE `departments` (
  `id` bigint(20) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
CREATE TABLE `exam_questions` (
  `exam_id` bigint(20) DEFAULT NULL,
  `question_id` bigint(20) DEFAULT NULL,
  `chosen_answer_id` bigint(20) DEFAULT NULL,
  `is_correct` tinyint(1) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE `exam_requests` (
  `id` bigint(20) NOT NULL,
  `teacher_id` bigint(20) DEFAULT NULL,
  `skill_id` bigint(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `resultado` text DEFAULT NULL,
  `status` varchar(255) DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE `exam_statements` (
  `exam_id` bigint(20) NOT NULL,
  `statement_id` bigint(20) NOT NULL,
  `status` varchar(255) DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE `levels` (
  `id` bigint(20) NOT NULL,
  `name` text NOT NULL,
  `level_status` bigint(20) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE `levels_blocks` (
  `level_id` bigint(20) NOT NULL,
  `block_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE `levels_skils` (
  `level_id` bigint(20) NOT NULL,
  `skill_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE `levels_unions` (
  `level_id` bigint(20) NOT NULL,
  `union_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE `permissions` (
  `id` bigint(20) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
INSERT INTO `permissions` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'employee'),
(3, 'student');
CREATE TABLE `photos` (
  `id` bigint(20) NOT NULL,
  `base64_data` longtext NOT NULL,
  `photo_status` bigint(20) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
CREATE TABLE `skills` (
  `id` bigint(20) NOT NULL,
  `name` text NOT NULL,
  `description` text DEFAULT NULL,
  `status_id` bigint(20) NOT NULL DEFAULT 1,
  `statement` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE `skills_blocks` (
  `skill_id` bigint(20) NOT NULL,
  `block_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE `skills_unions` (
  `id` bigint(20) NOT NULL,
  `name` text NOT NULL,
  `statement` text DEFAULT NULL,
  `skill_id_1` bigint(20) NOT NULL,
  `skill_id_2` bigint(20) NOT NULL,
  `status_id` bigint(20) NOT NULL DEFAULT 1,
  `max_score` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
CREATE TABLE `status` (
  `id` bigint(20) NOT NULL,
  `status` text NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
INSERT INTO `status` (`id`, `status`) VALUES
(0, 'inactive'),
(1, 'active');
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
CREATE TABLE `student_classes` (
  `student_id` bigint(20) NOT NULL,
  `class_id` bigint(20) NOT NULL,
  `enrollment_date` date DEFAULT curdate(),
  `status_id` bigint(20) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
CREATE TABLE `triggers` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `event` enum('INSERT','UPDATE','DELETE') NOT NULL,
  `table_name` varchar(255) NOT NULL,
  `action` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `created_at`, `name`, `last_name`, `phone_number`, `city_id`, `permission_id`, `status_id`) VALUES
(1, 'admin_user', 'admin@example.com', '$2b$11$T/Pjr7e5oVv4RsGHi1irtuOhhFTMz7lkh5VfyBUxff96F1fNkoDTO', '2024-08-22 09:44:43', 'Fernando', 'Fernandez Gimenez', '714258369', NULL, 1, 1),
(2, 'pepete', 'qwerty@qmail.com', 'undefined', '2024-08-22 09:44:43', 'pepete', 'fernandez', '854631279', NULL, 2, 1),
(3, 'viewer_john', 'john.smith@example.com', 'undefined', '2024-08-22 09:44:43', 'john', 'john', '7428536774', NULL, 2, 1),
(4, 'editor_mary', 'mary.jones@example.com', 'undefined', '2024-08-22 09:44:43', 'mary', 'mary', '987654321', NULL, 3, 1),
(11, 'PEPE', 'pepe@gmail.com', '$2b$11$tMoN8Db8wR7tIhhaAjpujOTZPbJgQwUFselQzcp8x8.XFVfeOpBrG', '2024-10-03 13:57:25', 'Pepito', 'Jimenez Alvarez', '7896542123', NULL, 3, 1),
(19, 'qw', 'pepee@gmail.com', '$2b$11$/99cNAaLh5WruxCZFGq/Q.MeWC0ZmvT1s0MXBxSZUgQvh7EoratLy', '2024-10-04 07:22:02', 'qw', 'qw', '7896542123', NULL, 1, 1);
CREATE TABLE `user_actions` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `action_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `action_type` text NOT NULL,
  `data_before` text DEFAULT NULL,
  `data_after` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_id` (`question_id`),
  ADD KEY `fk_answers_photos` (`photo_id`),
  ADD KEY `answer_status` (`status_id`);
ALTER TABLE `blocks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_type_id` (`question_type_id`),
  ADD KEY `block_status` (`status_id`);
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `level_id` (`level_id`),
  ADD KEY `claases_status` (`status_id`);
ALTER TABLE `class_teachers`
  ADD PRIMARY KEY (`class_id`,`teacher_id`),
  ADD KEY `teacher_id` (`teacher_id`);
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `exams`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `skill_id` (`skill_id`),
  ADD KEY `level_id` (`level_id`);
ALTER TABLE `exam_questions`
  ADD KEY `exam_id` (`exam_id`),
  ADD KEY `question_id` (`question_id`),
  ADD KEY `chosen_answer_id` (`chosen_answer_id`);
ALTER TABLE `exam_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `skill_id` (`skill_id`);
ALTER TABLE `exam_statements`
  ADD PRIMARY KEY (`exam_id`,`statement_id`),
  ADD KEY `statement_id` (`statement_id`);
ALTER TABLE `levels`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`) USING HASH,
  ADD KEY `level_status` (`level_status`);
ALTER TABLE `levels_blocks`
  ADD KEY `level_blocks` (`level_id`),
  ADD KEY `block_levels` (`block_id`);
ALTER TABLE `levels_skils`
  ADD KEY `level_skills` (`level_id`),
  ADD KEY `skill_levels` (`skill_id`);
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `photo_status` (`photo_status`);
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `block_id` (`block_id`),
  ADD KEY `skill_id` (`skill_id`),
  ADD KEY `level_id` (`level_id`),
  ADD KEY `fk_questions_photos` (`photo_id`),
  ADD KEY `statements_ibfk4` (`statement_id`),
  ADD KEY `question_status` (`status_id`);
ALTER TABLE `question_types`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `skills`
  ADD PRIMARY KEY (`id`),
  ADD KEY `skill_status` (`status_id`);
ALTER TABLE `skills_blocks`
  ADD KEY `skill_blocks` (`skill_id`),
  ADD KEY `block_skills` (`block_id`);
ALTER TABLE `skills_unions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `skill_id_1` (`skill_id_1`),
  ADD KEY `skill_id_2` (`skill_id_2`),
  ADD KEY `union_status` (`status_id`);
ALTER TABLE `statements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `skill_id` (`skill_id`),
  ADD KEY `level_id` (`level_id`),
  ADD KEY `fk_statements_photos` (`photo_id`),
  ADD KEY `statements_ibfk_1` (`exam_id`),
  ADD KEY `statement_status` (`status_id`);
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`) USING HASH,
  ADD UNIQUE KEY `identification_document` (`identification_document`) USING HASH,
  ADD KEY `level_id` (`level_id`),
  ADD KEY `student_status` (`status_id`),
  ADD KEY `student_city` (`city_id`);
ALTER TABLE `student_classes`
  ADD PRIMARY KEY (`student_id`,`class_id`),
  ADD KEY `class_id` (`class_id`),
  ADD KEY `student_class_status` (`status_id`);
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`) USING HASH,
  ADD KEY `teacher_status` (`status_id`),
  ADD KEY `teacher_department` (`department_id`);
ALTER TABLE `triggers`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`) USING HASH,
  ADD UNIQUE KEY `email` (`email`) USING HASH,
  ADD KEY `user_status` (`status_id`),
  ADD KEY `user_permission` (`permission_id`),
  ADD KEY `user_city` (`city_id`);
ALTER TABLE `user_actions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);
ALTER TABLE `answers`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=542;
ALTER TABLE `blocks`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;
ALTER TABLE `cities`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;
ALTER TABLE `classes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
ALTER TABLE `departments`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;
ALTER TABLE `exams`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
ALTER TABLE `exam_requests`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
ALTER TABLE `levels`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
ALTER TABLE `photos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=292;
ALTER TABLE `questions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=179;
ALTER TABLE `question_types`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
ALTER TABLE `skills`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=349;
ALTER TABLE `skills_unions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
ALTER TABLE `statements`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;
ALTER TABLE `status`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
ALTER TABLE `students`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
ALTER TABLE `teachers`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
ALTER TABLE `triggers`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
ALTER TABLE `user_actions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;
ALTER TABLE `answers`
  ADD CONSTRAINT `answer_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`),
  ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`),
  ADD CONSTRAINT `answers_ibfk_2` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`);
ALTER TABLE `blocks`
  ADD CONSTRAINT `block_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`),
  ADD CONSTRAINT `blocks_ibfk_3` FOREIGN KEY (`question_type_id`) REFERENCES `question_types` (`id`);
ALTER TABLE `classes`
  ADD CONSTRAINT `claases_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`),
  ADD CONSTRAINT `classes_ibfk_2` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`);
ALTER TABLE `class_teachers`
  ADD CONSTRAINT `class_teachers_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `class_teachers_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE;
ALTER TABLE `exams`
  ADD CONSTRAINT `exams_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`),
  ADD CONSTRAINT `exams_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`),
  ADD CONSTRAINT `exams_ibfk_3` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`),
  ADD CONSTRAINT `exams_ibfk_4` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`);
ALTER TABLE `exam_questions`
  ADD CONSTRAINT `exam_questions_ibfk_1` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`),
  ADD CONSTRAINT `exam_questions_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`);
ALTER TABLE `exam_requests`
  ADD CONSTRAINT `exam_requests_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`),
  ADD CONSTRAINT `exam_requests_ibfk_2` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`);
ALTER TABLE `exam_statements`
  ADD CONSTRAINT `exam_statements_ibfk_1` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`),
  ADD CONSTRAINT `exam_statements_ibfk_2` FOREIGN KEY (`statement_id`) REFERENCES `statements` (`id`);
ALTER TABLE `levels`
  ADD CONSTRAINT `level_status` FOREIGN KEY (`level_status`) REFERENCES `status` (`id`);
ALTER TABLE `levels_blocks`
  ADD CONSTRAINT `block_levels` FOREIGN KEY (`block_id`) REFERENCES `blocks` (`id`),
  ADD CONSTRAINT `level_blocks` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`);
ALTER TABLE `levels_skils`
  ADD CONSTRAINT `level_skills` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`),
  ADD CONSTRAINT `skill_levels` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`);
ALTER TABLE `photos`
  ADD CONSTRAINT `photo_status` FOREIGN KEY (`photo_status`) REFERENCES `status` (`id`);
ALTER TABLE `questions`
  ADD CONSTRAINT `question_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`),
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`block_id`) REFERENCES `blocks` (`id`),
  ADD CONSTRAINT `questions_ibfk_2` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`),
  ADD CONSTRAINT `questions_ibfk_3` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`),
  ADD CONSTRAINT `questions_ibfk_4` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`),
  ADD CONSTRAINT `questions_ibfk_5` FOREIGN KEY (`statement_id`) REFERENCES `statements` (`id`);
ALTER TABLE `skills`
  ADD CONSTRAINT `skill_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`);
ALTER TABLE `skills_blocks`
  ADD CONSTRAINT `block_skills` FOREIGN KEY (`block_id`) REFERENCES `blocks` (`id`),
  ADD CONSTRAINT `skill_blocks` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`);
ALTER TABLE `skills_unions`
  ADD CONSTRAINT `skills_unions_ibfk_1` FOREIGN KEY (`skill_id_1`) REFERENCES `skills` (`id`),
  ADD CONSTRAINT `skills_unions_ibfk_2` FOREIGN KEY (`skill_id_2`) REFERENCES `skills` (`id`),
  ADD CONSTRAINT `union_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`);
ALTER TABLE `statements`
  ADD CONSTRAINT `statement_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`),
  ADD CONSTRAINT `statements_ibfk_1` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`),
  ADD CONSTRAINT `statements_ibfk_2` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`),
  ADD CONSTRAINT `statements_ibfk_3` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`),
  ADD CONSTRAINT `statements_ibfk_4` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`);
ALTER TABLE `students`
  ADD CONSTRAINT `student_city` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`),
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`),
  ADD CONSTRAINT `student_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`);
ALTER TABLE `student_classes`
  ADD CONSTRAINT `student_class_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`),
  ADD CONSTRAINT `student_classes_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`),
  ADD CONSTRAINT `student_classes_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`);
ALTER TABLE `teachers`
  ADD CONSTRAINT `teacher_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`),
  ADD CONSTRAINT `teacher_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`);
ALTER TABLE `users`
  ADD CONSTRAINT `user_city` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`),
  ADD CONSTRAINT `user_permission` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`),
  ADD CONSTRAINT `user_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`);
COMMIT;