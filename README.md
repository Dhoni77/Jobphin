# Jobphin Assignment

This repository contains a Jobs listing application. It consists of a frontend and backend using [MockApi](https://mockapi.io/).

## Installation

---

### Frontend

```
cd Jobphin
pnpm install
```

## Frontend

---

The frontend is built with React, TypeScript, and Vite.

### Local Development

```
pnpm run dev
```

### Production Build

To build the frontend for production, run:

```
pnpm run build
pnpm run preview
```

## Api Testing

---

Api Url: `https://65570fd5bd4bcef8b611f8ac.mockapi.io/api/v1`

## Jobs

### Get all jobs

**`GET /jobs`**

Returns a list of jobs.

Example response:

```
[
    {
        "createdAt": "2023-11-16T23:17:17.452Z",
        "title": "UX UI Designer",
        "companyName": "Great Vibes",
        "industry": "Information Technology",
        "location": "Chennai, Tamilnadu, India",
        "remoteType": "In-office",
        "minExperience": 1,
        "maxExperience": 2,
        "minSalary": 30000,
        "maxSalary": 60000,
        "totalEmployee": "51-200",
        "apply": "Apply Now",
        "id": "7cLpk1eaXj_rnZvt6sLgs"
    }
]
```

### Create a new job

Adds a new job to the jobs collection.

**`POST /jobs`**

Example Body:

```
    {
        "createdAt": "2023-11-16T23:17:17.452Z",
        "title": "UX UI Designer",
        "companyName": "Great Vibes",
        "industry": "Information Technology",
        "location": "Chennai, Tamilnadu, India",
        "remoteType": "In-office",
        "minExperience": 1,
        "maxExperience": 2,
        "minSalary": 30000,
        "maxSalary": 60000,
        "totalEmployee": "51-200",
        "apply": "Apply Now",
        "id": "7cLpk1eaXj_rnZvt6sLgs"
    }
```

### Update a job

Updates a job.

**`PUT /jobs/${job_id}`**

Example Body:

```
    {
        "createdAt": "2023-11-16T23:17:17.452Z",
        "title": "UX UI Designer",
        "companyName": "Great Vibes",
        "industry": "Information Technology",
        "location": "Chennai, Tamilnadu, India",
        "remoteType": "In-office",
        "minExperience": 1,
        "maxExperience": 2,
        "minSalary": 30000,
        "maxSalary": 60000,
        "totalEmployee": "51-200",
        "apply": "Apply Now",
        "id": "7cLpk1eaXj_rnZvt6sLgs"
    }
```

### Delete a job

Deletes a job from the jobs collection.

**`DELETE /jobs/${job_id}`**
