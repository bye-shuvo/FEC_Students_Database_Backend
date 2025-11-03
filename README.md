# FEC Students Database Backend

## File Structure
```
FEC_Students_Database_Backend/
├── database/
│   ├── server.js          # Express app entry point
│   ├── students.js        # Students routes (/students)
│   ├── database.js        # MySQL pool configuration
│   ├── package.json       # Scripts and dependencies
│   └── package-lock.json
├── node_modules/
├── LICENSE
└── README.md
```
## Work
- Exposes a REST API with Express.
- Connects to MySQL via a pooled connection.
- Supports:
  - GET `/students/search` with query params to filter by columns.
  - POST `/students/create` to insert new student records.
