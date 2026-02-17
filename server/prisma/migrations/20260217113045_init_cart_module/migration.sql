-- CreateTable
CREATE TABLE `auth_tokens` (
    `token_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `token` VARCHAR(512) NOT NULL,
    `token_type` ENUM('ACCESS', 'REFRESH', 'API_KEY') NOT NULL,
    `expires_at` DATETIME(0) NOT NULL,
    `is_revoked` BOOLEAN NULL DEFAULT false,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` INTEGER NULL,

    INDEX `fk_auth_created_by`(`created_by`),
    INDEX `fk_auth_updated_by`(`updated_by`),
    INDEX `idx_auth_token`(`token`),
    INDEX `idx_auth_user`(`user_id`),
    PRIMARY KEY (`token_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `batches` (
    `batch_id` INTEGER NOT NULL AUTO_INCREMENT,
    `provider_id` INTEGER NULL,
    `certification_id` INTEGER NULL,
    `exam_type` VARCHAR(100) NOT NULL,
    `batch_source` ENUM('CSV_UPLOAD', 'EXAM_CLONE') NOT NULL DEFAULT 'CSV_UPLOAD',
    `batch_status` ENUM('Submitted', 'Approved') NOT NULL DEFAULT 'Submitted',
    `batch_name` VARCHAR(255) NULL,
    `remarks` TEXT NULL,
    `created_by` INTEGER NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `approved_by` INTEGER NULL,
    `approved_at` DATETIME(0) NULL,
    `updated_by` INTEGER NULL,
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx_batches_certification`(`certification_id`),
    INDEX `idx_batches_examtype`(`exam_type`),
    INDEX `idx_batches_provider`(`provider_id`),
    INDEX `idx_batches_status`(`batch_status`),
    PRIMARY KEY (`batch_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blog_posts` (
    `blog_id` BIGINT NOT NULL AUTO_INCREMENT,
    `blog_title` VARCHAR(255) NOT NULL,
    `blog_slug` VARCHAR(255) NOT NULL,
    `blog_category` VARCHAR(100) NOT NULL,
    `blog_category_slug` VARCHAR(100) NOT NULL,
    `blog_subcategory` VARCHAR(100) NULL,
    `blog_topic` VARCHAR(150) NULL,
    `blog_banner_image` VARCHAR(255) NULL,
    `intro_text` TEXT NOT NULL,
    `intro_image` VARCHAR(255) NULL,
    `intro_layout` ENUM('LEFT_IMAGE_RIGHT_TEXT', 'RIGHT_IMAGE_LEFT_TEXT', 'TEXT_ONLY') NULL DEFAULT 'TEXT_ONLY',
    `main_text` TEXT NOT NULL,
    `main_image` VARCHAR(255) NULL,
    `main_layout` ENUM('LEFT_IMAGE_RIGHT_TEXT', 'RIGHT_IMAGE_LEFT_TEXT', 'TEXT_ONLY') NULL DEFAULT 'LEFT_IMAGE_RIGHT_TEXT',
    `middle_text` TEXT NULL,
    `middle_image` VARCHAR(255) NULL,
    `middle_layout` ENUM('LEFT_IMAGE_RIGHT_TEXT', 'RIGHT_IMAGE_LEFT_TEXT', 'TEXT_ONLY') NULL DEFAULT 'TEXT_ONLY',
    `conclusion_text` TEXT NULL,
    `conclusion_image` VARCHAR(255) NULL,
    `conclusion_layout` ENUM('LEFT_IMAGE_RIGHT_TEXT', 'RIGHT_IMAGE_LEFT_TEXT', 'TEXT_ONLY') NULL DEFAULT 'TEXT_ONLY',
    `meta_title` VARCHAR(255) NULL,
    `meta_description` VARCHAR(500) NULL,
    `primary_tags` VARCHAR(255) NULL,
    `secondary_tags` VARCHAR(255) NULL,
    `canonical_url` VARCHAR(255) NULL,
    `status` ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED') NULL DEFAULT 'DRAFT',
    `is_featured` BOOLEAN NULL DEFAULT false,
    `comments_allowed` BOOLEAN NULL DEFAULT true,
    `author_name` VARCHAR(150) NOT NULL,
    `author_id` BIGINT NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` INTEGER NOT NULL,

    UNIQUE INDEX `blog_slug`(`blog_slug`),
    INDEX `fk_blog_author_created`(`created_by`),
    INDEX `fk_blog_author_updated`(`updated_by`),
    PRIMARY KEY (`blog_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `certification` (
    `certification_id` INTEGER NOT NULL AUTO_INCREMENT,
    `provider_id` INTEGER NOT NULL,
    `certification_name` VARCHAR(150) NOT NULL,
    `gs_certification_name` VARCHAR(150) NULL,
    `certification_code` VARCHAR(100) NULL,
    `certification_description` TEXT NULL,
    `certification_summary` TEXT NULL,
    `certificate_short_description` VARCHAR(255) NULL,
    `certification_image_path` VARCHAR(255) NULL,
    `certification_level` VARCHAR(100) NULL,
    `domain_distribution` TEXT NULL,
    `is_future` BOOLEAN NULL DEFAULT false,
    `future_percent` FLOAT NULL DEFAULT 0,
    `number_of_mock_questions` INTEGER NULL DEFAULT 0,
    `number_of_practice_questions` INTEGER NULL DEFAULT 0,
    `number_of_final_questions` INTEGER NULL DEFAULT 0,
    `duration_mock` INTEGER NULL DEFAULT 0,
    `duration_practice` INTEGER NULL DEFAULT 0,
    `duration_final` INTEGER NULL DEFAULT 0,
    `status_active` ENUM('active', 'inactive') NULL DEFAULT 'inactive',
    `active_date` DATETIME(0) NULL,
    `inactive_date` DATETIME(0) NULL,
    `created_by` INTEGER NULL,
    `updated_by` INTEGER NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `number_of_mock_tests` INTEGER NULL DEFAULT 0,
    `number_of_practice_tests` INTEGER NULL DEFAULT 0,
    `number_of_final_exams` INTEGER NULL DEFAULT 0,
    `mock_test_price` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `practice_test_price` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `final_exam_price` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `bundle_price` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `certification_voucher_code` VARCHAR(50) NULL,
    `avg_minutes_per_question` FLOAT NULL DEFAULT 2,

    INDEX `fk_certification_created_by`(`created_by`),
    INDEX `fk_certification_updated_by`(`updated_by`),
    INDEX `idx_cert_provider`(`provider_id`),
    INDEX `idx_cert_status_active`(`status_active`),
    INDEX `idx_cert_voucher`(`certification_voucher_code`),
    PRIMARY KEY (`certification_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `certification_review` (
    `review_id` INTEGER NOT NULL AUTO_INCREMENT,
    `certification_id` INTEGER NOT NULL,
    `provider_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `review_type` ENUM('practice_test', 'final_test', 'practice_final') NULL,
    `rating` TINYINT NOT NULL,
    `review_comment` TEXT NULL,
    `improvement_suggested` TEXT NULL,
    `company_name` VARCHAR(150) NULL,
    `user_role` VARCHAR(100) NULL,
    `status` ENUM('active', 'inactive') NULL DEFAULT 'active',
    `created_by` INTEGER NULL,
    `updated_by` INTEGER NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx_cert_review_certification`(`certification_id`),
    INDEX `idx_cert_review_provider`(`provider_id`),
    INDEX `idx_cert_review_type`(`review_type`),
    INDEX `idx_cert_review_user`(`user_id`),
    PRIMARY KEY (`review_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `certification_verification` (
    `verification_id` INTEGER NOT NULL AUTO_INCREMENT,
    `certification_id` INTEGER NULL,
    `user_id` INTEGER NOT NULL,
    `exam_id` INTEGER NULL,
    `verification_code` VARCHAR(50) NOT NULL,
    `certification_name` VARCHAR(150) NOT NULL,
    `certification_code` VARCHAR(100) NULL,
    `certification_description` TEXT NULL,
    `certification_version` VARCHAR(20) NOT NULL,
    `certification_taken_time` DATETIME(0) NOT NULL,
    `certification_issued_date` DATE NULL,
    `certification_expiry_date` DATE NULL,
    `marks_taken` DECIMAL(5, 2) NULL,
    `total_marks` DECIMAL(5, 2) NULL,
    `grade` VARCHAR(10) NULL,
    `result` ENUM('PASS', 'FAIL') NULL,
    `domain_details` JSON NULL,
    `paid_type` ENUM('PAID', 'UNPAID') NOT NULL DEFAULT 'PAID',
    `certification_status` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    `verification_status` ENUM('PENDING', 'VERIFIED', 'EXPIRED', 'REVOKED') NULL DEFAULT 'PENDING',
    `remarks` TEXT NULL,
    `badge_image_url` VARCHAR(255) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` INTEGER NULL,

    UNIQUE INDEX `verification_code`(`verification_code`),
    INDEX `fk_verification_cert`(`certification_id`),
    INDEX `idx_cert_name`(`certification_name`),
    INDEX `idx_cert_verification_code`(`verification_code`),
    INDEX `idx_user`(`user_id`),
    PRIMARY KEY (`verification_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contact_messages` (
    `contact_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `subject_type` ENUM('FORGOT_PASSWORD', 'ACCOUNT_BLOCKED', 'REFUND', 'TECHNICAL_ERROR', 'ORDER_ISSUES', 'COURSE_ISSUES', 'EXAM_ISSUES', 'COURSE_DISCOUNT', 'FEEDBACK', 'OTHER') NOT NULL,
    `message` TEXT NOT NULL,
    `feedback` TEXT NULL,
    `website_link` VARCHAR(500) NULL,
    `recaptcha_token` VARCHAR(500) NULL,
    `created_by` INTEGER NULL,
    `updated_by` INTEGER NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_contact_created_by`(`created_by`),
    INDEX `fk_contact_updated_by`(`updated_by`),
    INDEX `idx_contact_email`(`email`),
    INDEX `idx_contact_subject_type`(`subject_type`),
    PRIMARY KEY (`contact_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `course_resources` (
    `resource_id` INTEGER NOT NULL AUTO_INCREMENT,
    `course_id` INTEGER NOT NULL,
    `resource_name` VARCHAR(50) NOT NULL,
    `resource_type` ENUM('video', 'pdf', 'exam') NOT NULL,
    `resource_link` VARCHAR(150) NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx_course_id`(`course_id`),
    PRIMARY KEY (`resource_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `courses` (
    `course_id` INTEGER NOT NULL AUTO_INCREMENT,
    `provider_id` INTEGER NOT NULL,
    `certification_id` INTEGER NOT NULL,
    `price` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `language` VARCHAR(50) NULL DEFAULT 'English',
    `videos` INTEGER NULL DEFAULT 0,
    `sheets` INTEGER NULL DEFAULT 0,
    `extra` VARCHAR(20) NULL,
    `status_active` ENUM('active', 'inactive') NULL DEFAULT 'inactive',
    `active_date` DATETIME(0) NULL,
    `inactive_date` DATETIME(0) NULL,
    `status_publish` ENUM('published', 'unpublished') NULL DEFAULT 'unpublished',
    `published_date` DATETIME(0) NULL,
    `unpublished_date` DATETIME(0) NULL,
    `created_by` INTEGER NOT NULL,
    `updated_by` INTEGER NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx_certification`(`certification_id`),
    INDEX `idx_provider`(`provider_id`),
    PRIMARY KEY (`course_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `email_verifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `token` VARCHAR(64) NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `expires_at` DATETIME(0) NOT NULL,
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employee_verification` (
    `employee_id` INTEGER NOT NULL AUTO_INCREMENT,
    `verification_code` VARCHAR(50) NOT NULL,
    `appointment_id` BIGINT NOT NULL,
    `position_id` BIGINT NOT NULL,
    `full_name` VARCHAR(150) NOT NULL,
    `employment_type` ENUM('FULL_TIME', 'PART_TIME', 'CONTRACTOR', 'INTERN') NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NULL,
    `payment_status` ENUM('PAID', 'UNPAID') NULL DEFAULT 'PAID',
    `job_responsibilities` TEXT NULL,
    `is_recommended` ENUM('YES', 'NO') NULL DEFAULT 'NO',
    `remarks` TEXT NULL,
    `relieving_letter_location_url` VARCHAR(255) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` INTEGER NULL,

    UNIQUE INDEX `verification_code`(`verification_code`),
    INDEX `idx_appointment_id`(`appointment_id`),
    INDEX `fk_employee_created_by`(`created_by`),
    INDEX `fk_employee_updated_by`(`updated_by`),
    INDEX `idx_position_id`(`position_id`),
    PRIMARY KEY (`employee_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exam_anti_cheat_logs` (
    `log_id` INTEGER NOT NULL AUTO_INCREMENT,
    `exam_session_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `event_type` ENUM('tab_switch', 'window_blur', 'copy_paste_attempt', 'screenshot_attempt', 'network_disconnect', 'webcam_disabled', 'webcam_multiple_faces', 'ai_flagged_suspicion', 'unauthorized_app_detected', 'clipboard_activity') NOT NULL,
    `event_time` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `event_payload` JSON NULL,
    `severity` ENUM('low', 'medium', 'high', 'critical') NULL DEFAULT 'low',
    `detected_by` ENUM('client', 'server', 'ai_model', 'proctor') NULL DEFAULT 'client',
    `notes` TEXT NULL,

    INDEX `idx_ac_eventtype`(`event_type`),
    INDEX `idx_ac_session`(`exam_session_id`),
    PRIMARY KEY (`log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exam_attempts` (
    `attempt_id` INTEGER NOT NULL AUTO_INCREMENT,
    `exam_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `exam_session_id` INTEGER NOT NULL,
    `submitted_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `total_questions` INTEGER NULL,
    `answered_count` INTEGER NULL,
    `skipped_count` INTEGER NULL,
    `marked_for_review_count` INTEGER NULL,
    `auto_score` FLOAT NULL,
    `auto_correct` INTEGER NULL,
    `auto_incorrect` INTEGER NULL,
    `status` ENUM('queued', 'evaluating', 'evaluated', 'error') NULL DEFAULT 'queued',
    `evaluation_mode` ENUM('auto', 'manual', 'hybrid') NULL DEFAULT 'auto',
    `evaluator_id` INTEGER NULL,
    `evaluation_started_at` DATETIME(0) NULL,
    `evaluation_completed_at` DATETIME(0) NULL,
    `evaluation_error` TEXT NULL,
    `session_tab_switches` INTEGER NULL,
    `session_window_blur` INTEGER NULL,
    `session_network_disconnects` INTEGER NULL,
    `session_suspicious_activity` ENUM('none', 'minor', 'major', 'critical') NULL DEFAULT 'none',
    `created_by` INTEGER NULL,
    `updated_by` INTEGER NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_attempt_session`(`exam_session_id`),
    INDEX `fk_attempt_user`(`user_id`),
    INDEX `idx_attempt_exam_user`(`exam_id`, `user_id`),
    INDEX `idx_attempt_status`(`status`),
    PRIMARY KEY (`attempt_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exam_questions` (
    `exam_question_id` INTEGER NOT NULL AUTO_INCREMENT,
    `exam_id` INTEGER NOT NULL,
    `question_id` INTEGER NOT NULL,
    `order_index` INTEGER NULL,
    `is_mandatory` BOOLEAN NULL,
    `time_limit_seconds` INTEGER NULL,
    `marks` FLOAT NULL,
    `negative_marks` FLOAT NULL,
    `points_weight` FLOAT NULL,
    `show_explanation_on_submit` BOOLEAN NULL DEFAULT false,
    `cloned_from_question_id` INTEGER NULL,
    `cloned_at` DATETIME(0) NULL,
    `cloned_by` INTEGER NULL,
    `expected_time_seconds` INTEGER NULL,
    `tag_snapshot` VARCHAR(255) NULL,
    `is_active` BOOLEAN NULL DEFAULT true,
    `remarks` TEXT NULL,
    `created_by` INTEGER NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` INTEGER NULL,
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx_eq_exam`(`exam_id`),
    INDEX `idx_eq_question`(`question_id`),
    UNIQUE INDEX `uq_exam_order`(`exam_id`, `order_index`),
    UNIQUE INDEX `uq_exam_question`(`exam_id`, `question_id`),
    PRIMARY KEY (`exam_question_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exam_results` (
    `result_id` INTEGER NOT NULL AUTO_INCREMENT,
    `attempt_id` INTEGER NOT NULL,
    `exam_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `exam_session_id` INTEGER NOT NULL,
    `submitted_at` DATETIME(0) NULL,
    `evaluated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `total_score` FLOAT NULL,
    `achieved_score` FLOAT NULL,
    `percentage` FLOAT NULL,
    `accuracy` FLOAT NULL,
    `total_questions` INTEGER NULL,
    `correct_answers` INTEGER NULL,
    `incorrect_answers` INTEGER NULL,
    `skipped_questions` INTEGER NULL,
    `marked_for_review` INTEGER NULL,
    `evaluation_mode` ENUM('auto', 'manual', 'hybrid') NULL DEFAULT 'auto',
    `evaluated_by` INTEGER NULL,
    `evaluation_notes` TEXT NULL,
    `trust_score` FLOAT NULL DEFAULT 100,
    `cheat_flag` ENUM('none', 'suspected', 'confirmed') NULL DEFAULT 'none',
    `anti_cheat_reviewed_by` INTEGER NULL,
    `anti_cheat_reviewed_at` DATETIME(0) NULL,
    `anti_cheat_notes` TEXT NULL,
    `status` ENUM('finalized', 'revoked') NULL DEFAULT 'finalized',
    `remarks` TEXT NULL,
    `created_by` INTEGER NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` INTEGER NULL,
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_result_attempt`(`attempt_id`),
    INDEX `fk_result_session`(`exam_session_id`),
    INDEX `fk_result_user`(`user_id`),
    INDEX `idx_result_cheatflag`(`cheat_flag`),
    INDEX `idx_result_exam_user`(`exam_id`, `user_id`),
    PRIMARY KEY (`result_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exam_sessions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `exam_id` INTEGER NOT NULL,
    `take` INTEGER NOT NULL DEFAULT 1,
    `status` ENUM('IN_PROGRESS', 'SUBMITTED', 'TIMEOUT', 'FLAGGED') NULL DEFAULT 'IN_PROGRESS',
    `time_elapsed_seconds` INTEGER NULL DEFAULT 0,
    `start_time` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `end_time` DATETIME(0) NULL,
    `last_activity_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `ip_address` VARCHAR(45) NULL,
    `device_id` VARCHAR(128) NULL,
    `browser_info` TEXT NULL,
    `user_agent` TEXT NULL,
    `geo_location` VARCHAR(100) NULL,
    `tab_switch_count` INTEGER NULL DEFAULT 0,
    `window_blur_events` INTEGER NULL DEFAULT 0,
    `network_disconnects` INTEGER NULL DEFAULT 0,
    `webcam_enabled` BOOLEAN NULL DEFAULT false,
    `suspicious_activity` ENUM('none', 'minor', 'major', 'critical') NULL DEFAULT 'none',
    `flagged_reason` TEXT NULL,
    `last_known_total_answered` INTEGER NULL DEFAULT 0,
    `last_known_correct` INTEGER NULL,
    `created_by` INTEGER NULL,
    `updated_by` INTEGER NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx_exam_id`(`exam_id`),
    INDEX `idx_last_activity`(`last_activity_at`),
    INDEX `idx_status`(`status`),
    INDEX `idx_suspicious_activity`(`suspicious_activity`),
    INDEX `idx_user_id`(`user_id`),
    UNIQUE INDEX `uq_user_exam_take`(`user_id`, `exam_id`, `take`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exams` (
    `exam_id` INTEGER NOT NULL AUTO_INCREMENT,
    `certification_id` INTEGER NULL,
    `exam_type` ENUM('mock', 'practice', 'final', 'custom') NOT NULL,
    `exam_title` VARCHAR(255) NULL,
    `duration_minutes` INTEGER NULL,
    `total_marks` FLOAT NULL,
    `total_questions` INTEGER NULL,
    `instructions` TEXT NULL,
    `created_from_exam_id` INTEGER NULL,
    `status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Inactive',
    `is_randomized` BOOLEAN NULL DEFAULT false,
    `created_by` INTEGER NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` INTEGER NULL,
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_from_user_id` INTEGER NULL,
    `custom_filters` JSON NULL,

    INDEX `idx_exams_cert`(`certification_id`),
    INDEX `idx_exams_created_by_user`(`created_from_user_id`),
    INDEX `idx_exams_status`(`status`),
    PRIMARY KEY (`exam_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `favorites` (
    `favorite_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `entity_type` ENUM('PAGE', 'COMPONENT', 'MENU', 'BLOG_POST', 'LEGAL') NOT NULL,
    `entity_id` INTEGER NOT NULL,
    `added_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx_fav_user_entity`(`user_id`, `entity_type`, `entity_id`),
    PRIMARY KEY (`favorite_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `file_uploads` (
    `file_id` INTEGER NOT NULL AUTO_INCREMENT,
    `file_name` VARCHAR(255) NOT NULL,
    `file_path` VARCHAR(500) NOT NULL,
    `alt_text` VARCHAR(255) NULL,
    `file_type` VARCHAR(100) NULL,
    `file_size` INTEGER NULL,
    `checksum` VARCHAR(100) NULL,
    `is_public` BOOLEAN NULL DEFAULT true,
    `storage_provider` ENUM('LOCAL', 'AZURE_BLOB', 'AWS_S3', 'GCS') NULL DEFAULT 'LOCAL',
    `status` ENUM('ACTIVE', 'INACTIVE', 'DELETED') NULL DEFAULT 'ACTIVE',
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `uploaded_by` INTEGER NOT NULL,
    `updated_by` INTEGER NULL,

    INDEX `fk_file_updated_by`(`updated_by`),
    INDEX `idx_file_type`(`file_type`),
    INDEX `idx_file_user`(`uploaded_by`),
    PRIMARY KEY (`file_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `footer_links` (
    `footer_id` INTEGER NOT NULL AUTO_INCREMENT,
    `column_name` VARCHAR(100) NULL,
    `display_order_column_name` INTEGER NULL DEFAULT 0,
    `link_text` VARCHAR(200) NOT NULL,
    `internal_page` INTEGER NULL,
    `external_url` VARCHAR(500) NULL,
    `display_order_link_text` INTEGER NULL DEFAULT 0,
    `is_active` BOOLEAN NULL DEFAULT true,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` INTEGER NULL,

    INDEX `fk_footer_created_by`(`created_by`),
    INDEX `fk_footer_page`(`internal_page`),
    INDEX `fk_footer_updated_by`(`updated_by`),
    INDEX `idx_footer`(`column_name`),
    PRIMARY KEY (`footer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menus` (
    `menu_id` INTEGER NOT NULL AUTO_INCREMENT,
    `menu_name` VARCHAR(150) NOT NULL,
    `menu_slug` VARCHAR(150) NOT NULL,
    `display_order` INTEGER NULL DEFAULT 0,
    `is_active` BOOLEAN NULL DEFAULT true,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` INTEGER NULL,

    UNIQUE INDEX `menu_slug`(`menu_slug`),
    INDEX `fk_menu_created_by`(`created_by`),
    INDEX `fk_menu_updated_by`(`updated_by`),
    PRIMARY KEY (`menu_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mock_interview_applications` (
    `application_id` INTEGER NOT NULL AUTO_INCREMENT,
    `full_name` VARCHAR(150) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `contact_number` VARCHAR(20) NOT NULL,
    `whatsapp_number` VARCHAR(20) NOT NULL,
    `current_location` VARCHAR(100) NULL,
    `interview_type` ENUM('Certification', 'Client') NOT NULL,
    `certification_name` VARCHAR(150) NULL,
    `tech_stack` VARCHAR(150) NULL,
    `duration_minutes` ENUM('30', '45', '60') NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `first_scheduled_date` DATE NOT NULL,
    `first_scheduled_time` TIME(0) NOT NULL,
    `second_scheduled_date` DATE NULL,
    `second_scheduled_time` TIME(0) NULL,
    `third_scheduled_date` DATE NULL,
    `third_scheduled_time` TIME(0) NULL,
    `reschedule_count` INTEGER NULL DEFAULT 0,
    `application_status` ENUM('Submitted', 'Scheduled', 'Rescheduled', 'Completed', 'Cancelled') NULL DEFAULT 'Submitted',
    `cancel_reason` VARCHAR(255) NULL,
    `payment_status` ENUM('Pending', 'Completed', 'Failed', 'Refund_Initiated', 'Refund') NULL DEFAULT 'Completed',
    `payment_mode` ENUM('Online', 'Offline') NULL DEFAULT 'Online',
    `created_by` VARCHAR(100) NULL DEFAULT 'System',
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` VARCHAR(100) NULL,
    `updated_at` DATETIME(0) NULL,
    `is_active` BOOLEAN NULL DEFAULT true,
    `deleted_flag` BOOLEAN NULL DEFAULT false,

    UNIQUE INDEX `unique_email_time`(`email`, `first_scheduled_date`, `first_scheduled_time`),
    PRIMARY KEY (`application_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mock_interview_pricing` (
    `pricing_id` INTEGER NOT NULL AUTO_INCREMENT,
    `duration_minutes` ENUM('30', '45', '60') NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `effective_from` DATE NOT NULL,
    `is_active` TINYINT NULL DEFAULT 1,

    UNIQUE INDEX `duration_minutes`(`duration_minutes`),
    PRIMARY KEY (`pricing_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `otp_codes` (
    `otp_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `email` VARCHAR(255) NULL,
    `otp_code` VARCHAR(10) NOT NULL,
    `purpose` ENUM('LOGIN', 'RESET', 'VERIFY_EMAIL') NOT NULL,
    `is_used` BOOLEAN NULL DEFAULT false,
    `reset_token` VARCHAR(255) NULL,
    `token_created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `expires_at` DATETIME(0) NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` INTEGER NULL,

    INDEX `fk_otp_created_by`(`created_by`),
    INDEX `fk_otp_updated_by`(`updated_by`),
    INDEX `fk_otp_user`(`user_id`),
    INDEX `idx_otp_code`(`otp_code`),
    PRIMARY KEY (`otp_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pages` (
    `page_id` INTEGER NOT NULL AUTO_INCREMENT,
    `template_id` INTEGER NULL,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `meta_title` VARCHAR(150) NULL,
    `meta_description` TEXT NULL,
    `tags` JSON NULL,
    `description` TEXT NULL,
    `image_url` VARCHAR(500) NULL,
    `status` ENUM('DRAFT', 'PUBLISHED', 'UNPUBLISHED') NULL DEFAULT 'DRAFT',
    `published_at` DATETIME(0) NULL,
    `unpublished_at` DATETIME(0) NULL,
    `created_by` INTEGER NULL,
    `updated_by` INTEGER NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `has_sections` BOOLEAN NOT NULL DEFAULT true,
    `use_common_footer` BOOLEAN NOT NULL DEFAULT true,
    `use_common_header` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `slug`(`slug`),
    INDEX `fk_page_created_by`(`created_by`),
    INDEX `fk_page_template`(`template_id`),
    INDEX `fk_page_updated_by`(`updated_by`),
    PRIMARY KEY (`page_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `promotion_bar` (
    `promotion_id` INTEGER NOT NULL AUTO_INCREMENT,
    `promotion_text` VARCHAR(255) NOT NULL,
    `promotion_button_text` VARCHAR(50) NOT NULL,
    `promotion_button_link` VARCHAR(255) NULL DEFAULT 'https://genospark.in/exam',
    `is_active` BOOLEAN NULL DEFAULT true,
    `display_order` INTEGER NULL DEFAULT 0,
    `start_date` DATETIME(0) NULL,
    `end_date` DATETIME(0) NULL,
    `background_color` VARCHAR(20) NULL DEFAULT '#FFEB3B',
    `text_color` VARCHAR(20) NULL DEFAULT '#000000',
    `created_by` INTEGER NULL,
    `updated_by` INTEGER NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `remarks` TEXT NULL,

    PRIMARY KEY (`promotion_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `providers` (
    `provider_id` INTEGER NOT NULL AUTO_INCREMENT,
    `provider_name` VARCHAR(150) NOT NULL,
    `description` TEXT NULL,
    `logo_path` VARCHAR(255) NULL,
    `website_url` VARCHAR(255) NULL,
    `available_certification_level` VARCHAR(500) NULL,
    `status` ENUM('active', 'inactive') NULL DEFAULT 'inactive',
    `created_by` INTEGER NULL,
    `updated_by` INTEGER NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx_cert_level`(`available_certification_level`),
    PRIMARY KEY (`provider_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `questions` (
    `question_id` INTEGER NOT NULL AUTO_INCREMENT,
    `parent_question_id` INTEGER NULL,
    `created_from_exam_id` INTEGER NULL,
    `batch_id` INTEGER NULL,
    `create_type` ENUM('BULK_CSV', 'MANUAL', 'FROM_EXAM') NOT NULL DEFAULT 'BULK_CSV',
    `csv_serial_no` INTEGER NULL,
    `csv_exam_type` VARCHAR(100) NULL,
    `provider_id` INTEGER NULL,
    `provider_name` VARCHAR(150) NULL,
    `certification_id` INTEGER NULL,
    `certification_name` VARCHAR(255) NULL,
    `exam_type` VARCHAR(100) NULL,
    `question_text` TEXT NOT NULL,
    `option_a` TEXT NULL,
    `option_b` TEXT NULL,
    `option_c` TEXT NULL,
    `option_d` TEXT NULL,
    `option_e` TEXT NULL,
    `option_f` TEXT NULL,
    `question_type` ENUM('single_choice', 'multiple_choice', 'true_false', 'drag_and_drop') NULL DEFAULT 'single_choice',
    `correct_options` VARCHAR(50) NULL,
    `correct_explanation` TEXT NULL,
    `incorrect_explanation` TEXT NULL,
    `domain` VARCHAR(100) NULL,
    `topic` VARCHAR(100) NULL,
    `subtopic` VARCHAR(100) NULL,
    `difficulty_level` VARCHAR(50) NULL,
    `marks` FLOAT NULL DEFAULT 1,
    `negative_marks` FLOAT NULL DEFAULT 0,
    `primary_tags` VARCHAR(100) NULL,
    `secondary_tags` VARCHAR(100) NULL,
    `tertiary_tags` VARCHAR(100) NULL,
    `is_mandatory` BOOLEAN NULL DEFAULT false,
    `is_future` BOOLEAN NULL DEFAULT false,
    `question_image_path` VARCHAR(255) NULL,
    `option_a_image_path` VARCHAR(255) NULL,
    `option_b_image_path` VARCHAR(255) NULL,
    `option_c_image_path` VARCHAR(255) NULL,
    `option_d_image_path` VARCHAR(255) NULL,
    `option_e_image_path` VARCHAR(255) NULL,
    `option_f_image_path` VARCHAR(255) NULL,
    `correct_explanation_image_path` VARCHAR(255) NULL,
    `incorrect_explanation_image_path` VARCHAR(255) NULL,
    `number_of_options` INTEGER NULL,
    `number_of_correct_options` INTEGER NULL,
    `status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Inactive',
    `error_status` VARCHAR(100) NULL,
    `error_message` TEXT NULL,
    `content_hash` CHAR(64) NULL,
    `created_by` INTEGER NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` INTEGER NULL,
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_questions_parent`(`parent_question_id`),
    INDEX `idx_q_batch`(`batch_id`),
    INDEX `idx_q_cert`(`certification_id`),
    INDEX `idx_q_contenthash`(`content_hash`),
    INDEX `idx_q_examtype`(`exam_type`),
    INDEX `idx_q_provider`(`provider_id`),
    INDEX `idx_q_status`(`status`),
    INDEX `idx_q_topic`(`topic`),
    PRIMARY KEY (`question_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `salary_augment_applications` (
    `application_id` INTEGER NOT NULL AUTO_INCREMENT,
    `full_name` VARCHAR(150) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `contact_number` VARCHAR(20) NOT NULL,
    `whatsapp_number` VARCHAR(20) NULL,
    `current_location` VARCHAR(100) NOT NULL,
    `current_job_title` VARCHAR(100) NOT NULL,
    `current_industry` ENUM('IT', 'Non-IT', 'Education', 'Healthcare', 'Finance', 'Manufacturing', 'Others') NOT NULL,
    `years_of_experience` ENUM('<1 year', '1-3 years', '3-5 years', '5-10 years', '10+ years') NOT NULL,
    `desired_career_path` ENUM('Cloud Computing', 'DevOps', 'Data Engineering', 'AI-ML', 'Others') NOT NULL,
    `target_cloud_platform` VARCHAR(191) NULL,
    `self_description` TEXT NOT NULL,
    `preferred_contact_mode` ENUM('Email', 'Phone', 'WhatsApp') NULL DEFAULT 'Email',
    `preferred_contact_time` ENUM('Morning', 'Afternoon', 'Evening') NULL DEFAULT 'Afternoon',
    `linkedin_url` VARCHAR(255) NULL,
    `resume_file_path` VARCHAR(255) NOT NULL,
    `application_status` ENUM('Submitted', 'In Review', 'Shortlisted', 'Rejected', 'Completed') NULL DEFAULT 'Submitted',
    `created_by` VARCHAR(100) NULL DEFAULT 'System',
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` VARCHAR(100) NULL,
    `updated_at` DATETIME(0) NULL,
    `is_active` BOOLEAN NULL DEFAULT true,
    `deleted_flag` BOOLEAN NULL DEFAULT false,

    UNIQUE INDEX `unique_email_contact`(`email`, `contact_number`),
    PRIMARY KEY (`application_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sections` (
    `section_id` INTEGER NOT NULL AUTO_INCREMENT,
    `page_id` INTEGER NOT NULL,
    `section_type` ENUM('HERO', 'MIDDLE', 'SIDEBAR_LEFT', 'SIDEBAR_RIGHT', 'FOOTER', 'BANNER', 'BLOG_POST', 'FAQ_ITEM', 'LEGAL_ITEM') NOT NULL,
    `title` VARCHAR(200) NULL,
    `content` LONGTEXT NULL,
    `media_type` ENUM('IMAGE', 'VIDEO', 'PDF', 'CHEATSHEET', 'PPT', 'MOCK_TEST') NULL,
    `media_url` VARCHAR(500) NULL,
    `file_id` INTEGER NULL,
    `display_order` INTEGER NULL DEFAULT 0,
    `is_active` BOOLEAN NULL DEFAULT true,
    `active_date` DATETIME(0) NULL,
    `inactive_date` DATETIME(0) NULL,
    `published_date` DATETIME(0) NULL,
    `unpublished_date` DATETIME(0) NULL,
    `created_by` INTEGER NULL,
    `updated_by` INTEGER NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_section_created_by`(`created_by`),
    INDEX `fk_section_page`(`page_id`),
    INDEX `fk_section_updated_by`(`updated_by`),
    PRIMARY KEY (`section_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `site_settings` (
    `setting_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `setting_key` VARCHAR(150) NOT NULL,
    `setting_value` TEXT NOT NULL,
    `setting_type` ENUM('STRING', 'NUMBER', 'BOOLEAN', 'JSON') NOT NULL DEFAULT 'STRING',
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` INTEGER NULL,

    UNIQUE INDEX `uq_setting_key`(`setting_key`),
    INDEX `idx_created_by`(`created_by`),
    INDEX `idx_updated_by`(`updated_by`),
    PRIMARY KEY (`setting_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `submenus` (
    `submenu_id` INTEGER NOT NULL AUTO_INCREMENT,
    `menu_id` INTEGER NOT NULL,
    `parent_submenu_id` INTEGER NULL,
    `submenu_title` VARCHAR(150) NOT NULL,
    `submenu_slug` VARCHAR(150) NOT NULL,
    `link_url` VARCHAR(500) NULL,
    `page_id` INTEGER NULL,
    `display_order` INTEGER NULL DEFAULT 0,
    `is_active` BOOLEAN NULL DEFAULT true,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` INTEGER NULL,

    INDEX `fk_submenu_created_by`(`created_by`),
    INDEX `fk_submenu_page`(`page_id`),
    INDEX `fk_submenu_updated_by`(`updated_by`),
    INDEX `idx_submenus_menu`(`menu_id`, `display_order`),
    INDEX `idx_submenus_slug`(`submenu_slug`),
    PRIMARY KEY (`submenu_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `templates` (
    `template_id` INTEGER NOT NULL AUTO_INCREMENT,
    `template_name` VARCHAR(150) NOT NULL,
    `template_code` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `is_active` BOOLEAN NULL DEFAULT true,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` INTEGER NULL,

    UNIQUE INDEX `template_code`(`template_code`),
    INDEX `fk_tpl_created_by`(`created_by`),
    INDEX `fk_tpl_updated_by`(`updated_by`),
    INDEX `idx_templates_active`(`is_active`),
    PRIMARY KEY (`template_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_activity` (
    `activity_id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `session_id` VARCHAR(100) NOT NULL,
    `is_guest` BOOLEAN NULL DEFAULT false,
    `event_type` ENUM('login_success', 'login_failed', 'logout', 'register_email', 'register_google', 'password_changed', 'password_reset_request', 'password_reset_success', 'session_start', 'session_end', 'page_view', 'add_to_cart', 'remove_from_cart', 'checkout_started', 'payment_initiated', 'payment_success', 'payment_failed', 'certification_view', 'practice_test_start', 'final_test_start', 'review_submitted', 'site_error') NOT NULL,
    `page_url` VARCHAR(500) NULL,
    `referrer_url` VARCHAR(500) NULL,
    `device_type` ENUM('desktop', 'mobile', 'tablet') NULL,
    `browser_name` VARCHAR(100) NULL,
    `ip_address` VARCHAR(50) NULL,
    `geo_country` VARCHAR(100) NULL,
    `geo_city` VARCHAR(100) NULL,
    `order_id` BIGINT NULL,
    `amount` DECIMAL(10, 2) NULL,
    `currency` VARCHAR(10) NULL DEFAULT 'INR',
    `event_time` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `metadata` JSON NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx_user_activity_event`(`event_type`),
    INDEX `idx_user_activity_user`(`user_id`),
    INDEX `idx_user_activity_session`(`session_id`),
    INDEX `idx_user_activity_time`(`event_time`),
    PRIMARY KEY (`activity_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_profiles` (
    `profile_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `first_name` VARCHAR(150) NULL,
    `last_name` VARCHAR(150) NULL,
    `phone` VARCHAR(20) NULL,
    `avatar_url` VARCHAR(500) NULL,
    `bio` TEXT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` INTEGER NULL,

    UNIQUE INDEX `user_profiles_user_id_key`(`user_id`),
    INDEX `fk_profile_created_by`(`created_by`),
    INDEX `fk_profile_updated_by`(`updated_by`),
    INDEX `idx_profile_user`(`user_id`),
    PRIMARY KEY (`profile_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_settings` (
    `setting_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `setting_key` VARCHAR(150) NOT NULL,
    `setting_type` ENUM('STRING', 'NUMBER', 'BOOLEAN', 'JSON') NULL DEFAULT 'STRING',
    `setting_value` TEXT NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` INTEGER NULL,

    INDEX `idx_user_settings_key`(`user_id`, `setting_key`),
    PRIMARY KEY (`setting_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `user_name` VARCHAR(100) NULL,
    `user_location` VARCHAR(150) NULL,
    `user_city` VARCHAR(100) NULL,
    `user_country` VARCHAR(100) NULL,
    `email` VARCHAR(150) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `remember_me_token` VARCHAR(255) NULL,
    `failed_login_attempts` INTEGER NULL DEFAULT 0,
    `is_locked` BOOLEAN NULL DEFAULT false,
    `last_login` DATETIME(0) NULL,
    `role` ENUM('subscriber', 'instructor', 'admin') NULL,
    `role_id` BIGINT NULL,
    `status_active` ENUM('active', 'inactive') NULL DEFAULT 'inactive',
    `active_date` DATETIME(0) NULL,
    `inactive_date` DATETIME(0) NULL,
    `created_by` INTEGER NULL,
    `updated_by` INTEGER NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `registration_method` ENUM('email', 'google') NULL DEFAULT 'email',
    `last_password_changed_at` DATETIME(0) NULL,

    UNIQUE INDEX `email`(`email`),
    INDEX `idx_email`(`email`),
    INDEX `fk_users_role_id`(`role_id`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exam_answers` (
    `answer_id` INTEGER NOT NULL AUTO_INCREMENT,
    `attempt_id` INTEGER NOT NULL,
    `question_id` INTEGER NOT NULL,
    `selected_options` VARCHAR(100) NULL,
    `is_correct` BOOLEAN NULL,
    `marks_obtained` FLOAT NULL DEFAULT 0,
    `start_time` DATETIME(0) NULL,
    `end_time` DATETIME(0) NULL,
    `time_spent_seconds` INTEGER NULL,
    `answered_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER NULL,
    `updated_by` INTEGER NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_ea_question`(`question_id`),
    INDEX `idx_attempt_question`(`attempt_id`, `question_id`),
    PRIMARY KEY (`answer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exam_domain_distribution` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `exam_id` INTEGER NOT NULL,
    `domain_name` VARCHAR(150) NOT NULL,
    `domain_code` VARCHAR(50) NULL,
    `weightage_in_certification` FLOAT NULL,
    `weightage_in_exam` FLOAT NULL,
    `domain_total_questions` INTEGER NULL,
    `domain_total_marks` FLOAT NULL,
    `created_by` INTEGER NULL,
    `updated_by` INTEGER NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx_exam_domain`(`exam_id`, `domain_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exam_result_domains` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `attempt_id` INTEGER NOT NULL,
    `exam_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `domain_name` VARCHAR(150) NOT NULL,
    `domain_total_questions` INTEGER NULL DEFAULT 0,
    `domain_total_marks` FLOAT NULL DEFAULT 0,
    `domain_marks_obtained` FLOAT NULL DEFAULT 0,
    `domain_score_percent` FLOAT NULL,
    `created_by` INTEGER NULL,
    `updated_by` INTEGER NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_erd_exam`(`exam_id`),
    INDEX `fk_erd_user`(`user_id`),
    INDEX `idx_result_domain_attempt`(`attempt_id`, `domain_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MetadataValidation` (
    `MetadataValidationId` INTEGER NOT NULL AUTO_INCREMENT,
    `TableName` VARCHAR(100) NOT NULL,
    `ColumnName` VARCHAR(150) NOT NULL,
    `DataType` VARCHAR(100) NOT NULL,
    `LengthValue` VARCHAR(50) NULL,
    `IsNullable` ENUM('YES', 'NO') NOT NULL,
    `EnumValues` TEXT NULL,
    `IsPresentInCSV` ENUM('YES', 'NO') NOT NULL,
    `CreatedBy` INTEGER NULL,
    `CreatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `UpdatedBy` INTEGER NULL,
    `UpdatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`MetadataValidationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blog_comments` (
    `comment_id` BIGINT NOT NULL AUTO_INCREMENT,
    `blog_id` BIGINT NOT NULL,
    `parent_comment_id` BIGINT NULL,
    `user_id` INTEGER NULL,
    `user_name` VARCHAR(150) NOT NULL,
    `user_email` VARCHAR(150) NULL,
    `comment_text` TEXT NOT NULL,
    `likes_count` INTEGER NULL DEFAULT 0,
    `replies_count` INTEGER NULL DEFAULT 0,
    `status` ENUM('VISIBLE', 'PENDING', 'REJECTED', 'BLOCKED', 'DELETED') NULL DEFAULT 'PENDING',
    `commenter_ip` VARCHAR(50) NULL,
    `user_agent` VARCHAR(255) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER NULL,
    `updated_by` INTEGER NULL,

    INDEX `fk_comment_blog`(`blog_id`),
    INDEX `fk_comment_created_by`(`created_by`),
    INDEX `fk_comment_parent`(`parent_comment_id`),
    INDEX `fk_comment_updated_by`(`updated_by`),
    INDEX `fk_comment_user`(`user_id`),
    PRIMARY KEY (`comment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `csv_column_headers` (
    `CsvHeaderId` INTEGER NOT NULL AUTO_INCREMENT,
    `ColName` VARCHAR(200) NOT NULL,
    `data_type` VARCHAR(20) NOT NULL,
    `Description` VARCHAR(255) NULL,
    `CreatedBy` INTEGER NULL,
    `CreatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `UpdatedBy` INTEGER NULL,
    `UpdatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `ColName`(`ColName`),
    INDEX `idx_colname`(`ColName`),
    PRIMARY KEY (`CsvHeaderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cart_items` (
    `cart_item_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cart_id` INTEGER NOT NULL,
    `certification_id` INTEGER NOT NULL,
    `product_type` ENUM('MOCK', 'PRACTICE', 'FINAL', 'BUNDLE') NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` INTEGER NULL,

    INDEX `fk_cart_items_created_by`(`created_by`),
    INDEX `fk_cart_items_updated_by`(`updated_by`),
    INDEX `fk_items_cart`(`cart_id`),
    INDEX `fk_items_cart_cert`(`certification_id`),
    UNIQUE INDEX `uq_cart_item`(`cart_id`, `certification_id`, `product_type`),
    PRIMARY KEY (`cart_item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `carts` (
    `cart_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `coupon_id` INTEGER NULL,
    `status` ENUM('ACTIVE', 'ABANDONED', 'ORDERED') NULL DEFAULT 'ACTIVE',
    `ip_address` VARCHAR(45) NULL,
    `user_agent` TEXT NULL,
    `geo_location` VARCHAR(100) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` INTEGER NULL,

    INDEX `fk_carts_coupon`(`coupon_id`),
    INDEX `fk_carts_created_by`(`created_by`),
    INDEX `fk_carts_updated_by`(`updated_by`),
    INDEX `idx_user_status`(`user_id`, `status`),
    PRIMARY KEY (`cart_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `coupons` (
    `coupon_id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(50) NOT NULL,
    `discount_percentage` DECIMAL(5, 2) NULL,
    `max_discount_amount` DECIMAL(10, 2) NULL,
    `valid_from` DATETIME(0) NULL,
    `valid_until` DATETIME(0) NULL,
    `usage_limit` INTEGER NULL DEFAULT 100,
    `times_used` INTEGER NULL DEFAULT 0,
    `is_active` BOOLEAN NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER NULL,

    UNIQUE INDEX `code`(`code`),
    PRIMARY KEY (`coupon_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `modules` (
    `module_id` BIGINT NOT NULL AUTO_INCREMENT,
    `module_name` VARCHAR(150) NOT NULL,
    `slug` VARCHAR(150) NOT NULL,
    `description` TEXT NULL,
    `is_protected` BOOLEAN NULL DEFAULT false,
    `created_by` BIGINT NULL,
    `updated_by` BIGINT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `slug`(`slug`),
    INDEX `idx_module_is_protected`(`is_protected`),
    INDEX `idx_module_name`(`module_name`),
    INDEX `idx_module_slug`(`slug`),
    PRIMARY KEY (`module_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notifications` (
    `notification_id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `source_type` ENUM('EXAM_SESSIONS', 'TRANSACTIONS', 'CARTS') NOT NULL,
    `source_id` VARCHAR(100) NOT NULL,
    `notification_type` ENUM('EXAM_IN_PROGRESS', 'EXAM_ABANDONED', 'PAYMENT_FAILED', 'PAYMENT_SUCCESS', 'CART_ABANDONED') NOT NULL,
    `status` ENUM('UNREAD', 'READ', 'RESOLVED', 'DISMISSED') NOT NULL DEFAULT 'UNREAD',
    `message` TEXT NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `resolved_at` DATETIME(0) NULL,
    `dismissed_at` DATETIME(0) NULL,
    `expires_at` DATETIME(0) NULL,

    INDEX `idx_source`(`source_type`, `source_id`),
    INDEX `idx_user_status`(`user_id`, `status`),
    PRIMARY KEY (`notification_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_items` (
    `order_item_id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` INTEGER NOT NULL,
    `certification_id` INTEGER NOT NULL,
    `product_type` ENUM('MOCK', 'PRACTICE', 'FINAL', 'BUNDLE') NOT NULL,
    `price_at_purchase` DECIMAL(10, 2) NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` INTEGER NULL,

    INDEX `fk_items_cert`(`certification_id`),
    INDEX `fk_items_order`(`order_id`),
    PRIMARY KEY (`order_item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `order_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `coupon_id` INTEGER NULL,
    `subtotal_amount` DECIMAL(10, 2) NOT NULL,
    `discount_amount` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `total_amount` DECIMAL(10, 2) NOT NULL,
    `currency` VARCHAR(10) NULL DEFAULT 'INR',
    `status` ENUM('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED', 'CANCELLED') NULL DEFAULT 'PENDING',
    `source` ENUM('WEB', 'MOBILE', 'ADMIN') NULL DEFAULT 'WEB',
    `ip_address` VARCHAR(45) NULL,
    `user_agent` TEXT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` INTEGER NULL,

    INDEX `fk_orders_coupon`(`coupon_id`),
    INDEX `idx_orders_date`(`created_at`),
    INDEX `idx_orders_status`(`status`),
    INDEX `idx_orders_user`(`user_id`),
    PRIMARY KEY (`order_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `refunds` (
    `refund_id` INTEGER NOT NULL AUTO_INCREMENT,
    `transaction_id` INTEGER NOT NULL,
    `razorpay_refund_id` VARCHAR(255) NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `status` VARCHAR(50) NULL DEFAULT 'processed',
    `reason` TEXT NULL,
    `created_by` INTEGER NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` INTEGER NULL,

    INDEX `fk_refunds_trans`(`transaction_id`),
    PRIMARY KEY (`refund_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role_module_default` (
    `rmd_id` BIGINT NOT NULL AUTO_INCREMENT,
    `role_id` BIGINT NOT NULL,
    `module_id` BIGINT NOT NULL,
    `can_access` BOOLEAN NULL DEFAULT true,
    `created_by` BIGINT NULL,
    `updated_by` BIGINT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx_rmd_module_id`(`module_id`),
    INDEX `idx_rmd_role_id`(`role_id`),
    INDEX `idx_rmd_role_module`(`role_id`, `module_id`),
    PRIMARY KEY (`rmd_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `role_id` BIGINT NOT NULL AUTO_INCREMENT,
    `role_name` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(100) NULL,
    `description` TEXT NULL,
    `is_protected` BOOLEAN NULL DEFAULT false,
    `created_by` BIGINT NULL,
    `updated_by` BIGINT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `role_name`(`role_name`),
    UNIQUE INDEX `slug`(`slug`),
    INDEX `idx_role_is_protected`(`is_protected`),
    INDEX `idx_role_slug`(`slug`),
    PRIMARY KEY (`role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transactions` (
    `transaction_id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` INTEGER NOT NULL,
    `razorpay_order_id` VARCHAR(255) NULL,
    `razorpay_payment_id` VARCHAR(255) NULL,
    `razorpay_signature` VARCHAR(500) NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `status` ENUM('PENDING', 'SUCCESS', 'FAILED') NULL DEFAULT 'PENDING',
    `method` VARCHAR(50) NULL,
    `error_code` VARCHAR(100) NULL,
    `error_description` TEXT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` INTEGER NULL,

    INDEX `fk_trans_order`(`order_id`),
    INDEX `idx_rzp_order`(`razorpay_order_id`),
    INDEX `idx_rzp_payment`(`razorpay_payment_id`),
    PRIMARY KEY (`transaction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_enrollments` (
    `enrollment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `certification_id` INTEGER NOT NULL,
    `access_type` ENUM('MOCK', 'PRACTICE', 'FINAL', 'BUNDLE') NOT NULL,
    `valid_from` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `valid_until` DATETIME(0) NULL,
    `is_active` BOOLEAN NULL DEFAULT true,
    `linked_order_id` INTEGER NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` INTEGER NULL,

    INDEX `fk_enroll_cert`(`certification_id`),
    INDEX `fk_enroll_order`(`linked_order_id`),
    INDEX `idx_enroll_user_cert`(`user_id`, `certification_id`),
    PRIMARY KEY (`enrollment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_role_module` (
    `ur_id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `role_id` BIGINT NOT NULL,
    `module_id` BIGINT NOT NULL,
    `created_by` BIGINT NULL,
    `updated_by` BIGINT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx_urm_module_id`(`module_id`),
    INDEX `idx_urm_role_id`(`role_id`),
    INDEX `idx_urm_role_module`(`role_id`, `module_id`),
    INDEX `idx_urm_user_id`(`user_id`),
    INDEX `idx_urm_user_role`(`user_id`, `role_id`),
    PRIMARY KEY (`ur_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `webhook_logs` (
    `log_id` INTEGER NOT NULL AUTO_INCREMENT,
    `event_id` VARCHAR(255) NULL,
    `event_type` VARCHAR(100) NULL,
    `payload` JSON NULL,
    `is_processed` BOOLEAN NULL DEFAULT false,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` INTEGER NULL,

    INDEX `idx_webhook_event`(`event_id`),
    PRIMARY KEY (`log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cms_submenus` (
    `submenu_id` BIGINT NOT NULL AUTO_INCREMENT,
    `menu_id` BIGINT NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `link` VARCHAR(255) NOT NULL,
    `display_order` INTEGER NOT NULL DEFAULT 0,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` BIGINT NULL,
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` BIGINT NULL,

    INDEX `idx_submenu_menu`(`menu_id`),
    PRIMARY KEY (`submenu_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_audit_log` (
    `audit_id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `action_type` ENUM('password_changed', 'profile_updated', 'email_changed', 'role_changed', 'account_locked', 'account_unlocked') NOT NULL,
    `performed_by` INTEGER NULL,
    `ip_address` VARCHAR(50) NULL,
    `old_value` JSON NULL,
    `new_value` JSON NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx_audit_action`(`action_type`),
    INDEX `idx_audit_user`(`user_id`),
    PRIMARY KEY (`audit_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_sessions` (
    `session_id` VARCHAR(100) NOT NULL,
    `user_id` INTEGER NULL,
    `is_guest` BOOLEAN NULL DEFAULT false,
    `auth_method` ENUM('email', 'google', 'guest') NULL DEFAULT 'guest',
    `login_time` DATETIME(0) NOT NULL,
    `logout_time` DATETIME(0) NULL,
    `last_seen_at` DATETIME(0) NOT NULL,
    `ip_address` VARCHAR(50) NULL,
    `geo_country` VARCHAR(100) NULL,
    `geo_city` VARCHAR(100) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx_user_sessions_active`(`logout_time`, `last_seen_at`),
    INDEX `idx_user_sessions_user`(`user_id`),
    PRIMARY KEY (`session_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `positions` (
    `position_id` BIGINT NOT NULL AUTO_INCREMENT,
    `position_title` VARCHAR(150) NOT NULL,
    `description` TEXT NULL,
    `responsibilities` TEXT NOT NULL,
    `terms_conditions` TEXT NOT NULL,
    `base_document_path` VARCHAR(255) NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    `remarks` TEXT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` INTEGER NULL,

    PRIMARY KEY (`position_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `appointments` (
    `appointment_id` BIGINT NOT NULL AUTO_INCREMENT,
    `enrollment_id` BIGINT NOT NULL,
    `user_id` INTEGER NOT NULL,
    `full_name` VARCHAR(150) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `mobile_number` VARCHAR(20) NOT NULL,
    `entity_name` VARCHAR(191) NOT NULL,
    `city` VARCHAR(100) NOT NULL,
    `state` VARCHAR(100) NOT NULL,
    `country` VARCHAR(100) NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NULL,
    `work_type` ENUM('ONSITE', 'REMOTE', 'HYBRID') NULL DEFAULT 'REMOTE',
    `working_hrs_per_week` INTEGER NULL,
    `intern_summary` TEXT NULL,
    `enrollment_proof_url` VARCHAR(255) NULL,
    `payment_status` ENUM('PAID', 'UNPAID') NOT NULL DEFAULT 'UNPAID',
    `position_id` BIGINT NOT NULL,
    `position_title` VARCHAR(191) NULL,
    `offer_letter_location_url` VARCHAR(255) NULL,
    `terms_accepted` BOOLEAN NOT NULL DEFAULT false,
    `status` ENUM('DRAFT', 'SUBMITTED', 'VERIFIED', 'OFFERED', 'ACTIVE', 'RESUBMIT', 'CANCELLED') NOT NULL DEFAULT 'DRAFT',
    `admin_comment` VARCHAR(191) NULL,
    `email_sent` BOOLEAN NOT NULL DEFAULT false,
    `email_sent_at` DATETIME(0) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` INTEGER NULL,

    INDEX `fk_appointment_created_by`(`created_by`),
    INDEX `fk_appointment_position`(`position_id`),
    INDEX `fk_appointment_updated_by`(`updated_by`),
    INDEX `fk_appointment_user`(`user_id`),
    INDEX `idx_appointment_enrollment_id`(`enrollment_id`),
    PRIMARY KEY (`appointment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sequence_table` (
    `sequence_id` BIGINT NOT NULL AUTO_INCREMENT,
    `year` INTEGER NOT NULL,
    `category` CHAR(1) NOT NULL,
    `seq_value` BIGINT NOT NULL,

    UNIQUE INDEX `uq_year_category`(`year`, `category`),
    PRIMARY KEY (`sequence_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tmp_employee_verification_backup` (
    `employee_id` INTEGER NOT NULL DEFAULT 0,
    `appointment_id` BIGINT NULL,
    `position_id` BIGINT NULL,
    `verification_code` VARCHAR(50) NOT NULL,
    `full_name` VARCHAR(150) NOT NULL,
    `employment_type` ENUM('FULL_TIME', 'PART_TIME', 'CONTRACTOR', 'INTERN') NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NULL,
    `payment_status` ENUM('PAID', 'UNPAID') NULL DEFAULT 'PAID',
    `job_responsibilities` TEXT NULL,
    `is_recommended` ENUM('YES', 'NO') NULL DEFAULT 'NO',
    `remarks` TEXT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` INTEGER NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `relievings` (
    `relieving_id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `appointment_id` BIGINT NOT NULL,
    `position_id` BIGINT NOT NULL,
    `full_name` VARCHAR(255) NOT NULL,
    `position_title` VARCHAR(100) NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `city` VARCHAR(100) NOT NULL,
    `state` VARCHAR(100) NOT NULL,
    `country` VARCHAR(100) NOT NULL,
    `relieving_reason` ENUM('INTERNSHIP_COMPLETED', 'OTHER') NOT NULL,
    `remarks` VARCHAR(500) NULL,
    `is_recommended` ENUM('YES', 'NO') NOT NULL DEFAULT 'NO',
    `relieving_letter_location_url` VARCHAR(255) NULL,
    `status` ENUM('DRAFT', 'SUBMITTED', 'VERIFIED', 'ISSUED') NOT NULL DEFAULT 'DRAFT',
    `admin_signed_time` DATETIME(0) NULL,
    `email_sent` BOOLEAN NOT NULL DEFAULT false,
    `email_sent_at` DATETIME(0) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` INTEGER NULL,

    INDEX `fk_relieving_created_by`(`created_by`),
    INDEX `fk_relieving_updated_by`(`updated_by`),
    INDEX `idx_relieving_appointment`(`appointment_id`),
    INDEX `idx_relieving_position`(`position_id`),
    INDEX `idx_relieving_user`(`user_id`),
    PRIMARY KEY (`relieving_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `auth_tokens` ADD CONSTRAINT `fk_auth_created_by` FOREIGN KEY (`created_by`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `auth_tokens` ADD CONSTRAINT `fk_auth_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `auth_tokens` ADD CONSTRAINT `fk_auth_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `blog_posts` ADD CONSTRAINT `fk_blog_author_created` FOREIGN KEY (`created_by`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `blog_posts` ADD CONSTRAINT `fk_blog_author_updated` FOREIGN KEY (`updated_by`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `certification` ADD CONSTRAINT `fk_certification_created_by` FOREIGN KEY (`created_by`) REFERENCES `users`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `certification` ADD CONSTRAINT `fk_certification_provider` FOREIGN KEY (`provider_id`) REFERENCES `providers`(`provider_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `certification` ADD CONSTRAINT `fk_certification_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `users`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `certification_review` ADD CONSTRAINT `fk_review_certification` FOREIGN KEY (`certification_id`) REFERENCES `certification`(`certification_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `certification_review` ADD CONSTRAINT `fk_review_provider` FOREIGN KEY (`provider_id`) REFERENCES `providers`(`provider_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `certification_review` ADD CONSTRAINT `fk_review_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `certification_verification` ADD CONSTRAINT `fk_verification_cert` FOREIGN KEY (`certification_id`) REFERENCES `certification`(`certification_id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `certification_verification` ADD CONSTRAINT `fk_verification_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `contact_messages` ADD CONSTRAINT `fk_contact_created_by` FOREIGN KEY (`created_by`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `contact_messages` ADD CONSTRAINT `fk_contact_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `course_resources` ADD CONSTRAINT `fk_resources_course` FOREIGN KEY (`course_id`) REFERENCES `courses`(`course_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `courses` ADD CONSTRAINT `fk_courses_certification` FOREIGN KEY (`certification_id`) REFERENCES `certification`(`certification_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `courses` ADD CONSTRAINT `fk_courses_provider` FOREIGN KEY (`provider_id`) REFERENCES `providers`(`provider_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `employee_verification` ADD CONSTRAINT `fk_employee_appointment` FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`appointment_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employee_verification` ADD CONSTRAINT `fk_employee_created_by` FOREIGN KEY (`created_by`) REFERENCES `users`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employee_verification` ADD CONSTRAINT `fk_employee_position` FOREIGN KEY (`position_id`) REFERENCES `positions`(`position_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employee_verification` ADD CONSTRAINT `fk_employee_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `users`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exam_anti_cheat_logs` ADD CONSTRAINT `fk_ac_session` FOREIGN KEY (`exam_session_id`) REFERENCES `exam_sessions`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `exam_attempts` ADD CONSTRAINT `fk_attempt_exam` FOREIGN KEY (`exam_id`) REFERENCES `exams`(`exam_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `exam_attempts` ADD CONSTRAINT `fk_attempt_session` FOREIGN KEY (`exam_session_id`) REFERENCES `exam_sessions`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `exam_attempts` ADD CONSTRAINT `fk_attempt_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `exam_questions` ADD CONSTRAINT `fk_eq_exam` FOREIGN KEY (`exam_id`) REFERENCES `exams`(`exam_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `exam_questions` ADD CONSTRAINT `fk_eq_question` FOREIGN KEY (`question_id`) REFERENCES `questions`(`question_id`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `exam_results` ADD CONSTRAINT `fk_result_attempt` FOREIGN KEY (`attempt_id`) REFERENCES `exam_attempts`(`attempt_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `exam_results` ADD CONSTRAINT `fk_result_exam` FOREIGN KEY (`exam_id`) REFERENCES `exams`(`exam_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `exam_results` ADD CONSTRAINT `fk_result_session` FOREIGN KEY (`exam_session_id`) REFERENCES `exam_sessions`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `exam_results` ADD CONSTRAINT `fk_result_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `exam_sessions` ADD CONSTRAINT `fk_es_exam` FOREIGN KEY (`exam_id`) REFERENCES `exams`(`exam_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `exam_sessions` ADD CONSTRAINT `fk_es_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `exams` ADD CONSTRAINT `fk_exams_cert` FOREIGN KEY (`certification_id`) REFERENCES `certification`(`certification_id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `favorites` ADD CONSTRAINT `fk_fav_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `file_uploads` ADD CONSTRAINT `fk_file_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `file_uploads` ADD CONSTRAINT `fk_file_user` FOREIGN KEY (`uploaded_by`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `footer_links` ADD CONSTRAINT `fk_footer_created_by` FOREIGN KEY (`created_by`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `footer_links` ADD CONSTRAINT `fk_footer_page` FOREIGN KEY (`internal_page`) REFERENCES `pages`(`page_id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `footer_links` ADD CONSTRAINT `fk_footer_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `menus` ADD CONSTRAINT `fk_menu_created_by` FOREIGN KEY (`created_by`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `menus` ADD CONSTRAINT `fk_menu_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `otp_codes` ADD CONSTRAINT `fk_otp_created_by` FOREIGN KEY (`created_by`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `otp_codes` ADD CONSTRAINT `fk_otp_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `otp_codes` ADD CONSTRAINT `fk_otp_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pages` ADD CONSTRAINT `fk_page_created_by` FOREIGN KEY (`created_by`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pages` ADD CONSTRAINT `fk_page_template` FOREIGN KEY (`template_id`) REFERENCES `templates`(`template_id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pages` ADD CONSTRAINT `fk_page_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `questions` ADD CONSTRAINT `fk_questions_batch` FOREIGN KEY (`batch_id`) REFERENCES `batches`(`batch_id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `questions` ADD CONSTRAINT `fk_questions_parent` FOREIGN KEY (`parent_question_id`) REFERENCES `questions`(`question_id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `sections` ADD CONSTRAINT `fk_section_created_by` FOREIGN KEY (`created_by`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `sections` ADD CONSTRAINT `fk_section_page` FOREIGN KEY (`page_id`) REFERENCES `pages`(`page_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `sections` ADD CONSTRAINT `fk_section_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `site_settings` ADD CONSTRAINT `fk_site_created_by` FOREIGN KEY (`created_by`) REFERENCES `users`(`user_id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `site_settings` ADD CONSTRAINT `fk_site_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `users`(`user_id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `submenus` ADD CONSTRAINT `fk_submenu_created_by` FOREIGN KEY (`created_by`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `submenus` ADD CONSTRAINT `fk_submenu_menu` FOREIGN KEY (`menu_id`) REFERENCES `menus`(`menu_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `submenus` ADD CONSTRAINT `fk_submenu_page` FOREIGN KEY (`page_id`) REFERENCES `pages`(`page_id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `submenus` ADD CONSTRAINT `fk_submenu_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `templates` ADD CONSTRAINT `fk_tpl_created_by` FOREIGN KEY (`created_by`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `templates` ADD CONSTRAINT `fk_tpl_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_activity` ADD CONSTRAINT `fk_user_activity_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_profiles` ADD CONSTRAINT `fk_profile_created_by` FOREIGN KEY (`created_by`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_profiles` ADD CONSTRAINT `fk_profile_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_profiles` ADD CONSTRAINT `fk_profile_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_settings` ADD CONSTRAINT `fk_user_settings_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `fk_users_role_id` FOREIGN KEY (`role_id`) REFERENCES `roles`(`role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `exam_answers` ADD CONSTRAINT `fk_ea_attempt` FOREIGN KEY (`attempt_id`) REFERENCES `exam_attempts`(`attempt_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `exam_answers` ADD CONSTRAINT `fk_ea_question` FOREIGN KEY (`question_id`) REFERENCES `questions`(`question_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `exam_domain_distribution` ADD CONSTRAINT `fk_edd_exam` FOREIGN KEY (`exam_id`) REFERENCES `exams`(`exam_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `exam_result_domains` ADD CONSTRAINT `fk_erd_attempt` FOREIGN KEY (`attempt_id`) REFERENCES `exam_attempts`(`attempt_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `exam_result_domains` ADD CONSTRAINT `fk_erd_exam` FOREIGN KEY (`exam_id`) REFERENCES `exams`(`exam_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `exam_result_domains` ADD CONSTRAINT `fk_erd_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `blog_comments` ADD CONSTRAINT `fk_comment_blog` FOREIGN KEY (`blog_id`) REFERENCES `blog_posts`(`blog_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `blog_comments` ADD CONSTRAINT `fk_comment_created_by` FOREIGN KEY (`created_by`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `blog_comments` ADD CONSTRAINT `fk_comment_parent` FOREIGN KEY (`parent_comment_id`) REFERENCES `blog_comments`(`comment_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `blog_comments` ADD CONSTRAINT `fk_comment_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `blog_comments` ADD CONSTRAINT `fk_comment_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cart_items` ADD CONSTRAINT `fk_cart_items_created_by` FOREIGN KEY (`created_by`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cart_items` ADD CONSTRAINT `fk_cart_items_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cart_items` ADD CONSTRAINT `fk_items_cart` FOREIGN KEY (`cart_id`) REFERENCES `carts`(`cart_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cart_items` ADD CONSTRAINT `fk_items_cart_cert` FOREIGN KEY (`certification_id`) REFERENCES `certification`(`certification_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `carts` ADD CONSTRAINT `fk_carts_coupon` FOREIGN KEY (`coupon_id`) REFERENCES `coupons`(`coupon_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `carts` ADD CONSTRAINT `fk_carts_created_by` FOREIGN KEY (`created_by`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `carts` ADD CONSTRAINT `fk_carts_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `carts` ADD CONSTRAINT `fk_carts_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `fk_items_cert` FOREIGN KEY (`certification_id`) REFERENCES `certification`(`certification_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `fk_items_order` FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `fk_orders_coupon` FOREIGN KEY (`coupon_id`) REFERENCES `coupons`(`coupon_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `fk_orders_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `refunds` ADD CONSTRAINT `fk_refunds_trans` FOREIGN KEY (`transaction_id`) REFERENCES `transactions`(`transaction_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `role_module_default` ADD CONSTRAINT `fk_rmd_module` FOREIGN KEY (`module_id`) REFERENCES `modules`(`module_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `role_module_default` ADD CONSTRAINT `fk_rmd_role` FOREIGN KEY (`role_id`) REFERENCES `roles`(`role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `fk_trans_order` FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_enrollments` ADD CONSTRAINT `fk_enroll_cert` FOREIGN KEY (`certification_id`) REFERENCES `certification`(`certification_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_enrollments` ADD CONSTRAINT `fk_enroll_order` FOREIGN KEY (`linked_order_id`) REFERENCES `orders`(`order_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_enrollments` ADD CONSTRAINT `fk_enroll_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_role_module` ADD CONSTRAINT `fk_urm_module` FOREIGN KEY (`module_id`) REFERENCES `modules`(`module_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_role_module` ADD CONSTRAINT `fk_urm_role` FOREIGN KEY (`role_id`) REFERENCES `roles`(`role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_role_module` ADD CONSTRAINT `fk_urm_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_audit_log` ADD CONSTRAINT `fk_audit_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_sessions` ADD CONSTRAINT `fk_user_sessions_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `fk_appointment_created_by` FOREIGN KEY (`created_by`) REFERENCES `users`(`user_id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `fk_appointment_position` FOREIGN KEY (`position_id`) REFERENCES `positions`(`position_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `fk_appointment_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `users`(`user_id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `fk_appointment_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relievings` ADD CONSTRAINT `fk_relieving_appointment` FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`appointment_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relievings` ADD CONSTRAINT `fk_relieving_created_by` FOREIGN KEY (`created_by`) REFERENCES `users`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relievings` ADD CONSTRAINT `fk_relieving_position` FOREIGN KEY (`position_id`) REFERENCES `positions`(`position_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relievings` ADD CONSTRAINT `fk_relieving_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `users`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relievings` ADD CONSTRAINT `fk_relieving_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
