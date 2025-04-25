# import json
# import boto3
# import logging
# import os
# import google.generativeai as genai
# from decimal import Decimal
# import uuid
# import time

# # Initialize logger
# logger = logging.getLogger()
# logger.setLevel(logging.INFO)

# # Initialize AWS clients
# dynamodb = boto3.resource('dynamodb')
# ssm = boto3.client('ssm')

# # Configure Gemini API
# try:
#     param_name = os.environ.get('SSM_PARAMETER_NAME', '/ats-analyzer/gemini-api-key')
#     api_key = ssm.get_parameter(Name=param_name, WithDecryption=True)['Parameter']['Value']
#     genai.configure(api_key=api_key)
# except Exception as e:
#     logger.error(f"Failed to configure Gemini API: {str(e)}")
#     raise Exception("Gemini API configuration failed")

# def get_gemini_response(resume_text, job_description):
#     try:
#         model = genai.GenerativeModel('gemini-1.5-flash')
#         prompt = """
#         You are a skilled ATS (Applicant Tracking System) scanner with a deep understanding of data science and ATS functionality.
#         Your task is to evaluate the provided resume against the job description and calculate a percentage match (0–100).
#         Provide 5–10 missing keywords or phrases (up to 2 words each) that could improve the resume's alignment.
#         Format the response exactly as:
#         ATS Score: <Percentage>
#         Keywords Missing:
#         - <keyword/phrase>
#         - ...
#         Resume: {resume_text}
#         Job Description: {job_description}
#         """
#         formatted_prompt = prompt.format(resume_text=resume_text, job_description=job_description)
#         response = model.generate_content([formatted_prompt])
#         return response.text
#     except Exception as e:
#         logger.error(f"Error calling Gemini API: {str(e)}")
#         raise

# def parse_gemini_response(response_text):
#     try:
#         lines = response_text.strip().split('\n')
#         if not lines[0].startswith('ATS Score:'):
#             raise ValueError("Invalid response format: ATS Score missing")
        
#         # Extract score
#         ats_score_str = lines[0].replace('ATS Score:', '').replace('%', '').strip()
#         ats_score = float(ats_score_str)
        
#         # Extract keywords (lines starting with '-')
#         keywords = [
#             line.strip().lstrip('- ').strip()
#             for line in lines[2:]
#             if line.strip().startswith('-')
#         ]
        
#         # Validate
#         if not 0 <= ats_score <= 100:
#             raise ValueError(f"ATS Score out of range: {ats_score}")
#         if not 5 <= len(keywords) <= 10:
#             logger.warning(f"Unexpected number of keywords: {len(keywords)}")
        
#         return ats_score, keywords
#     except Exception as e:
#         logger.error(f"Error parsing Gemini response: {str(e)}")
#         raise

# def lambda_handler(event, context):
#     try:
#         # Extract input from event
#         resume_id = event.get('resume_id')
#         job_description = event.get('job_description')
#         user_id = event.get('user_id')

#         if not all([resume_id, job_description, user_id]):
#             logger.error("Missing required fields in event")
#             return {
#                 'statusCode': 400,
#                 'headers': {'Access-Control-Allow-Origin': '*'},
#                 'body': json.dumps('Missing resume_id, job_description, or user_id')
#             }

#         # Fetch resume text from DynamoDB
#         resume_table = dynamodb.Table('ResumeDataTable')
#         resume_response = resume_table.get_item(Key={'resume_id': resume_id})
#         if 'Item' not in resume_response:
#             logger.error(f"Resume with ID {resume_id} not found")
#             return {
#                 'statusCode': 404,
#                 'headers': {'Access-Control-Allow-Origin': '*'},
#                 'body': json.dumps(f'Resume with ID {resume_id} not found')
#             }

#         resume_text = resume_response['Item']['text']
#         association_id = f"assoc_{uuid.uuid4()}"

#         # Get Gemini response
#         response_text = get_gemini_response(resume_text, job_description)
#         ats_score, suggestions = parse_gemini_response(response_text)

#         # Store results in DynamoDB
#         results_table = dynamodb.Table('ATSResultsTable')
#         results_table.put_item(Item={
#             'result_id': association_id,
#             'resume_id': resume_id,
#             'user_id': user_id,
#             'ats_score': Decimal(str(round(ats_score, 2))),
#             'missing_keywords': suggestions,
#             'created_at': int(time.time())
#         })

