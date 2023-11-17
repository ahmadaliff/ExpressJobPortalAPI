# Basic Express

Basic express.js project with basic routes:

- Express
- Joi
- Fs
- Cors
- sequelize
- nodemailer
- dotEnv
- Swagger

---

## URL

_Server_

```
http://localhost:3000 or http://localhost:5000
```

## Run Server

_Server_

```
"npm start" or "node index.js" or "nodemon index.js"

```

---

## ENV FILE

change .env.example to .env

```
APP_PORT=3000
SECRET_KEY=SECRET
SECRET_KEY_FOR_FORGET_PASSWORD=sangatrahasia
NODE_ENV=development
MY_EMAIL=email@email.com
EMAIL_PASSWORD=password_key
```

---

## Global Response

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

_Response (401 - Unathourize)_

```
"Unathourize"
```

_Response (403 - forbidden)_

---

# RESTful endpoints

## Swagger DOC

http://localhost:3000/doc/

## GLOBAL ROUTE

### POST /api/login

> login

_Request Header_

```
not needed
```

_Request Body_

```
{
    "email":email,
    "password":password
}
```

_Response (200)_

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6ImhyIiwiaWF0IjoxNzAwMjA0ODcxfQ.3MSK5zuJFsfcTyKd1ZJPfpRt2Wm9GP1vIx25w6XfcdQ",
    "message": "Login success"
}
```

_response(400,bad request)_

```
"invalid email or password"

```

---

### POST /api/register

> register

_Request Header_

```
not needed
```

_Request Body_

```
{
    "fullName":name,
    "email":email,
    "password":password,
    "role":role
}
```

_Response (200)_

```
{
    "data": {
        "id": 3,
        "email": "hr3@user.com",
        "password": "$2b$10$xD1Hw1uCDPBIOgC59WClGOdFJqifcvVrXzafXPkiBPs9./3hFm7Pu",
        "fullName": "test aja",
        "role": "hr",
        "updatedAt": "2023-11-17T07:10:03.159Z",
        "createdAt": "2023-11-17T07:10:03.159Z",
        "isEmailAuth": false
    },
    "message": "success register as: hr"
}
```

_Response (409)_

```
"user with that email already existed"
```

---

### POST /api/forgot-password

> forgot password

_Request Header_

```
not needed
```

_Request Body_

```
{
  "email":email
}
```

_Response (200)_

```
{
 message: "Check your email for forgot password",
}
```

_Response (400, bad request)_

```
 "Your email is not verify, you must send again with fullname"

```

_Response (404, not found)_

```
 {message:"Data Not Found"}

```

---

### GET /api/send-reset-password/:token

> send reset password

_Request Params_

```
<token>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    message:
          "Check your email for forgot password, we have send reset password",
}
```

_Response (404, not found)_

```
 {message:"Data Not Found"}

```

---

### PATCH /api/verify-email

> erify email

_Request Header_

```
Bearer Token
```

_Request Body_

```
{email:email}
```

_Response (200)_

```
{ message: "Success Verify" }
```

_Response (404, not found)_

```
 {message:"Data Not Found"}

```

---

### GET /api/get-profile

> get profile

_Request Header_

```
Bearer Token
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "data": {
        "id": 2,
        "fullName": "abang HR",
        "email": "hr123@user.com",
        "role": "hr",
        "password": "$2b$10$rEqIEgzRz2D9yZ697IkdTO0UBfExxHGt1nskAK8chjJoWNabCnG0O",
        "isEmailAuth": false,
        "createdAt": "2023-11-17T09:09:51.000Z",
        "updatedAt": "2023-11-17T09:09:51.000Z"
    },
    "message": "success"
}
```

_Response (404, not found)_

```
 {message:"Data Not Found"}

```

---

---

### PUT /api/edit-profile

> edit profile

_Request Header_

```
not needed
```

_Request Body_

```
{email:email}
or
{fullName:fullName}
...
```

_Response (200)_

```
{
      data: result,
      message: "success edit profile",
    }
```

_Response (404, not found)_

```
 {message:"Data Not Found"}

```

---

---

## HR ROUTE

### POST /api/hr/add-advertisement

> add advertisement

_Request Header_

```
Bearer Token
```

_Request Body_

```
{
    "title":"title",
    "description":"description"
}
```

_Response (200)_

```
{
    "data": {
        "id": 4,
        "title": "testets",
        "description": "dsahdsajdasdashdjashdash",
        "hrId": 2,
        "updatedAt": "2023-11-17T07:22:22.804Z",
        "createdAt": "2023-11-17T07:22:22.804Z"
    },
    "message": "created"
}

