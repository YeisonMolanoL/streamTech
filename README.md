# Stream Tech

```bash
    This frontend is developed using Angular 17 under a modular and scalable architecture. Its main purpose is to serve as an interface for the administration and operation of key system functionalities, such as account management, confirmation message delivery, and, soon, direct sales through a shopping cart module.

    It is designed to seamlessly integrate with various backend microservices, providing a complete experience for both administrative users and end customers.
```

# Technologies

```bash
    Angular 17 – A modern, fast framework actively maintained by Google.

    TypeScript – Statically typed, robust, and scalable.

    Firebase Storage – Storage for images and multimedia files.

    Proxy Configuration (proxy.conf.json) – Transparent routing to backend microservices during development.

    Modular Architecture – Each functionality is encapsulated in its own module to facilitate maintainability and scalability.
```

# Consumed Microservices
```bash
    # Account Management Microservice
    Create, edit, delete, and assign accounts.
    Requires authentication via JWT
    
    # Mass Messaging Microservice
    Allows sending personalized confirmation messages via WhatsApp.
    Uses protected endpoints
```

# Authentication and Security
```bash
    JWT Implementation: Tokens are securely stored and used to access protected resources.
    Route Guards (AuthGuard): Restrict access to protected modules based on the user's role.
```
