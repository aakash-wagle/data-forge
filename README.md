# DataForge

## Our website is dedicated to provide comprehensive tools and resources to streamline the data preprocessing process and unlock the full potential of your data.

## Prerequisites
Before starting, make sure that you have the following software installed on your machine:
```
  Node.js (v14 or higher)
  NPM (v7 or higher)
```


## Getting Started
1. Clone the project repository to your local machine:

```
git clone https://github.com/aakash-wagle/data-forge.git
```

2. Install project dependencies by running the following command from the project root directory:

```
cd client
npm install
```

3. Start the development server by running the following command:

```
npm run dev
```
This will start the development server at http://localhost:5173/ and open your default web browser to display the application.

You can now make changes to the project files and see the changes reflected in the browser in real-time.

## Building for Production
To build the project for production, run the following command:

```
npm run build
```
This will create an optimized production build of your project in the dist directory.

## Starting FASTAPI backend 

1. Install project dependencies by running the following command from the project root directory:

```
cd backend
pip install -r requirements.txt
```

2. Start the development server
```
uvicorn main:app --reload
```
This will start the development server at http://localhost:8000/.

You can now make requests to the API endpoints defined in your FastAPI application.
