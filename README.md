# EcomMicroservices

This project is supposed to be a rough sketch of microservices architecture and does not have standard codes. It is supposed to be used as a learning material.

It consists of 4 services.

1. Shop (**NextJs, TRPC**) - User can browse products and can order them.
2. Admin Dashboard (**NextJs, TRPC**) - Admin can deliver the ordered product to the customer.
3. Auth Service (**NestJS**) - This service is used to authenticate the user.
4. API Gateway (**NestJS**) - This service is used to proxy the requests to the other services. It sits between `shop` and `admin dashboard`.

The architecture of the project is as follows:
![Architecture]('./architecture.png')
