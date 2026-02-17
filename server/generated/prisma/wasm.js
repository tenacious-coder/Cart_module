
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.Auth_tokensScalarFieldEnum = {
  token_id: 'token_id',
  user_id: 'user_id',
  token: 'token',
  token_type: 'token_type',
  expires_at: 'expires_at',
  is_revoked: 'is_revoked',
  created_at: 'created_at',
  created_by: 'created_by',
  updated_at: 'updated_at',
  updated_by: 'updated_by'
};

exports.Prisma.BatchesScalarFieldEnum = {
  batch_id: 'batch_id',
  provider_id: 'provider_id',
  certification_id: 'certification_id',
  exam_type: 'exam_type',
  batch_source: 'batch_source',
  batch_status: 'batch_status',
  batch_name: 'batch_name',
  remarks: 'remarks',
  created_by: 'created_by',
  created_at: 'created_at',
  approved_by: 'approved_by',
  approved_at: 'approved_at',
  updated_by: 'updated_by',
  updated_at: 'updated_at'
};

exports.Prisma.Blog_postsScalarFieldEnum = {
  blog_id: 'blog_id',
  blog_title: 'blog_title',
  blog_slug: 'blog_slug',
  blog_category: 'blog_category',
  blog_category_slug: 'blog_category_slug',
  blog_subcategory: 'blog_subcategory',
  blog_topic: 'blog_topic',
  blog_banner_image: 'blog_banner_image',
  intro_text: 'intro_text',
  intro_image: 'intro_image',
  intro_layout: 'intro_layout',
  main_text: 'main_text',
  main_image: 'main_image',
  main_layout: 'main_layout',
  middle_text: 'middle_text',
  middle_image: 'middle_image',
  middle_layout: 'middle_layout',
  conclusion_text: 'conclusion_text',
  conclusion_image: 'conclusion_image',
  conclusion_layout: 'conclusion_layout',
  meta_title: 'meta_title',
  meta_description: 'meta_description',
  primary_tags: 'primary_tags',
  secondary_tags: 'secondary_tags',
  canonical_url: 'canonical_url',
  status: 'status',
  is_featured: 'is_featured',
  comments_allowed: 'comments_allowed',
  author_name: 'author_name',
  author_id: 'author_id',
  created_at: 'created_at',
  created_by: 'created_by',
  updated_at: 'updated_at',
  updated_by: 'updated_by'
};

exports.Prisma.CertificationScalarFieldEnum = {
  certification_id: 'certification_id',
  provider_id: 'provider_id',
  certification_name: 'certification_name',
  gs_certification_name: 'gs_certification_name',
  certification_code: 'certification_code',
  certification_description: 'certification_description',
  certification_summary: 'certification_summary',
  certificate_short_description: 'certificate_short_description',
  certification_image_path: 'certification_image_path',
  certification_level: 'certification_level',
  domain_distribution: 'domain_distribution',
  is_future: 'is_future',
  future_percent: 'future_percent',
  number_of_mock_questions: 'number_of_mock_questions',
  number_of_practice_questions: 'number_of_practice_questions',
  number_of_final_questions: 'number_of_final_questions',
  duration_mock: 'duration_mock',
  duration_practice: 'duration_practice',
  duration_final: 'duration_final',
  status_active: 'status_active',
  active_date: 'active_date',
  inactive_date: 'inactive_date',
  created_by: 'created_by',
  updated_by: 'updated_by',
  created_at: 'created_at',
  updated_at: 'updated_at',
  number_of_mock_tests: 'number_of_mock_tests',
  number_of_practice_tests: 'number_of_practice_tests',
  number_of_final_exams: 'number_of_final_exams',
  mock_test_price: 'mock_test_price',
  practice_test_price: 'practice_test_price',
  final_exam_price: 'final_exam_price',
  bundle_price: 'bundle_price',
  certification_voucher_code: 'certification_voucher_code',
  avg_minutes_per_question: 'avg_minutes_per_question'
};

