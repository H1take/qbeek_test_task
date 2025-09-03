import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User Management API',
            version: '1.0.0',
            description: 'API for user management with JWT authentication using HTTP-only cookies',
            contact: {
                name: 'API Support',
                email: 'support@example.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:4000/api',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                cookieAuth: {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'accessToken'
                }
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'User ID',
                            example: 1
                        },
                        name: {
                            type: 'string',
                            description: 'User name',
                            example: 'John Doe'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email',
                            example: 'john@example.com'
                        },
                        role: {
                            type: 'string',
                            enum: ['Admin', 'Manager'],
                            description: 'User role',
                            example: 'Manager'
                        }
                    }
                },
                LoginRequest: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'user@example.com'
                        },
                        password: {
                            type: 'string',
                            format: 'password',
                            example: 'password123'
                        }
                    }
                },
                RegisterRequest: {
                    type: 'object',
                    required: ['name', 'email', 'password'],
                    properties: {
                        name: {
                            type: 'string',
                            example: 'John Doe'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'john@example.com'
                        },
                        password: {
                            type: 'string',
                            format: 'password',
                            example: 'password123'
                        }
                    }
                },
                CreateUserRequest: {
                    type: 'object',
                    required: ['name', 'email', 'role', 'password'],
                    properties: {
                        name: {
                            type: 'string',
                            example: 'Jane Smith'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'jane@example.com'
                        },
                        role: {
                            type: 'string',
                            enum: ['Admin', 'Manager'],
                            example: 'Manager'
                        },
                        password: {
                            type: 'string',
                            format: 'password',
                            example: 'password123'
                        }
                    }
                },
                UpdateUserRequest: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            example: 'Updated Name'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'updated@example.com'
                        },
                        role: {
                            type: 'string',
                            enum: ['Admin', 'Manager'],
                            example: 'Admin'
                        }
                    }
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Error description'
                        }
                    }
                },
                AuthResponse: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Authentication successful'
                        },
                        user: {
                            $ref: '#/components/schemas/User'
                        }
                    }
                }
            },
            responses: {
                UnauthorizedError: {
                    description: 'Access token is missing or invalid',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ErrorResponse'
                            }
                        }
                    }
                },
                ForbiddenError: {
                    description: 'Insufficient permissions',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ErrorResponse'
                            }
                        }
                    }
                }
            }
        }
    },
    apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

export const specs = swaggerJSDoc(options);
export { swaggerUi };