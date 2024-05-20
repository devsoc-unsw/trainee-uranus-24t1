# UNSWipe Backend

## Getting Started
### Prerequisites
* npm
```
npm install npm@latest -g
```

### Installation
1. Clone the repo
```
git clone git@github.com:devsoc-unsw/trainee-uranus-24t1.git
```

2. Install NPM packages
```
npm i
```

3. Install tsx
```
npm i -g tsx
```

4. Create and fill out a `.env` file in `backend/`
```
DB_CONN_STRING='...'
DB_NAME='...'
USERS_COLLECTION_NAME='...'

PORT=8008
SECRET_KEY='...'
```

5. Run the server
```
npm run dev
```

## Routes
```
/
|-- authentication/
|   |-- register
|   `-- login
|-- users/profile/{id}
`-- self
```

### Authentication
This subtree handles login and registration.

```
POST /authentication/register

Body: {
  firstName: string
  lastName: string

  email: string
  password: string

  courses: string[]
  futureCourses: string[]
  hobbies: string[]
  languages: string[]
  programmingLanguages: string[]
  gender: string
  age: number
  wam: string
  academicSocialRatio: number

  preferredCourses: string[]
  preferredLanguages: string[]
  preferredProgrammingLanguages: string[]
  preferredGenders: string[]
  preferredAgeRange: [number, number]
  preferredWamRange: [string, string]
  preferredAcademicSocialRatio: number
}
```

```
POST /authentication/login

Body: {
  email: string
  password: string
}

Returns: {
  token: string
}
```

### Users
This subtree lets a user query other users' profiles. This subtree requires a JWT token.

```
GET /users/profile/{id}
{id}: ID of the user being queried

Returns: {
  firstName
  lastName
  courses
  futureCourses
  hobbies
  languages
  programmingLanguages
  gender
  age
  wam
  academicSocialRatio
}
```

### Self
This subtree lets a user view and update its own settings. This subtree requires a JWT token.

```
GET /self

Returns: {
  firstName: string
  lastName: string

  email: string
  password: string

  courses: string[]
  futureCourses: string[]
  hobbies: string[]
  languages: string[]
  programmingLanguages: string[]
  gender: string
  age: number
  wam: string
  academicSocialRatio: number

  preferredCourses: string[]
  preferredLanguages: string[]
  preferredProgrammingLanguages: string[]
  preferredGenders: string[]
  preferredAgeRange: [number, number]
  preferredWamRange: [string, string]
  preferredAcademicSocialRatio: number
}
```

```
PUT /self

Body: {
  firstName: string
  lastName: string

  email: string
  password: string

  courses: string[]
  futureCourses: string[]
  hobbies: string[]
  languages: string[]
  programmingLanguages: string[]
  gender: string
  age: number
  wam: string
  academicSocialRatio: number

  preferredCourses: string[]
  preferredLanguages: string[]
  preferredProgrammingLanguages: string[]
  preferredGenders: string[]
  preferredAgeRange: [number, number]
  preferredWamRange: [string, string]
  preferredAcademicSocialRatio: number
}
```

## Deployment
The project is deployed [here](https://backend-3y9ja.ondigitalocean.app) on DigitalOcean.