#         # Return response
#         return {
#             'statusCode': 200,
#             'headers': {'Access-Control-Allow-Origin': '*'},
#             'body': json.dumps({
#                 'association_id': association_id,
#                 'ats_score': float(round(ats_score, 2)),
#                 'suggestions': suggestions
#             }, default=str)
#         }
#     except Exception as e:
#         logger.error(f"Error analyzing resume: {str(e)}")
#         return {
#             'statusCode': 500,
#             'headers': {'Access-Control-Allow-Origin': '*'},
#             'body': json.dumps(f'Error: {str(e)}')
#         }

import json
import boto3
import logging
import os
import google.generativeai as genai
from decimal import Decimal
import uuid
import time

# Initialize logger
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Initialize AWS clients
dynamodb = boto3.resource('dynamodb')
ssm = boto3.client('ssm')

# Configure Gemini API
try:
    param_name = os.environ.get('SSM_PARAMETER_NAME', '/ats-analyzer/gemini-api-key')
    api_key = ssm.get_parameter(Name=param_name, WithDecryption=True)['Parameter']['Value']
    genai.configure(api_key=api_key)
except Exception as e:
    logger.error(f"Failed to configure Gemini API: {str(e)}")
    raise Exception("Gemini API configuration failed")

def get_gemini_response(resume_text, job_description):
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        prompt = """
        You are a skilled ATS (Applicant Tracking System) scanner with a deep understanding of data science and ATS functionality.
        Your task is to evaluate the provided resume against the job description and calculate a percentage match (0–100).
        Provide 5–10 missing keywords or phrases (up to 2 words each) that could improve the resume's alignment.
        Format the response exactly as:
        ATS Score: <Percentage>
        Keywords Missing:
        - <keyword/phrase>
        - ...
        Resume: {resume_text}
        Job Description: {job_description}
        """
        formatted_prompt = prompt.format(resume_text=resume_text, job_description=job_description)
        response = model.generate_content([formatted_prompt])
        return response.text
    except Exception as e:
        logger.error(f"Error calling Gemini API: {str(e)}")
        raise

def parse_gemini_response(response_text):
    try:
        lines = response_text.strip().split('\n')
        if not lines[0].startswith('ATS Score:'):
            raise ValueError("Invalid response format: ATS Score missing")
        
        # Extract score
        ats_score_str = lines[0].replace('ATS Score:', '').replace('%', '').strip()
        ats_score = float(ats_score_str)
        
        # Extract keywords (lines starting with '-')
        keywords = [
            line.strip().lstrip('- ').strip()
            for line in lines[2:]
            if line.strip().startswith('-')
        ]
        
        # Validate
        if not 0 <= ats_score <= 100:
            raise ValueError(f"ATS Score out of range: {ats_score}")
        if not 5 <= len(keywords) <= 10:
            logger.warning(f"Unexpected number of keywords: {len(keywords)}")
        
        return ats_score, keywords
    except Exception as e:
        logger.error(f"Error parsing Gemini response: {str(e)}")
        raise

def lambda_handler(event, context):
    try:
        # Extract input from event
        resume_id = event.get('resume_id')
        job_description = event.get('job_description')
        user_id = event.get('user_id')
        result_id = event.get('result_id')

        if not all([resume_id, job_description, user_id, result_id]):
            logger.error("Missing required fields in event")
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps('Missing resume_id, job_description, user_id, or result_id')
            }

        # Fetch resume text from DynamoDB
        resume_table = dynamodb.Table('ResumeDataTable')
        resume_response = resume_table.get_item(Key={'resume_id': resume_id})
        if 'Item' not in resume_response:
            logger.error(f"Resume with ID {resume_id} not found")
            return {
                'statusCode': 404,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(f'Resume with ID {resume_id} not found')
            }

        resume_text = resume_response['Item']['text']

        # Get Gemini response
        response_text = get_gemini_response(resume_text, job_description)
        ats_score, suggestions = parse_gemini_response(response_text)

        # Store results in DynamoDB
        results_table = dynamodb.Table('ATSResultsTable')
        results_table.put_item(Item={
            'result_id': result_id,
            'resume_id': resume_id,
            'user_id': user_id,
            'ats_score': Decimal(str(round(ats_score, 2))),
            'missing_keywords': suggestions,
            'created_at': int(time.time()),
            'job_description': job_description
        })

        # Return response
        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'result_id': result_id,
                'ats_score': float(round(ats_score, 2)),
                'suggestions': suggestions
            }, default=str)
        }
    except Exception as e:
        logger.error(f"Error analyzing resume: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(f'Error: {str(e)}')
        }