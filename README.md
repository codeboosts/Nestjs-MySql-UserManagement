
# Nest MySql User Management (starter template)


<a href="https://nestjs.com/" target="_blank"><img src="https://res.cloudinary.com/djvfnekle/image/upload/v1710009756/ph8a6wv0nrrps778fcco.png" width="100"  alt="Nestjs Image" /></a>
<a href="https://www.mysql.com/" target="_blank"><img src="https://res.cloudinary.com/djvfnekle/image/upload/v1710009755/xvwcprf2eohpc98dwjro.png" width="100"  alt="Mysql image" /></a>
<a href="https://www.typescriptlang.org/" target="_blank"><img src="https://avatars.githubusercontent.com/u/20165699?s=200&v=4" width="100"  alt="Typeork image" /></a>
<a href="https://graphql.org/" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/1200px-GraphQL_Logo.svg.png" width="100"  alt="Graphql image" /></a>
<a href="https://typeorm.io/" target="_blank"><img src="https://res.cloudinary.com/djvfnekle/image/upload/v1710009761/otj7i99gcvkj6moeok54.png" width="100"  alt="Typescript image" /></a>


## Description

[NestJS Mysql UserManagement](https://github.com/codeboosts/nestjs-mysql-Usermanagement): Secure & Efficient Starter <br>
Kickstart your NestJS project with robust user management, built-in email OTP authentication and fully user management, and adherence to best practices. This comprehensive starter template provides a solid foundation to simplify development and ensure security.


## Requirements
Before running this project, ensure you have the following requirements:
- <a href="http://nodejs.org" target="_blank">Node.js</a> 18.x.x or later
- <a href="https://nestjs.com/" target="_blank">Nest.js</a> 9.x.x
- <a href="https://www.mysql.com/" target="_blank">MySql</a>
- <a href="https://redis.io/" target="_blank">Redis</a>
- <a href="https://pnpm.io/" target="_blank">pnpm (pkg manager)</a>



## Installation
You can install dependencies using Yarn, which is preferred for better performance and reliability:
```bash
pnpm install
```


## Running the app
```bash
# development
$ pnpm run start
# watch mode
$ pnpm run start:dev
# production mode
$ pnpm run start:prod
```



## Environment Variables
Ensure you have a `.env` file in the root directory of the project with the following variables:
```dotenv
DB_TYPE=''
DB_HOST=''
DB_PORT=''
DB_USERNAME=''
DB_PASSWORD=''
DB_DATABASE=''
DB_CHARSET=''
SMTP_EMAIL=''
SMTP_PASS=''
JWT_SECRET=''
REDIS_URL=''
SALT_ROUND=''
```
<a href="https://support.google.com/mail/answer/185833?hl=en" target="_blank">Click to get SMTP credentials</a>


## Author

- Author - [Zeshan Shakil](https://zeshan.team)

## License

Nestjs MySql Usermanagement is [MIT licensed](LICENSE).
