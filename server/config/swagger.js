import swaggerJsdoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CMS Blog Site API Documentation',
      version: '1.0.0',
      description: `
# CMS Blog Site API

A comprehensive API for managing a Content Management System with blog capabilities, course management, exam system, payment integration, and real-time notifications.

## Features
- **Authentication & Authorization** - JWT-based auth with Google OAuth2 support
- **Course Management** - Create and manage courses, certifications, and providers
- **Exam System** - Full exam creation, taking, and result management
- **Payment Integration** - Razorpay payment gateway integration
- **Shopping Cart** - Full cart and order management
- **Notifications** - Real-time notifications with Socket.IO
- **Blog Management** - Complete blog CRUD operations
- **User Management** - User profiles, admin controls
- **CMS Features** - Pages, menus, sections, templates, footers
- **Contact Forms** - Message handling and management

## Authentication
Most endpoints require authentication. Include the JWT token in the Authorization header:
\`\`\`
Authorization: Bearer <your_jwt_token>
\`\`\`

Alternatively, tokens can be sent via cookies (automatic in browser).

## Rate Limiting
- Standard endpoints: 100 requests/15 minutes
- Authentication endpoints: 5 requests/15 minutes

## Response Format
All responses follow this structure:
\`\`\`json
{
  "success": true,
  "data": {},
  "message": "Success message"
}
\`\`\`

Error responses:
\`\`\`json
{
  "success": false,
  "error": "Error message",
  "details": {}
}
\`\`\`
      `,
      contact: {
        name: 'API Support',
        email: 'support@genospark.in',
        url: 'https://genospark.in'
      },
      license: {
        name: 'Private',
      }
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Development server'
      },
      {
        url: 'http://4.213.50.232:4000',
        description: 'Staging server'
      },
      {
        url: 'https://genospark.in',
        description: 'Production server'
      }
    ],
    tags: [
      {
        name: 'Authentication',
        description: 'User authentication and authorization - register, login, logout, password reset, Google OAuth'
      },
      {
        name: 'Cart',
        description: 'Shopping cart operations - add, remove, and manage certification purchases'
      },
      {
        name: 'Contact',
        description: 'Contact form submissions and message management'
      },
      {
        name: 'Notifications',
        description: 'Real-time notification management - exams, payments, and cart notifications'
      },
      {
        name: 'Payment',
        description: 'Razorpay payment integration - create orders, verify payments, process refunds, handle webhooks'
      },
      {
        name: 'PromotionBar',
        description: 'Promotion banner management - create, update, activate/deactivate promotional banners for website header'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token'
        },
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token',
          description: 'JWT token in cookie (automatic)'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            user_id: {
              type: 'integer',
              description: 'Unique user identifier',
              example: 1
            },
            first_name: {
              type: 'string',
              maxLength: 100,
              description: 'User first name',
              example: 'John'
            },
            last_name: {
              type: 'string',
              maxLength: 100,
              description: 'User last name',
              example: 'Doe'
            },
            user_name: {
              type: 'string',
              nullable: true,
              maxLength: 100,
              description: 'Optional username',
              example: 'johndoe123'
            },
            email: {
              type: 'string',
              format: 'email',
              maxLength: 150,
              description: 'Email address (unique)',
              example: 'john.doe@example.com'
            },
            role: {
              type: 'string',
              enum: ['subscriber', 'instructor', 'admin'],
              description: 'User role',
              example: 'subscriber'
            },
            status_active: {
              type: 'string',
              enum: ['active', 'inactive'],
              description: 'Account status',
              example: 'active'
            },
            registration_method: {
              type: 'string',
              enum: ['email', 'google', 'facebook'],
              description: 'Registration method',
              example: 'email'
            },
            last_login: {
              type: 'string',
              format: 'date-time',
              nullable: true,
              description: 'Last login timestamp'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Account creation timestamp'
            }
          }
        },
        Cart: {
          type: 'object',
          properties: {
            cart_id: {
              type: 'integer',
              description: 'Unique cart identifier',
              example: 1
            },
            user_id: {
              type: 'integer',
              description: 'User who owns the cart',
              example: 5
            },
            coupon_id: {
              type: 'integer',
              nullable: true,
              description: 'Applied coupon ID',
              example: null
            },
            status: {
              type: 'string',
              enum: ['ACTIVE', 'ABANDONED', 'ORDERED'],
              description: 'Cart status',
              example: 'ACTIVE'
            },
            ip_address: {
              type: 'string',
              nullable: true,
              description: 'User IP address',
              example: '192.168.1.1'
            },
            user_agent: {
              type: 'string',
              nullable: true,
              description: 'User browser/device information',
              example: 'Mozilla/5.0...'
            },
            geo_location: {
              type: 'string',
              nullable: true,
              description: 'Geographic location',
              example: 'New Delhi, India'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Cart creation timestamp'
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp'
            },
            cart_items: {
              type: 'array',
              description: 'Items in the cart',
              items: {
                $ref: '#/components/schemas/CartItem'
              }
            },
            total_items: {
              type: 'integer',
              description: 'Total number of items',
              example: 3
            },
            total_amount: {
              type: 'number',
              format: 'float',
              description: 'Total cart amount',
              example: 8997.00
            }
          }
        },
        CartItem: {
          type: 'object',
          properties: {
            cart_item_id: {
              type: 'integer',
              description: 'Unique cart item identifier',
              example: 1
            },
            cart_id: {
              type: 'integer',
              description: 'Parent cart ID',
              example: 1
            },
            certification_id: {
              type: 'integer',
              description: 'Certification/product ID',
              example: 10
            },
            product_type: {
              type: 'string',
              enum: ['MOCK', 'PRACTICE', 'FINAL', 'BUNDLE'],
              description: 'Type of exam product',
              example: 'PRACTICE'
            },
            quantity: {
              type: 'integer',
              description: 'Item quantity',
              default: 1,
              example: 1
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Item added timestamp'
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp'
            },
            certification: {
              type: 'object',
              description: 'Certification details',
              properties: {
                certification_id: {
                  type: 'integer',
                  example: 10
                },
                name: {
                  type: 'string',
                  example: 'AWS Certified Solutions Architect - Associate'
                },
                price: {
                  type: 'number',
                  format: 'float',
                  example: 2999.00
                },
                status_active: {
                  type: 'string',
                  example: 'active'
                }
              }
            }
          }
        },
        ContactMessage: {
          type: 'object',
          properties: {
            contact_id: {
              type: 'integer',
              description: 'Unique contact message identifier',
              example: 1
            },
            name: {
              type: 'string',
              maxLength: 150,
              description: 'Name of the person contacting',
              example: 'John Doe'
            },
            email: {
              type: 'string',
              format: 'email',
              maxLength: 150,
              description: 'Email address',
              example: 'john.doe@example.com'
            },
            subject_type: {
              type: 'string',
              enum: [
                'FORGOT_PASSWORD',
                'ACCOUNT_BLOCKED',
                'REFUND',
                'TECHNICAL_ERROR',
                'ORDER_ISSUES',
                'COURSE_ISSUES',
                'EXAM_ISSUES',
                'COURSE_DISCOUNT',
                'FEEDBACK',
                'OTHER'
              ],
              description: 'Type/category of the contact message',
              example: 'TECHNICAL_ERROR'
            },
            message: {
              type: 'string',
              description: 'The actual message content',
              example: 'I am experiencing issues with accessing my course materials.'
            },
            feedback: {
              type: 'string',
              nullable: true,
              description: 'Optional feedback from the user',
              example: 'The platform is great but needs improvement in mobile view.'
            },
            website_link: {
              type: 'string',
              nullable: true,
              maxLength: 500,
              description: 'Optional website link related to the message',
              example: 'https://example.com/screenshot.png'
            },
            recaptcha_token: {
              type: 'string',
              nullable: true,
              maxLength: 500,
              description: 'Google reCAPTCHA verification token'
            },
            created_by: {
              type: 'integer',
              nullable: true,
              description: 'User ID if authenticated, null for anonymous',
              example: 5
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Message submission timestamp'
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp'
            }
          }
        },
        Notification: {
          type: 'object',
          properties: {
            notification_id: {
              type: 'integer',
              description: 'Unique notification identifier',
              example: 1
            },
            user_id: {
              type: 'integer',
              description: 'User who receives the notification',
              example: 5
            },
            source_type: {
              type: 'string',
              enum: ['EXAM_SESSIONS', 'TRANSACTIONS', 'CARTS'],
              description: 'Source/origin of the notification',
              example: 'EXAM_SESSIONS'
            },
            source_id: {
              type: 'string',
              maxLength: 100,
              description: 'ID of the source entity (exam session ID, transaction ID, cart ID)',
              example: '12345'
            },
            notification_type: {
              type: 'string',
              enum: [
                'EXAM_IN_PROGRESS',
                'EXAM_ABANDONED',
                'PAYMENT_FAILED',
                'PAYMENT_SUCCESS',
                'CART_ABANDONED'
              ],
              description: 'Type of notification',
              example: 'PAYMENT_SUCCESS'
            },
            status: {
              type: 'string',
              enum: ['UNREAD', 'READ', 'RESOLVED', 'DISMISSED'],
              description: 'Notification status',
              example: 'UNREAD'
            },
            message: {
              type: 'string',
              description: 'Notification message text',
              example: 'Your payment of ₹2999 was successful for AWS Certified Solutions Architect exam.'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Notification creation timestamp'
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp'
            },
            resolved_at: {
              type: 'string',
              format: 'date-time',
              nullable: true,
              description: 'When notification was resolved'
            },
            dismissed_at: {
              type: 'string',
              format: 'date-time',
              nullable: true,
              description: 'When notification was dismissed'
            },
            expires_at: {
              type: 'string',
              format: 'date-time',
              nullable: true,
              description: 'Notification expiration timestamp'
            }
          }
        },
        Transaction: {
          type: 'object',
          properties: {
            transaction_id: {
              type: 'integer',
              description: 'Unique transaction identifier',
              example: 1
            },
            order_id: {
              type: 'integer',
              description: 'Associated order ID',
              example: 42
            },
            razorpay_order_id: {
              type: 'string',
              maxLength: 255,
              nullable: true,
              description: 'Razorpay order ID',
              example: 'order_NXs7a2j3K4mP9R'
            },
            razorpay_payment_id: {
              type: 'string',
              maxLength: 255,
              nullable: true,
              description: 'Razorpay payment ID',
              example: 'pay_NXs8b3k4L5nQ0S'
            },
            razorpay_signature: {
              type: 'string',
              maxLength: 500,
              nullable: true,
              description: 'Payment signature for verification'
            },
            amount: {
              type: 'number',
              format: 'decimal',
              description: 'Transaction amount in rupees',
              example: 2999.00
            },
            status: {
              type: 'string',
              enum: ['PENDING', 'SUCCESS', 'FAILED'],
              description: 'Transaction status',
              example: 'SUCCESS'
            },
            method: {
              type: 'string',
              maxLength: 50,
              nullable: true,
              description: 'Payment method used (card, upi, netbanking)',
              example: 'upi'
            },
            error_code: {
              type: 'string',
              maxLength: 100,
              nullable: true,
              description: 'Error code if payment failed',
              example: 'BAD_REQUEST_ERROR'
            },
            error_description: {
              type: 'string',
              nullable: true,
              description: 'Detailed error description',
              example: 'Payment failed due to insufficient funds'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Transaction creation timestamp'
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp'
            }
          }
        },
        Order: {
          type: 'object',
          properties: {
            order_id: {
              type: 'integer',
              description: 'Unique order identifier',
              example: 42
            },
            user_id: {
              type: 'integer',
              description: 'User who placed the order',
              example: 5
            },
            coupon_id: {
              type: 'integer',
              nullable: true,
              description: 'Applied coupon ID',
              example: 3
            },
            subtotal_amount: {
              type: 'number',
              format: 'decimal',
              description: 'Order subtotal before discount',
              example: 2999.00
            },
            discount_amount: {
              type: 'number',
              format: 'decimal',
              description: 'Total discount applied',
              example: 0.00
            },
            total_amount: {
              type: 'number',
              format: 'decimal',
              description: 'Final order total',
              example: 2999.00
            },
            currency: {
              type: 'string',
              maxLength: 10,
              description: 'Currency code',
              example: 'INR'
            },
            status: {
              type: 'string',
              enum: ['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED', 'CANCELLED'],
              description: 'Order status',
              example: 'COMPLETED'
            },
            source: {
              type: 'string',
              enum: ['WEB', 'MOBILE', 'ADMIN'],
              description: 'Order source platform',
              example: 'WEB'
            },
            ip_address: {
              type: 'string',
              maxLength: 45,
              nullable: true,
              description: 'User IP address',
              example: '192.168.1.1'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Order creation timestamp'
            }
          }
        },
        Refund: {
          type: 'object',
          properties: {
            refund_id: {
              type: 'integer',
              description: 'Unique refund identifier',
              example: 1
            },
            transaction_id: {
              type: 'integer',
              description: 'Associated transaction ID',
              example: 15
            },
            razorpay_refund_id: {
              type: 'string',
              maxLength: 255,
              description: 'Razorpay refund ID',
              example: 'rfnd_NXs9c4l5M6oR1T'
            },
            amount: {
              type: 'number',
              format: 'decimal',
              description: 'Refund amount in rupees',
              example: 2999.00
            },
            status: {
              type: 'string',
              maxLength: 50,
              description: 'Refund status',
              example: 'processed'
            },
            reason: {
              type: 'string',
              nullable: true,
              description: 'Reason for refund',
              example: 'Customer requested refund due to course dissatisfaction'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Refund creation timestamp'
            }
          }
        },
        PromotionBar: {
          type: 'object',
          properties: {
            promotion_id: {
              type: 'integer',
              description: 'Unique promotion bar identifier',
              example: 1
            },
            promotion_text: {
              type: 'string',
              maxLength: 255,
              description: 'Main promotional message text',
              example: 'Get 50% OFF on all AWS certification exams! Limited time offer!'
            },
            promotion_button_text: {
              type: 'string',
              maxLength: 50,
              description: 'Call-to-action button text',
              example: 'Enroll Now'
            },
            promotion_button_link: {
              type: 'string',
              maxLength: 255,
              nullable: true,
              description: 'Button redirect URL',
              example: 'https://genospark.in/exam'
            },
            is_active: {
              type: 'boolean',
              description: 'Whether promotion is currently active',
              example: true
            },
            display_order: {
              type: 'integer',
              description: 'Display priority order (lower number = higher priority)',
              example: 0
            },
            start_date: {
              type: 'string',
              format: 'date-time',
              nullable: true,
              description: 'Promotion start date and time',
              example: '2026-01-24T00:00:00.000Z'
            },
            end_date: {
              type: 'string',
              format: 'date-time',
              nullable: true,
              description: 'Promotion end date and time',
              example: '2026-01-31T23:59:59.000Z'
            },
            background_color: {
              type: 'string',
              maxLength: 20,
              description: 'Hex color code for banner background',
              example: '#FFEB3B'
            },
            text_color: {
              type: 'string',
              maxLength: 20,
              description: 'Hex color code for text',
              example: '#000000'
            },
            remarks: {
              type: 'string',
              nullable: true,
              description: 'Internal notes/remarks about the promotion',
              example: 'New Year promotional campaign'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Promotion creation timestamp'
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            error: {
              type: 'string',
              example: 'Error message'
            },
            message: {
              type: 'string',
              example: 'Detailed error description'
            }
          }
        }
      },
      responses: {},
      parameters: {}
    },
    security: [
      {
        bearerAuth: []
      },
      {
        cookieAuth: []
      }
    ]
  },
  apis: [
    join(__dirname, '../routes/*.js'),
    join(__dirname, '../index.js'),
    join(__dirname, '../routes/swaggerDocs.js')
  ],
};

export const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;