exports.Prisma.Certification_reviewScalarFieldEnum = {
  review_id: 'review_id',
  certification_id: 'certification_id',
  provider_id: 'provider_id',
  user_id: 'user_id',
  review_type: 'review_type',
  rating: 'rating',
  review_comment: 'review_comment',
  improvement_suggested: 'improvement_suggested',
  company_name: 'company_name',
  user_role: 'user_role',
  status: 'status',
  created_by: 'created_by',
  updated_by: 'updated_by',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Certification_verificationScalarFieldEnum = {
  verification_id: 'verification_id',
  certification_id: 'certification_id',
  user_id: 'user_id',
  exam_id: 'exam_id',
  verification_code: 'verification_code',
  certification_name: 'certification_name',
  certification_code: 'certification_code',
  certification_description: 'certification_description',
  certification_version: 'certification_version',
  certification_taken_time: 'certification_taken_time',
  certification_issued_date: 'certification_issued_date',
  certification_expiry_date: 'certification_expiry_date',
  marks_taken: 'marks_taken',
  total_marks: 'total_marks',
  grade: 'grade',
  result: 'result',
  domain_details: 'domain_details',
  paid_type: 'paid_type',
  certification_status: 'certification_status',
  verification_status: 'verification_status',
  remarks: 'remarks',
  badge_image_url: 'badge_image_url',
  created_at: 'created_at',
  created_by: 'created_by',
  updated_at: 'updated_at',
  updated_by: 'updated_by'
};

exports.Prisma.Contact_messagesScalarFieldEnum = {
  contact_id: 'contact_id',
  name: 'name',
  email: 'email',
  subject_type: 'subject_type',
  message: 'message',
  feedback: 'feedback',
  website_link: 'website_link',
  recaptcha_token: 'recaptcha_token',
  created_by: 'created_by',
  updated_by: 'updated_by',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Course_resourcesScalarFieldEnum = {
  resource_id: 'resource_id',
  course_id: 'course_id',
  resource_name: 'resource_name',
  resource_type: 'resource_type',
  resource_link: 'resource_link',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.CoursesScalarFieldEnum = {
  course_id: 'course_id',
  provider_id: 'provider_id',
  certification_id: 'certification_id',
  price: 'price',
  language: 'language',
  videos: 'videos',
  sheets: 'sheets',
  extra: 'extra',
  status_active: 'status_active',
  active_date: 'active_date',
  inactive_date: 'inactive_date',
  status_publish: 'status_publish',
  published_date: 'published_date',
  unpublished_date: 'unpublished_date',
  created_by: 'created_by',
  updated_by: 'updated_by',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Email_verificationsScalarFieldEnum = {
  id: 'id',
  email: 'email',
  token: 'token',
  created_at: 'created_at',
  expires_at: 'expires_at',
  created_by: 'created_by',
  updated_at: 'updated_at',
  updated_by: 'updated_by'
};

exports.Prisma.Employee_verificationScalarFieldEnum = {
  employee_id: 'employee_id',
  verification_code: 'verification_code',
  appointment_id: 'appointment_id',
  position_id: 'position_id',
  full_name: 'full_name',
  employment_type: 'employment_type',
  start_date: 'start_date',
  end_date: 'end_date',
  payment_status: 'payment_status',
  job_responsibilities: 'job_responsibilities',
  is_recommended: 'is_recommended',
  remarks: 'remarks',
  relieving_letter_location_url: 'relieving_letter_location_url',
  created_at: 'created_at',
  created_by: 'created_by',
  updated_at: 'updated_at',
  updated_by: 'updated_by'
};

exports.Prisma.Exam_anti_cheat_logsScalarFieldEnum = {
  log_id: 'log_id',
  exam_session_id: 'exam_session_id',
  user_id: 'user_id',
  event_type: 'event_type',
  event_time: 'event_time',
  event_payload: 'event_payload',
  severity: 'severity',
  detected_by: 'detected_by',
  notes: 'notes'
};

exports.Prisma.Exam_attemptsScalarFieldEnum = {
  attempt_id: 'attempt_id',
  exam_id: 'exam_id',
  user_id: 'user_id',
  exam_session_id: 'exam_session_id',
  submitted_at: 'submitted_at',
  total_questions: 'total_questions',
  answered_count: 'answered_count',
  skipped_count: 'skipped_count',
  marked_for_review_count: 'marked_for_review_count',
  auto_score: 'auto_score',
  auto_correct: 'auto_correct',
  auto_incorrect: 'auto_incorrect',
  status: 'status',
  evaluation_mode: 'evaluation_mode',
  evaluator_id: 'evaluator_id',
  evaluation_started_at: 'evaluation_started_at',
  evaluation_completed_at: 'evaluation_completed_at',
  evaluation_error: 'evaluation_error',
  session_tab_switches: 'session_tab_switches',
  session_window_blur: 'session_window_blur',
  session_network_disconnects: 'session_network_disconnects',
  session_suspicious_activity: 'session_suspicious_activity',
  created_by: 'created_by',
  updated_by: 'updated_by',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Exam_questionsScalarFieldEnum = {
  exam_question_id: 'exam_question_id',
  exam_id: 'exam_id',
  question_id: 'question_id',
  order_index: 'order_index',
  is_mandatory: 'is_mandatory',
  time_limit_seconds: 'time_limit_seconds',
  marks: 'marks',
  negative_marks: 'negative_marks',
  points_weight: 'points_weight',
  show_explanation_on_submit: 'show_explanation_on_submit',
  cloned_from_question_id: 'cloned_from_question_id',
  cloned_at: 'cloned_at',
  cloned_by: 'cloned_by',
  expected_time_seconds: 'expected_time_seconds',
  tag_snapshot: 'tag_snapshot',
  is_active: 'is_active',
  remarks: 'remarks',
  created_by: 'created_by',
  created_at: 'created_at',
  updated_by: 'updated_by',
  updated_at: 'updated_at'
};

exports.Prisma.Exam_resultsScalarFieldEnum = {
  result_id: 'result_id',
  attempt_id: 'attempt_id',
  exam_id: 'exam_id',
  user_id: 'user_id',
  exam_session_id: 'exam_session_id',
  submitted_at: 'submitted_at',
  evaluated_at: 'evaluated_at',
  total_score: 'total_score',
  achieved_score: 'achieved_score',
  percentage: 'percentage',
  accuracy: 'accuracy',
  total_questions: 'total_questions',
  correct_answers: 'correct_answers',
  incorrect_answers: 'incorrect_answers',
  skipped_questions: 'skipped_questions',
  marked_for_review: 'marked_for_review',
  evaluation_mode: 'evaluation_mode',
  evaluated_by: 'evaluated_by',
  evaluation_notes: 'evaluation_notes',
  trust_score: 'trust_score',
  cheat_flag: 'cheat_flag',
  anti_cheat_reviewed_by: 'anti_cheat_reviewed_by',
  anti_cheat_reviewed_at: 'anti_cheat_reviewed_at',
  anti_cheat_notes: 'anti_cheat_notes',
  status: 'status',
  remarks: 'remarks',
  created_by: 'created_by',
  created_at: 'created_at',
  updated_by: 'updated_by',
  updated_at: 'updated_at'
};

exports.Prisma.Exam_sessionsScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  exam_id: 'exam_id',
  take: 'take',
  status: 'status',
  time_elapsed_seconds: 'time_elapsed_seconds',
  start_time: 'start_time',
  end_time: 'end_time',
  last_activity_at: 'last_activity_at',
  ip_address: 'ip_address',
  device_id: 'device_id',
  browser_info: 'browser_info',
  user_agent: 'user_agent',
  geo_location: 'geo_location',
  tab_switch_count: 'tab_switch_count',
  window_blur_events: 'window_blur_events',
  network_disconnects: 'network_disconnects',
  webcam_enabled: 'webcam_enabled',
  suspicious_activity: 'suspicious_activity',
  flagged_reason: 'flagged_reason',
  last_known_total_answered: 'last_known_total_answered',
  last_known_correct: 'last_known_correct',
  created_by: 'created_by',
  updated_by: 'updated_by',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.ExamsScalarFieldEnum = {
  exam_id: 'exam_id',
  certification_id: 'certification_id',
  exam_type: 'exam_type',
  exam_title: 'exam_title',
  duration_minutes: 'duration_minutes',
  total_marks: 'total_marks',
  total_questions: 'total_questions',
  instructions: 'instructions',
  created_from_exam_id: 'created_from_exam_id',
  status: 'status',
  is_randomized: 'is_randomized',
  created_by: 'created_by',
  created_at: 'created_at',
  updated_by: 'updated_by',
  updated_at: 'updated_at',
  created_from_user_id: 'created_from_user_id',
  custom_filters: 'custom_filters'
};

exports.Prisma.FavoritesScalarFieldEnum = {
  favorite_id: 'favorite_id',
  user_id: 'user_id',
  entity_type: 'entity_type',
  entity_id: 'entity_id',
  added_at: 'added_at'
};

exports.Prisma.File_uploadsScalarFieldEnum = {
  file_id: 'file_id',
  file_name: 'file_name',
  file_path: 'file_path',
  alt_text: 'alt_text',
  file_type: 'file_type',
  file_size: 'file_size',
  checksum: 'checksum',
  is_public: 'is_public',
  storage_provider: 'storage_provider',
  status: 'status',
  created_at: 'created_at',
  updated_at: 'updated_at',
  uploaded_by: 'uploaded_by',
  updated_by: 'updated_by'
};

exports.Prisma.Footer_linksScalarFieldEnum = {
  footer_id: 'footer_id',
  column_name: 'column_name',
  display_order_column_name: 'display_order_column_name',
  link_text: 'link_text',
  internal_page: 'internal_page',
  external_url: 'external_url',
  display_order_link_text: 'display_order_link_text',
  is_active: 'is_active',
  created_at: 'created_at',
  created_by: 'created_by',
  updated_at: 'updated_at',
  updated_by: 'updated_by'
};

exports.Prisma.MenusScalarFieldEnum = {
  menu_id: 'menu_id',
  menu_name: 'menu_name',
  menu_slug: 'menu_slug',
  display_order: 'display_order',
  is_active: 'is_active',
  created_at: 'created_at',
  created_by: 'created_by',
  updated_at: 'updated_at',
  updated_by: 'updated_by'
};

exports.Prisma.Mock_interview_applicationsScalarFieldEnum = {
  application_id: 'application_id',
  full_name: 'full_name',
  email: 'email',
  contact_number: 'contact_number',
  whatsapp_number: 'whatsapp_number',
  current_location: 'current_location',
  interview_type: 'interview_type',
  certification_name: 'certification_name',
  tech_stack: 'tech_stack',
  duration_minutes: 'duration_minutes',
  price: 'price',
  first_scheduled_date: 'first_scheduled_date',
  first_scheduled_time: 'first_scheduled_time',
  second_scheduled_date: 'second_scheduled_date',
  second_scheduled_time: 'second_scheduled_time',
  third_scheduled_date: 'third_scheduled_date',
  third_scheduled_time: 'third_scheduled_time',
  reschedule_count: 'reschedule_count',
  application_status: 'application_status',
  cancel_reason: 'cancel_reason',
  payment_status: 'payment_status',
  payment_mode: 'payment_mode',
  created_by: 'created_by',
  created_at: 'created_at',
  updated_by: 'updated_by',
  updated_at: 'updated_at',
  is_active: 'is_active',
  deleted_flag: 'deleted_flag'
};

exports.Prisma.Mock_interview_pricingScalarFieldEnum = {
  pricing_id: 'pricing_id',
  duration_minutes: 'duration_minutes',
  price: 'price',
  effective_from: 'effective_from',
  is_active: 'is_active'
};

exports.Prisma.Otp_codesScalarFieldEnum = {
  otp_id: 'otp_id',
  user_id: 'user_id',
  email: 'email',
  otp_code: 'otp_code',
  purpose: 'purpose',
  is_used: 'is_used',
  reset_token: 'reset_token',
  token_created_at: 'token_created_at',
  expires_at: 'expires_at',
  created_at: 'created_at',
  created_by: 'created_by',
  updated_at: 'updated_at',
  updated_by: 'updated_by'
};

exports.Prisma.PagesScalarFieldEnum = {
  page_id: 'page_id',
  template_id: 'template_id',
  title: 'title',
  slug: 'slug',
  meta_title: 'meta_title',
  meta_description: 'meta_description',
  tags: 'tags',
  description: 'description',
  image_url: 'image_url',
  status: 'status',
  published_at: 'published_at',
  unpublished_at: 'unpublished_at',
  created_by: 'created_by',
  updated_by: 'updated_by',
  created_at: 'created_at',
  updated_at: 'updated_at',
  has_sections: 'has_sections',
  use_common_footer: 'use_common_footer',
  use_common_header: 'use_common_header'
};

exports.Prisma.Promotion_barScalarFieldEnum = {
  promotion_id: 'promotion_id',
  promotion_text: 'promotion_text',
  promotion_button_text: 'promotion_button_text',
  promotion_button_link: 'promotion_button_link',
  is_active: 'is_active',
  display_order: 'display_order',
  start_date: 'start_date',
  end_date: 'end_date',
  background_color: 'background_color',
  text_color: 'text_color',
  created_by: 'created_by',
  updated_by: 'updated_by',
  created_at: 'created_at',
  updated_at: 'updated_at',
  remarks: 'remarks'
};

exports.Prisma.ProvidersScalarFieldEnum = {
  provider_id: 'provider_id',
  provider_name: 'provider_name',
  description: 'description',
  logo_path: 'logo_path',
  website_url: 'website_url',
  available_certification_level: 'available_certification_level',
  status: 'status',
  created_by: 'created_by',
  updated_by: 'updated_by',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.QuestionsScalarFieldEnum = {
  question_id: 'question_id',
  parent_question_id: 'parent_question_id',
  created_from_exam_id: 'created_from_exam_id',
  batch_id: 'batch_id',
  create_type: 'create_type',
  csv_serial_no: 'csv_serial_no',
  csv_exam_type: 'csv_exam_type',
  provider_id: 'provider_id',
  provider_name: 'provider_name',
  certification_id: 'certification_id',
  certification_name: 'certification_name',
  exam_type: 'exam_type',
  question_text: 'question_text',
  option_a: 'option_a',
  option_b: 'option_b',
  option_c: 'option_c',
  option_d: 'option_d',
  option_e: 'option_e',
  option_f: 'option_f',
  question_type: 'question_type',
  correct_options: 'correct_options',
  correct_explanation: 'correct_explanation',
  incorrect_explanation: 'incorrect_explanation',
  domain: 'domain',
  topic: 'topic',
  subtopic: 'subtopic',
  difficulty_level: 'difficulty_level',
  marks: 'marks',
  negative_marks: 'negative_marks',
  primary_tags: 'primary_tags',
  secondary_tags: 'secondary_tags',
  tertiary_tags: 'tertiary_tags',
  is_mandatory: 'is_mandatory',
  is_future: 'is_future',
  question_image_path: 'question_image_path',
  option_a_image_path: 'option_a_image_path',
  option_b_image_path: 'option_b_image_path',
  option_c_image_path: 'option_c_image_path',
  option_d_image_path: 'option_d_image_path',
  option_e_image_path: 'option_e_image_path',
  option_f_image_path: 'option_f_image_path',
  correct_explanation_image_path: 'correct_explanation_image_path',
  incorrect_explanation_image_path: 'incorrect_explanation_image_path',
  number_of_options: 'number_of_options',
  number_of_correct_options: 'number_of_correct_options',
  status: 'status',
  error_status: 'error_status',
  error_message: 'error_message',
  content_hash: 'content_hash',
  created_by: 'created_by',
  created_at: 'created_at',
  updated_by: 'updated_by',
  updated_at: 'updated_at'
};

exports.Prisma.Salary_augment_applicationsScalarFieldEnum = {
  application_id: 'application_id',
  full_name: 'full_name',
  email: 'email',
  contact_number: 'contact_number',
  whatsapp_number: 'whatsapp_number',
  current_location: 'current_location',
  current_job_title: 'current_job_title',
  current_industry: 'current_industry',
  years_of_experience: 'years_of_experience',
  desired_career_path: 'desired_career_path',
  target_cloud_platform: 'target_cloud_platform',
  self_description: 'self_description',
  preferred_contact_mode: 'preferred_contact_mode',
  preferred_contact_time: 'preferred_contact_time',
  linkedin_url: 'linkedin_url',
  resume_file_path: 'resume_file_path',
  application_status: 'application_status',
  created_by: 'created_by',
  created_at: 'created_at',
  updated_by: 'updated_by',
  updated_at: 'updated_at',
  is_active: 'is_active',
  deleted_flag: 'deleted_flag'
};

exports.Prisma.SectionsScalarFieldEnum = {
  section_id: 'section_id',
  page_id: 'page_id',
  section_type: 'section_type',
  title: 'title',
  content: 'content',
  media_type: 'media_type',
  media_url: 'media_url',
  file_id: 'file_id',
  display_order: 'display_order',
  is_active: 'is_active',
  active_date: 'active_date',
  inactive_date: 'inactive_date',
  published_date: 'published_date',
  unpublished_date: 'unpublished_date',
  created_by: 'created_by',
  updated_by: 'updated_by',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Site_settingsScalarFieldEnum = {
  setting_id: 'setting_id',
  setting_key: 'setting_key',
  setting_value: 'setting_value',
  setting_type: 'setting_type',
  created_at: 'created_at',
  created_by: 'created_by',
  updated_at: 'updated_at',
  updated_by: 'updated_by'
};

exports.Prisma.SubmenusScalarFieldEnum = {
  submenu_id: 'submenu_id',
  menu_id: 'menu_id',
  parent_submenu_id: 'parent_submenu_id',
  submenu_title: 'submenu_title',
  submenu_slug: 'submenu_slug',
  link_url: 'link_url',
  page_id: 'page_id',
  display_order: 'display_order',
  is_active: 'is_active',
  created_at: 'created_at',
  created_by: 'created_by',
  updated_at: 'updated_at',
  updated_by: 'updated_by'
};

exports.Prisma.TemplatesScalarFieldEnum = {
  template_id: 'template_id',
  template_name: 'template_name',
  template_code: 'template_code',
  description: 'description',
  is_active: 'is_active',
  created_at: 'created_at',
  created_by: 'created_by',
  updated_at: 'updated_at',
  updated_by: 'updated_by'
};

exports.Prisma.User_activityScalarFieldEnum = {
  activity_id: 'activity_id',
  user_id: 'user_id',
  session_id: 'session_id',
  is_guest: 'is_guest',
  event_type: 'event_type',
  page_url: 'page_url',
  referrer_url: 'referrer_url',
  device_type: 'device_type',
  browser_name: 'browser_name',
  ip_address: 'ip_address',
  geo_country: 'geo_country',
  geo_city: 'geo_city',
  order_id: 'order_id',
  amount: 'amount',
  currency: 'currency',
  event_time: 'event_time',
  metadata: 'metadata',
  created_at: 'created_at'
};

exports.Prisma.User_profilesScalarFieldEnum = {
  profile_id: 'profile_id',
  user_id: 'user_id',
  first_name: 'first_name',
  last_name: 'last_name',
  phone: 'phone',
  avatar_url: 'avatar_url',
  bio: 'bio',
  created_at: 'created_at',
  created_by: 'created_by',
  updated_at: 'updated_at',
  updated_by: 'updated_by'
};

exports.Prisma.User_settingsScalarFieldEnum = {
  setting_id: 'setting_id',
  user_id: 'user_id',
  setting_key: 'setting_key',
  setting_type: 'setting_type',
  setting_value: 'setting_value',
  created_at: 'created_at',
  created_by: 'created_by',
  updated_at: 'updated_at',
  updated_by: 'updated_by'
};

exports.Prisma.UsersScalarFieldEnum = {
  user_id: 'user_id',
  first_name: 'first_name',
  last_name: 'last_name',
  user_name: 'user_name',
  user_location: 'user_location',
  user_city: 'user_city',
  user_country: 'user_country',
  email: 'email',
  password_hash: 'password_hash',
  remember_me_token: 'remember_me_token',
  failed_login_attempts: 'failed_login_attempts',
  is_locked: 'is_locked',
  last_login: 'last_login',
  role: 'role',
  role_id: 'role_id',
  status_active: 'status_active',
  active_date: 'active_date',
  inactive_date: 'inactive_date',
  created_by: 'created_by',
  updated_by: 'updated_by',
  created_at: 'created_at',
  updated_at: 'updated_at',
  registration_method: 'registration_method',
  last_password_changed_at: 'last_password_changed_at'
};

exports.Prisma.Exam_answersScalarFieldEnum = {
  answer_id: 'answer_id',
  attempt_id: 'attempt_id',
  question_id: 'question_id',
  selected_options: 'selected_options',
  is_correct: 'is_correct',
  marks_obtained: 'marks_obtained',
  start_time: 'start_time',
  end_time: 'end_time',
  time_spent_seconds: 'time_spent_seconds',
  answered_at: 'answered_at',
  created_by: 'created_by',
  updated_by: 'updated_by',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Exam_domain_distributionScalarFieldEnum = {
  id: 'id',
  exam_id: 'exam_id',
  domain_name: 'domain_name',
  domain_code: 'domain_code',
  weightage_in_certification: 'weightage_in_certification',
  weightage_in_exam: 'weightage_in_exam',
  domain_total_questions: 'domain_total_questions',
  domain_total_marks: 'domain_total_marks',
  created_by: 'created_by',
  updated_by: 'updated_by',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Exam_result_domainsScalarFieldEnum = {
  id: 'id',
  attempt_id: 'attempt_id',
  exam_id: 'exam_id',
  user_id: 'user_id',
  domain_name: 'domain_name',
  domain_total_questions: 'domain_total_questions',
  domain_total_marks: 'domain_total_marks',
  domain_marks_obtained: 'domain_marks_obtained',
  domain_score_percent: 'domain_score_percent',
  created_by: 'created_by',
  updated_by: 'updated_by',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.MetadataValidationScalarFieldEnum = {
  MetadataValidationId: 'MetadataValidationId',
  TableName: 'TableName',
  ColumnName: 'ColumnName',
  DataType: 'DataType',
  LengthValue: 'LengthValue',
  IsNullable: 'IsNullable',
  EnumValues: 'EnumValues',
  IsPresentInCSV: 'IsPresentInCSV',
  CreatedBy: 'CreatedBy',
  CreatedAt: 'CreatedAt',
  UpdatedBy: 'UpdatedBy',
  UpdatedAt: 'UpdatedAt'
};

exports.Prisma.Blog_commentsScalarFieldEnum = {
  comment_id: 'comment_id',
  blog_id: 'blog_id',
  parent_comment_id: 'parent_comment_id',
  user_id: 'user_id',
  user_name: 'user_name',
  user_email: 'user_email',
  comment_text: 'comment_text',
  likes_count: 'likes_count',
  replies_count: 'replies_count',
  status: 'status',
  commenter_ip: 'commenter_ip',
  user_agent: 'user_agent',
  created_at: 'created_at',
  updated_at: 'updated_at',
  created_by: 'created_by',
  updated_by: 'updated_by'
};

exports.Prisma.Csv_column_headersScalarFieldEnum = {
  CsvHeaderId: 'CsvHeaderId',
  ColName: 'ColName',
  data_type: 'data_type',
  Description: 'Description',
  CreatedBy: 'CreatedBy',
  CreatedAt: 'CreatedAt',
  UpdatedBy: 'UpdatedBy',
  UpdatedAt: 'UpdatedAt'
};

exports.Prisma.Cart_itemsScalarFieldEnum = {
  cart_item_id: 'cart_item_id',
  cart_id: 'cart_id',
  certification_id: 'certification_id',
  product_type: 'product_type',
  quantity: 'quantity',
  created_at: 'created_at',
  created_by: 'created_by',
  updated_at: 'updated_at',
  updated_by: 'updated_by'
};

exports.Prisma.CartsScalarFieldEnum = {
  cart_id: 'cart_id',
  user_id: 'user_id',
  coupon_id: 'coupon_id',
  status: 'status',
  ip_address: 'ip_address',
  user_agent: 'user_agent',
  geo_location: 'geo_location',
  created_at: 'created_at',
  created_by: 'created_by',
  updated_at: 'updated_at',
  updated_by: 'updated_by'
};

exports.Prisma.CouponsScalarFieldEnum = {
  coupon_id: 'coupon_id',
  code: 'code',
  discount_percentage: 'discount_percentage',
  max_discount_amount: 'max_discount_amount',
  valid_from: 'valid_from',
  valid_until: 'valid_until',
  usage_limit: 'usage_limit',
  times_used: 'times_used',
  is_active: 'is_active',
  created_at: 'created_at',
  created_by: 'created_by'
};

exports.Prisma.ModulesScalarFieldEnum = {
  module_id: 'module_id',
  module_name: 'module_name',
  slug: 'slug',
  description: 'description',
  is_protected: 'is_protected',
  created_by: 'created_by',
  updated_by: 'updated_by',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.NotificationsScalarFieldEnum = {
  notification_id: 'notification_id',
  user_id: 'user_id',
  source_type: 'source_type',
  source_id: 'source_id',
  notification_type: 'notification_type',
  status: 'status',
  message: 'message',
  created_at: 'created_at',
  updated_at: 'updated_at',
  resolved_at: 'resolved_at',
  dismissed_at: 'dismissed_at',
  expires_at: 'expires_at'
};

exports.Prisma.Order_itemsScalarFieldEnum = {
  order_item_id: 'order_item_id',
  order_id: 'order_id',
  certification_id: 'certification_id',
  product_type: 'product_type',
  price_at_purchase: 'price_at_purchase',
  created_at: 'created_at',
  created_by: 'created_by',
  updated_at: 'updated_at',
  updated_by: 'updated_by'
};

exports.Prisma.OrdersScalarFieldEnum = {
  order_id: 'order_id',
  user_id: 'user_id',
  coupon_id: 'coupon_id',
  subtotal_amount: 'subtotal_amount',
  discount_amount: 'discount_amount',
  total_amount: 'total_amount',
  currency: 'currency',
  status: 'status',
  source: 'source',
  ip_address: 'ip_address',
  user_agent: 'user_agent',
  created_at: 'created_at',
  created_by: 'created_by',
  updated_at: 'updated_at',
  updated_by: 'updated_by'
};

exports.Prisma.RefundsScalarFieldEnum = {
  refund_id: 'refund_id',
  transaction_id: 'transaction_id',
  razorpay_refund_id: 'razorpay_refund_id',
  amount: 'amount',
  status: 'status',
  reason: 'reason',
  created_by: 'created_by',
  created_at: 'created_at',
  updated_at: 'updated_at',
  updated_by: 'updated_by'
};

exports.Prisma.Role_module_defaultScalarFieldEnum = {
  rmd_id: 'rmd_id',
  role_id: 'role_id',
  module_id: 'module_id',
  can_access: 'can_access',
  created_by: 'created_by',
  updated_by: 'updated_by',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.RolesScalarFieldEnum = {
  role_id: 'role_id',
  role_name: 'role_name',
  slug: 'slug',
  description: 'description',
  is_protected: 'is_protected',
  created_by: 'created_by',
  updated_by: 'updated_by',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.TransactionsScalarFieldEnum = {
  transaction_id: 'transaction_id',
  order_id: 'order_id',
  razorpay_order_id: 'razorpay_order_id',
  razorpay_payment_id: 'razorpay_payment_id',
  razorpay_signature: 'razorpay_signature',
  amount: 'amount',
  status: 'status',
  method: 'method',
  error_code: 'error_code',
  error_description: 'error_description',
  created_at: 'created_at',
  created_by: 'created_by',
  updated_at: 'updated_at',
  updated_by: 'updated_by'
};

exports.Prisma.User_enrollmentsScalarFieldEnum = {
  enrollment_id: 'enrollment_id',
  user_id: 'user_id',
  certification_id: 'certification_id',
  access_type: 'access_type',
  valid_from: 'valid_from',
  valid_until: 'valid_until',
  is_active: 'is_active',
  linked_order_id: 'linked_order_id',
  created_at: 'created_at',
  created_by: 'created_by',
  updated_at: 'updated_at',
  updated_by: 'updated_by'
};

exports.Prisma.User_role_moduleScalarFieldEnum = {
  ur_id: 'ur_id',
  user_id: 'user_id',
  role_id: 'role_id',
  module_id: 'module_id',
  created_by: 'created_by',
  updated_by: 'updated_by',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Webhook_logsScalarFieldEnum = {
  log_id: 'log_id',
  event_id: 'event_id',
  event_type: 'event_type',
  payload: 'payload',
  is_processed: 'is_processed',
  created_at: 'created_at',
  created_by: 'created_by',
  updated_at: 'updated_at',
  updated_by: 'updated_by'
};

exports.Prisma.Cms_submenusScalarFieldEnum = {
  submenu_id: 'submenu_id',
  menu_id: 'menu_id',
  title: 'title',
  link: 'link',
  display_order: 'display_order',
  is_active: 'is_active',
  created_at: 'created_at',
  created_by: 'created_by',
  updated_at: 'updated_at',
  updated_by: 'updated_by'
};

exports.Prisma.User_audit_logScalarFieldEnum = {
  audit_id: 'audit_id',
  user_id: 'user_id',
  action_type: 'action_type',
  performed_by: 'performed_by',
  ip_address: 'ip_address',
  old_value: 'old_value',
  new_value: 'new_value',
  created_at: 'created_at'
};

exports.Prisma.User_sessionsScalarFieldEnum = {
  session_id: 'session_id',
  user_id: 'user_id',
  is_guest: 'is_guest',
  auth_method: 'auth_method',
  login_time: 'login_time',
  logout_time: 'logout_time',
  last_seen_at: 'last_seen_at',
  ip_address: 'ip_address',
  geo_country: 'geo_country',
  geo_city: 'geo_city',
  created_at: 'created_at'
};

exports.Prisma.PositionsScalarFieldEnum = {
  position_id: 'position_id',
  position_title: 'position_title',
  description: 'description',
  responsibilities: 'responsibilities',
  terms_conditions: 'terms_conditions',
  base_document_path: 'base_document_path',
  status: 'status',
  remarks: 'remarks',
  created_at: 'created_at',
  created_by: 'created_by',
  updated_at: 'updated_at',
  updated_by: 'updated_by'
};

exports.Prisma.AppointmentsScalarFieldEnum = {
  appointment_id: 'appointment_id',
  enrollment_id: 'enrollment_id',
  user_id: 'user_id',
  full_name: 'full_name',
  email: 'email',
  mobile_number: 'mobile_number',
  entity_name: 'entity_name',
  city: 'city',
  state: 'state',
  country: 'country',
  start_date: 'start_date',
  end_date: 'end_date',
  work_type: 'work_type',
  working_hrs_per_week: 'working_hrs_per_week',
  intern_summary: 'intern_summary',
  enrollment_proof_url: 'enrollment_proof_url',
  payment_status: 'payment_status',
  position_id: 'position_id',
  position_title: 'position_title',
  offer_letter_location_url: 'offer_letter_location_url',
  terms_accepted: 'terms_accepted',
  status: 'status',
  admin_comment: 'admin_comment',
  email_sent: 'email_sent',
  email_sent_at: 'email_sent_at',
  created_at: 'created_at',
  created_by: 'created_by',
  updated_at: 'updated_at',
  updated_by: 'updated_by'
};

exports.Prisma.Sequence_tableScalarFieldEnum = {
  sequence_id: 'sequence_id',
  year: 'year',
  category: 'category',
  seq_value: 'seq_value'
};

exports.Prisma.RelievingsScalarFieldEnum = {
  relieving_id: 'relieving_id',
  user_id: 'user_id',
  appointment_id: 'appointment_id',
  position_id: 'position_id',
  full_name: 'full_name',
  position_title: 'position_title',
  start_date: 'start_date',
  end_date: 'end_date',
  city: 'city',
  state: 'state',
  country: 'country',
  relieving_reason: 'relieving_reason',
  remarks: 'remarks',
  is_recommended: 'is_recommended',
  relieving_letter_location_url: 'relieving_letter_location_url',
  status: 'status',
  admin_signed_time: 'admin_signed_time',
  email_sent: 'email_sent',
  email_sent_at: 'email_sent_at',
  created_at: 'created_at',
  created_by: 'created_by',
  updated_at: 'updated_at',
  updated_by: 'updated_by'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.auth_tokens_token_type = exports.$Enums.auth_tokens_token_type = {
  ACCESS: 'ACCESS',
  REFRESH: 'REFRESH',
  API_KEY: 'API_KEY'
};

exports.batches_batch_source = exports.$Enums.batches_batch_source = {
  CSV_UPLOAD: 'CSV_UPLOAD',
  EXAM_CLONE: 'EXAM_CLONE'
};

exports.batches_batch_status = exports.$Enums.batches_batch_status = {
  Submitted: 'Submitted',
  Approved: 'Approved'
};

exports.blog_posts_intro_layout = exports.$Enums.blog_posts_intro_layout = {
  LEFT_IMAGE_RIGHT_TEXT: 'LEFT_IMAGE_RIGHT_TEXT',
  RIGHT_IMAGE_LEFT_TEXT: 'RIGHT_IMAGE_LEFT_TEXT',
  TEXT_ONLY: 'TEXT_ONLY'
};

exports.blog_posts_main_layout = exports.$Enums.blog_posts_main_layout = {
  LEFT_IMAGE_RIGHT_TEXT: 'LEFT_IMAGE_RIGHT_TEXT',
  RIGHT_IMAGE_LEFT_TEXT: 'RIGHT_IMAGE_LEFT_TEXT',
  TEXT_ONLY: 'TEXT_ONLY'
};

exports.blog_posts_middle_layout = exports.$Enums.blog_posts_middle_layout = {
  LEFT_IMAGE_RIGHT_TEXT: 'LEFT_IMAGE_RIGHT_TEXT',
  RIGHT_IMAGE_LEFT_TEXT: 'RIGHT_IMAGE_LEFT_TEXT',
  TEXT_ONLY: 'TEXT_ONLY'
};

exports.blog_posts_conclusion_layout = exports.$Enums.blog_posts_conclusion_layout = {
  LEFT_IMAGE_RIGHT_TEXT: 'LEFT_IMAGE_RIGHT_TEXT',
  RIGHT_IMAGE_LEFT_TEXT: 'RIGHT_IMAGE_LEFT_TEXT',
  TEXT_ONLY: 'TEXT_ONLY'
};

exports.blog_posts_status = exports.$Enums.blog_posts_status = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED'
};

exports.certification_status_active = exports.$Enums.certification_status_active = {
  active: 'active',
  inactive: 'inactive'
};

exports.certification_review_review_type = exports.$Enums.certification_review_review_type = {
  practice_test: 'practice_test',
  final_test: 'final_test',
  practice_final: 'practice_final'
};

exports.certification_review_status = exports.$Enums.certification_review_status = {
  active: 'active',
  inactive: 'inactive'
};

exports.certification_verification_result = exports.$Enums.certification_verification_result = {
  PASS: 'PASS',
  FAIL: 'FAIL'
};

exports.certification_verification_paid_type = exports.$Enums.certification_verification_paid_type = {
  PAID: 'PAID',
  UNPAID: 'UNPAID'
};

exports.certification_verification_certification_status = exports.$Enums.certification_verification_certification_status = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
};

exports.certification_verification_verification_status = exports.$Enums.certification_verification_verification_status = {
  PENDING: 'PENDING',
  VERIFIED: 'VERIFIED',
  EXPIRED: 'EXPIRED',
  REVOKED: 'REVOKED'
};

exports.contact_messages_subject_type = exports.$Enums.contact_messages_subject_type = {
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
  ACCOUNT_BLOCKED: 'ACCOUNT_BLOCKED',
  REFUND: 'REFUND',
  TECHNICAL_ERROR: 'TECHNICAL_ERROR',
  ORDER_ISSUES: 'ORDER_ISSUES',
  COURSE_ISSUES: 'COURSE_ISSUES',
  EXAM_ISSUES: 'EXAM_ISSUES',
  COURSE_DISCOUNT: 'COURSE_DISCOUNT',
  FEEDBACK: 'FEEDBACK',
  OTHER: 'OTHER'
};

exports.course_resources_resource_type = exports.$Enums.course_resources_resource_type = {
  video: 'video',
  pdf: 'pdf',
  exam: 'exam'
};

exports.courses_status_active = exports.$Enums.courses_status_active = {
  active: 'active',
  inactive: 'inactive'
};

exports.courses_status_publish = exports.$Enums.courses_status_publish = {
  published: 'published',
  unpublished: 'unpublished'
};

exports.employee_verification_employment_type = exports.$Enums.employee_verification_employment_type = {
  FULL_TIME: 'FULL_TIME',
  PART_TIME: 'PART_TIME',
  CONTRACTOR: 'CONTRACTOR',
  INTERN: 'INTERN'
};

exports.employee_verification_payment_status = exports.$Enums.employee_verification_payment_status = {
  PAID: 'PAID',
  UNPAID: 'UNPAID'
};

exports.employee_verification_is_recommended = exports.$Enums.employee_verification_is_recommended = {
  YES: 'YES',
  NO: 'NO'
};

exports.exam_anti_cheat_logs_event_type = exports.$Enums.exam_anti_cheat_logs_event_type = {
  tab_switch: 'tab_switch',
  window_blur: 'window_blur',
  copy_paste_attempt: 'copy_paste_attempt',
  screenshot_attempt: 'screenshot_attempt',
  network_disconnect: 'network_disconnect',
  webcam_disabled: 'webcam_disabled',
  webcam_multiple_faces: 'webcam_multiple_faces',
  ai_flagged_suspicion: 'ai_flagged_suspicion',
  unauthorized_app_detected: 'unauthorized_app_detected',
  clipboard_activity: 'clipboard_activity'
};

exports.exam_anti_cheat_logs_severity = exports.$Enums.exam_anti_cheat_logs_severity = {
  low: 'low',
  medium: 'medium',
  high: 'high',
  critical: 'critical'
};

exports.exam_anti_cheat_logs_detected_by = exports.$Enums.exam_anti_cheat_logs_detected_by = {
  client: 'client',
  server: 'server',
  ai_model: 'ai_model',
  proctor: 'proctor'
};

exports.exam_attempts_status = exports.$Enums.exam_attempts_status = {
  queued: 'queued',
  evaluating: 'evaluating',
  evaluated: 'evaluated',
  error: 'error'
};

exports.exam_attempts_evaluation_mode = exports.$Enums.exam_attempts_evaluation_mode = {
  auto: 'auto',
  manual: 'manual',
  hybrid: 'hybrid'
};

exports.exam_attempts_session_suspicious_activity = exports.$Enums.exam_attempts_session_suspicious_activity = {
  none: 'none',
  minor: 'minor',
  major: 'major',
  critical: 'critical'
};

exports.exam_results_evaluation_mode = exports.$Enums.exam_results_evaluation_mode = {
  auto: 'auto',
  manual: 'manual',
  hybrid: 'hybrid'
};

exports.exam_results_cheat_flag = exports.$Enums.exam_results_cheat_flag = {
  none: 'none',
  suspected: 'suspected',
  confirmed: 'confirmed'
};

exports.exam_results_status = exports.$Enums.exam_results_status = {
  finalized: 'finalized',
  revoked: 'revoked'
};

exports.exam_sessions_status = exports.$Enums.exam_sessions_status = {
  IN_PROGRESS: 'IN_PROGRESS',
  SUBMITTED: 'SUBMITTED',
  TIMEOUT: 'TIMEOUT',
  FLAGGED: 'FLAGGED'
};

exports.exam_sessions_suspicious_activity = exports.$Enums.exam_sessions_suspicious_activity = {
  none: 'none',
  minor: 'minor',
  major: 'major',
  critical: 'critical'
};

exports.exams_exam_type = exports.$Enums.exams_exam_type = {
  mock: 'mock',
  practice: 'practice',
  final: 'final',
  custom: 'custom'
};

exports.exams_status = exports.$Enums.exams_status = {
  Active: 'Active',
  Inactive: 'Inactive'
};

exports.favorites_entity_type = exports.$Enums.favorites_entity_type = {
  PAGE: 'PAGE',
  COMPONENT: 'COMPONENT',
  MENU: 'MENU',
  BLOG_POST: 'BLOG_POST',
  LEGAL: 'LEGAL'
};

exports.file_uploads_storage_provider = exports.$Enums.file_uploads_storage_provider = {
  LOCAL: 'LOCAL',
  AZURE_BLOB: 'AZURE_BLOB',
  AWS_S3: 'AWS_S3',
  GCS: 'GCS'
};

exports.file_uploads_status = exports.$Enums.file_uploads_status = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  DELETED: 'DELETED'
};

exports.mock_interview_applications_interview_type = exports.$Enums.mock_interview_applications_interview_type = {
  Certification: 'Certification',
  Client: 'Client'
};

exports.mock_interview_applications_duration_minutes = exports.$Enums.mock_interview_applications_duration_minutes = {
  MIN_30: 'MIN_30',
  MIN_45: 'MIN_45',
  MIN_60: 'MIN_60'
};

exports.mock_interview_applications_application_status = exports.$Enums.mock_interview_applications_application_status = {
  Submitted: 'Submitted',
  Scheduled: 'Scheduled',
  Rescheduled: 'Rescheduled',
  Completed: 'Completed',
  Cancelled: 'Cancelled'
};

exports.mock_interview_applications_payment_status = exports.$Enums.mock_interview_applications_payment_status = {
  Pending: 'Pending',
  Completed: 'Completed',
  Failed: 'Failed',
  Refund_Initiated: 'Refund_Initiated',
  Refund: 'Refund'
};

exports.mock_interview_applications_payment_mode = exports.$Enums.mock_interview_applications_payment_mode = {
  Online: 'Online',
  Offline: 'Offline'
};

exports.mock_interview_pricing_duration_minutes = exports.$Enums.mock_interview_pricing_duration_minutes = {
  MIN_30: 'MIN_30',
  MIN_45: 'MIN_45',
  MIN_60: 'MIN_60'
};

exports.otp_codes_purpose = exports.$Enums.otp_codes_purpose = {
  LOGIN: 'LOGIN',
  RESET: 'RESET',
  VERIFY_EMAIL: 'VERIFY_EMAIL'
};

exports.pages_status = exports.$Enums.pages_status = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  UNPUBLISHED: 'UNPUBLISHED'
};

exports.providers_status = exports.$Enums.providers_status = {
  active: 'active',
  inactive: 'inactive'
};

exports.questions_create_type = exports.$Enums.questions_create_type = {
  BULK_CSV: 'BULK_CSV',
  MANUAL: 'MANUAL',
  FROM_EXAM: 'FROM_EXAM'
};

exports.questions_question_type = exports.$Enums.questions_question_type = {
  single_choice: 'single_choice',
  multiple_choice: 'multiple_choice',
  true_false: 'true_false',
  drag_and_drop: 'drag_and_drop'
};

exports.questions_status = exports.$Enums.questions_status = {
  Active: 'Active',
  Inactive: 'Inactive'
};

exports.salary_augment_applications_current_industry = exports.$Enums.salary_augment_applications_current_industry = {
  IT: 'IT',
  Non_IT: 'Non_IT',
  Education: 'Education',
  Healthcare: 'Healthcare',
  Finance: 'Finance',
  Manufacturing: 'Manufacturing',
  Others: 'Others'
};

exports.salary_augment_applications_years_of_experience = exports.$Enums.salary_augment_applications_years_of_experience = {
  LESS_THAN_ONE: 'LESS_THAN_ONE',
  ONE_TO_THREE: 'ONE_TO_THREE',
  THREE_TO_FIVE: 'THREE_TO_FIVE',
  FIVE_TO_TEN: 'FIVE_TO_TEN',
  TEN_PLUS: 'TEN_PLUS'
};

exports.salary_augment_applications_desired_career_path = exports.$Enums.salary_augment_applications_desired_career_path = {
  Cloud_Computing: 'Cloud_Computing',
  DevOps: 'DevOps',
  Data_Engineering: 'Data_Engineering',
  AI_ML: 'AI_ML',
  Others: 'Others'
};

exports.salary_augment_applications_preferred_contact_mode = exports.$Enums.salary_augment_applications_preferred_contact_mode = {
  Email: 'Email',
  Phone: 'Phone',
  WhatsApp: 'WhatsApp'
};

exports.salary_augment_applications_preferred_contact_time = exports.$Enums.salary_augment_applications_preferred_contact_time = {
  Morning: 'Morning',
  Afternoon: 'Afternoon',
  Evening: 'Evening'
};

exports.salary_augment_applications_application_status = exports.$Enums.salary_augment_applications_application_status = {
  Submitted: 'Submitted',
  In_Review: 'In_Review',
  Shortlisted: 'Shortlisted',
  Rejected: 'Rejected',
  Completed: 'Completed'
};

exports.sections_section_type = exports.$Enums.sections_section_type = {
  HERO: 'HERO',
  MIDDLE: 'MIDDLE',
  SIDEBAR_LEFT: 'SIDEBAR_LEFT',
  SIDEBAR_RIGHT: 'SIDEBAR_RIGHT',
  FOOTER: 'FOOTER',
  BANNER: 'BANNER',
  BLOG_POST: 'BLOG_POST',
  FAQ_ITEM: 'FAQ_ITEM',
  LEGAL_ITEM: 'LEGAL_ITEM'
};

exports.sections_media_type = exports.$Enums.sections_media_type = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  PDF: 'PDF',
  CHEATSHEET: 'CHEATSHEET',
  PPT: 'PPT',
  MOCK_TEST: 'MOCK_TEST'
};

exports.site_settings_setting_type = exports.$Enums.site_settings_setting_type = {
  STRING: 'STRING',
  NUMBER: 'NUMBER',
  BOOLEAN: 'BOOLEAN',
  JSON: 'JSON'
};

exports.user_activity_event_type = exports.$Enums.user_activity_event_type = {
  login_success: 'login_success',
  login_failed: 'login_failed',
  logout: 'logout',
  register_email: 'register_email',
  register_google: 'register_google',
  password_changed: 'password_changed',
  password_reset_request: 'password_reset_request',
  password_reset_success: 'password_reset_success',
  session_start: 'session_start',
  session_end: 'session_end',
  page_view: 'page_view',
  add_to_cart: 'add_to_cart',
  remove_from_cart: 'remove_from_cart',
  checkout_started: 'checkout_started',
  payment_initiated: 'payment_initiated',
  payment_success: 'payment_success',
  payment_failed: 'payment_failed',
  certification_view: 'certification_view',
  practice_test_start: 'practice_test_start',
  final_test_start: 'final_test_start',
  review_submitted: 'review_submitted',
  site_error: 'site_error'
};

exports.user_activity_device_type = exports.$Enums.user_activity_device_type = {
  desktop: 'desktop',
  mobile: 'mobile',
  tablet: 'tablet'
};

exports.user_settings_setting_type = exports.$Enums.user_settings_setting_type = {
  STRING: 'STRING',
  NUMBER: 'NUMBER',
  BOOLEAN: 'BOOLEAN',
  JSON: 'JSON'
};

exports.users_role = exports.$Enums.users_role = {
  subscriber: 'subscriber',
  instructor: 'instructor',
  admin: 'admin'
};

exports.users_status_active = exports.$Enums.users_status_active = {
  active: 'active',
  inactive: 'inactive'
};

exports.users_registration_method = exports.$Enums.users_registration_method = {
  email: 'email',
  google: 'google'
};

exports.MetadataValidation_IsNullable = exports.$Enums.MetadataValidation_IsNullable = {
  YES: 'YES',
  NO: 'NO'
};

exports.MetadataValidation_IsPresentInCSV = exports.$Enums.MetadataValidation_IsPresentInCSV = {
  YES: 'YES',
  NO: 'NO'
};

exports.blog_comments_status = exports.$Enums.blog_comments_status = {
  VISIBLE: 'VISIBLE',
  PENDING: 'PENDING',
  REJECTED: 'REJECTED',
  BLOCKED: 'BLOCKED',
  DELETED: 'DELETED'
};

exports.cart_items_product_type = exports.$Enums.cart_items_product_type = {
  MOCK: 'MOCK',
  PRACTICE: 'PRACTICE',
  FINAL: 'FINAL',
  BUNDLE: 'BUNDLE'
};

exports.carts_status = exports.$Enums.carts_status = {
  ACTIVE: 'ACTIVE',
  ABANDONED: 'ABANDONED',
  ORDERED: 'ORDERED'
};

exports.notifications_source_type = exports.$Enums.notifications_source_type = {
  EXAM_SESSIONS: 'EXAM_SESSIONS',
  TRANSACTIONS: 'TRANSACTIONS',
  CARTS: 'CARTS'
};

exports.notifications_notification_type = exports.$Enums.notifications_notification_type = {
  EXAM_IN_PROGRESS: 'EXAM_IN_PROGRESS',
  EXAM_ABANDONED: 'EXAM_ABANDONED',
  PAYMENT_FAILED: 'PAYMENT_FAILED',
  PAYMENT_SUCCESS: 'PAYMENT_SUCCESS',
  CART_ABANDONED: 'CART_ABANDONED'
};

exports.notifications_status = exports.$Enums.notifications_status = {
  UNREAD: 'UNREAD',
  READ: 'READ',
  RESOLVED: 'RESOLVED',
  DISMISSED: 'DISMISSED'
};

exports.order_items_product_type = exports.$Enums.order_items_product_type = {
  MOCK: 'MOCK',
  PRACTICE: 'PRACTICE',
  FINAL: 'FINAL',
  BUNDLE: 'BUNDLE'
};

exports.orders_status = exports.$Enums.orders_status = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
  CANCELLED: 'CANCELLED'
};

exports.orders_source = exports.$Enums.orders_source = {
  WEB: 'WEB',
  MOBILE: 'MOBILE',
  ADMIN: 'ADMIN'
};

exports.transactions_status = exports.$Enums.transactions_status = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED'
};

exports.user_enrollments_access_type = exports.$Enums.user_enrollments_access_type = {
  MOCK: 'MOCK',
  PRACTICE: 'PRACTICE',
  FINAL: 'FINAL',
  BUNDLE: 'BUNDLE'
};

exports.user_audit_log_action_type = exports.$Enums.user_audit_log_action_type = {
  password_changed: 'password_changed',
  profile_updated: 'profile_updated',
  email_changed: 'email_changed',
  role_changed: 'role_changed',
  account_locked: 'account_locked',
  account_unlocked: 'account_unlocked'
};

exports.user_sessions_auth_method = exports.$Enums.user_sessions_auth_method = {
  email: 'email',
  google: 'google',
  guest: 'guest'
};

exports.positions_status = exports.$Enums.positions_status = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
};

exports.appointments_work_type = exports.$Enums.appointments_work_type = {
  ONSITE: 'ONSITE',
  REMOTE: 'REMOTE',
  HYBRID: 'HYBRID'
};

exports.appointments_payment_status = exports.$Enums.appointments_payment_status = {
  PAID: 'PAID',
  UNPAID: 'UNPAID'
};

exports.appointments_status = exports.$Enums.appointments_status = {
  DRAFT: 'DRAFT',
  SUBMITTED: 'SUBMITTED',
  VERIFIED: 'VERIFIED',
  OFFERED: 'OFFERED',
  ACTIVE: 'ACTIVE',
  RESUBMIT: 'RESUBMIT',
  CANCELLED: 'CANCELLED'
};

exports.relievings_relieving_reason = exports.$Enums.relievings_relieving_reason = {
  INTERNSHIP_COMPLETED: 'INTERNSHIP_COMPLETED',
  OTHER: 'OTHER'
};

exports.relievings_is_recommended = exports.$Enums.relievings_is_recommended = {
  YES: 'YES',
  NO: 'NO'
};

exports.relievings_status = exports.$Enums.relievings_status = {
  DRAFT: 'DRAFT',
  SUBMITTED: 'SUBMITTED',
  VERIFIED: 'VERIFIED',
  ISSUED: 'ISSUED'
};

exports.Prisma.ModelName = {
  auth_tokens: 'auth_tokens',
  batches: 'batches',
  blog_posts: 'blog_posts',
  certification: 'certification',
  certification_review: 'certification_review',
  certification_verification: 'certification_verification',
  contact_messages: 'contact_messages',
  course_resources: 'course_resources',
  courses: 'courses',
  email_verifications: 'email_verifications',
  employee_verification: 'employee_verification',
  exam_anti_cheat_logs: 'exam_anti_cheat_logs',
  exam_attempts: 'exam_attempts',
  exam_questions: 'exam_questions',
  exam_results: 'exam_results',
  exam_sessions: 'exam_sessions',
  exams: 'exams',
  favorites: 'favorites',
  file_uploads: 'file_uploads',
  footer_links: 'footer_links',
  menus: 'menus',
  mock_interview_applications: 'mock_interview_applications',
  mock_interview_pricing: 'mock_interview_pricing',
  otp_codes: 'otp_codes',
  pages: 'pages',
  promotion_bar: 'promotion_bar',
  providers: 'providers',
  questions: 'questions',
  salary_augment_applications: 'salary_augment_applications',
  sections: 'sections',
  site_settings: 'site_settings',
  submenus: 'submenus',
  templates: 'templates',
  user_activity: 'user_activity',
  user_profiles: 'user_profiles',
  user_settings: 'user_settings',
  users: 'users',
  exam_answers: 'exam_answers',
  exam_domain_distribution: 'exam_domain_distribution',
  exam_result_domains: 'exam_result_domains',
  MetadataValidation: 'MetadataValidation',
  blog_comments: 'blog_comments',
  csv_column_headers: 'csv_column_headers',
  cart_items: 'cart_items',
  carts: 'carts',
  coupons: 'coupons',
  modules: 'modules',
  notifications: 'notifications',
  order_items: 'order_items',
  orders: 'orders',
  refunds: 'refunds',
  role_module_default: 'role_module_default',
  roles: 'roles',
  transactions: 'transactions',
  user_enrollments: 'user_enrollments',
  user_role_module: 'user_role_module',
  webhook_logs: 'webhook_logs',
  cms_submenus: 'cms_submenus',
  user_audit_log: 'user_audit_log',
  user_sessions: 'user_sessions',
  positions: 'positions',
  appointments: 'appointments',
  sequence_table: 'sequence_table',
  relievings: 'relievings'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
