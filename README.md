# ATS_Analyzer_Cloud_Project

ATS Analyzer is a cloud-based web application that helps job seekers optimize their resumes by analyzing how well they match a specific job description. Users can upload a resume and a JD, and the system calculates an ATS (Applicant Tracking System) score along with tailored keyword suggestions. The backend leverages AWS Lambda, Step Functions, and Textract for file processing, while the Gemini API powers AI-driven scoring logic. Resumes are securely stored in S3 and all results are saved in DynamoDB. The frontend is built with React and deployed via Elastic Beanstalk using a Dockerized container from Amazon ECR. This fully serverless and scalable architecture enables real-time feedback for job applicants while demonstrating practical cloud service integration and orchestration.

Keywords: AWS, Resume Analysis, Gemini API, Serverless Architecture, DynamoDB, Textract, Step Functions, ATS Score, Cloud Computing, Elastic Beanstalk