```

### GET /api/hr/get-advertisement

> Get advertisement own

_Request Header_

```
Bearer Token
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "data": {
        "id": 2,
        "fullName": "abang HR",
        "email": "hr123@user.com",
        "Advertisements": [
            {
                "id": 2,
                "title": "judulan 2",
                "description": "description untuk description description untuk descriptiondescription untuk description",
                "hrId": 2,
                "createdAt": "2023-11-17T06:18:57.000Z",
                "updatedAt": "2023-11-17T06:18:57.000Z"
            },
    },
    "message": "success"
}

```

_Response (404, not found)_

```
 {message:"Data Not Found"}

```

### PUT /api/hr/edit-advertisement/:advertisementId

> edit advertisement

_Request Header_

```
Bearer Token
```

_Request Body_

```
{titlde:titlde}
or
{description:description}
or
both
```

_Response (200)_

```
{
    "message": "updated"
}
```

_Response (404, not found)_

```
 {message:"Data Not Found"}

```

---

### GET /api/hr/get-application

> Get application own

_Request Header_

```
Bearer Token
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "data": {
        "id": 2,
        "fullName": "abang HR",
        "email": "hr123@user.com",
        "role": "hr",
        "password": "$2b$10$rEqIEgzRz2D9yZ697IkdTO0UBfExxHGt1nskAK8chjJoWNabCnG0O",
        "isEmailAuth": false,
        "createdAt": "2023-11-17T06:18:57.000Z",
        "updatedAt": "2023-11-17T06:18:57.000Z",
        "Userhr": [
            {
                "id": 1,
                "status": "on review",
                "applicantId": 1,
                "advertisementId": 1,
                "hrId": 2,
                "createdAt": "2023-11-17T06:18:57.000Z",
                "updatedAt": "2023-11-17T06:18:57.000Z"
            }
        ]
    }
}

```

_Response (404, not found)_

```
 {message:"Data Not Found"}

```

### DELETE api/hr/delete-advertisement/:advertisementId

_Request Params_

```

<advertisementId>

```

_Request Header_

```

Bearer Token

```

_Request Body_

```

not needed

```

_Response (200)_

```

{ message: "deleted" }

```

_Response (404)_

```

{
    "message": "Data Not Found"
}

```

### PATCH /api/hr/edit-application/:applicationId

> edit application status

_Request Header_

```
Bearer Token
```

_Request Body_

```
{
    "status":"on review"
}
```

_Response (200)_

```
{
      message: "update status success",
}

```

_Response (404, not found)_

```
 {message:"Data Not Found"}

```

_Response (400)_

```
{ message: "status invalid" }

```

## Applicant ROUTE

### GET /api/applicant/get-advertisement

> Get adertisemenet with user id (own)

_Request Header_

```

Bearer Token

```

_Request Body_

```

not needed

```

_Response (200)_

```

{
    "data": [
        {
            "id": 2,
            "title": "judulan 2",
            "description": "description untuk description description untuk descriptiondescription untuk description",
            "hrId": 2,
            "createdAt": "2023-11-17T06:18:57.000Z",
            "updatedAt": "2023-11-17T06:18:57.000Z"
        }
    ],
    "message": "success"
}

```

_Response (404)_

```

{
    "message": "Data Not Found"
}

```

---

### GET /api/applicant/get-application

> Get application list

_Request Params_

```

/<studentId>

```

_Request Header_

```

Bearer Token

```

_Request Body_

```

not needed

```

_Response (200)_

```

{
    "data": {
        "id": 1,
        "fullName": "Ahmad Alif Sofian",
        "email": "app1@user.com",
        "role": "applicant",
        "password": "$2b$10$rEqIEgzRz2D9yZ697IkdTO0UBfExxHGt1nskAK8chjJoWNabCnG0O",
        "isEmailAuth": false,
        "createdAt": "2023-11-17T06:18:57.000Z",
        "updatedAt": "2023-11-17T06:18:57.000Z",
        "UserApplicant": []
    },
    "message": "success"
}

```

_Response (404)_

```

{
    "message": "Data Not Found"
}

```

---

### POST /api/applicant/add-application/:advertisementId

> create student

_Request Params_

```

<adertisementId>

```

_Request Header_

```

Bearer Token

```

_Request Body_

```

not needed

```

_Response (201)_

```

{
    "data": {
        "id": 5,
        "status": "applied",
        "applicantId": 1,
        "hrId": 2,
        "advertisementId": 2,
        "updatedAt": "2023-11-17T07:37:43.791Z",
        "createdAt": "2023-11-17T07:37:43.791Z"
    },
    "message": "created"
}

```

---

### DELETE api/applicant/delete-application/:applicationId

> delete or drop course

_Request Params_

```

<applicationId>

```

_Request Header_

```

Bearer Token

```

_Request Body_

```

not needed

```

_Response (200)_

```

{
    "message": "deleted"
}
```

_Response (404)_

```

{
    "message": "Data Not Found"
}

```
