import json
import boto3
import uuid
from boto3.dynamodb.conditions import Key
from datetime import datetime

# Initialize DynamoDB resources
dynamodb = boto3.resource('dynamodb')
user_table = dynamodb.Table('users')
apps_table = dynamodb.Table('applications')

def lambda_handler(event, context):
    # Log incoming request for debugging in CloudWatch
    print(f"Path: {event.get('requestContext', {}).get('http', {}).get('path')}, Method: {event.get('requestContext', {}).get('http', {}).get('method')}")
    
    method = event.get('requestContext', {}).get('http', {}).get('method', 'POST')
    path = event.get('requestContext', {}).get('http', {}).get('path', '')
    
    try:
        # --- ROUTE: APPLICATIONS (/applications) ---
        if 'applications' in path:
            # POST /applications: Create a new scheme application
            if method == 'POST':
                body = json.loads(event.get('body', '{}'))
                app_id = f"APP#{str(uuid.uuid4())[:8]}"
                
                item = {
                    'applicationId': app_id, 
                    'userId': body['userId'], # Clean key matching your new index
                    'schemeId': body['schemeId'],
                    'schemeName': body['schemeName'],
                    'status': 'PENDING',
                    'createdAt': datetime.now().isoformat() 
                }
                apps_table.put_item(Item=item)
                return {
                    "statusCode": 201, 
                    "body": json.dumps({"message": "Application created!", "id": app_id})
                }
            
            # GET /applications?userId=... : List all applications for a user
            elif method == 'GET':
                params = event.get('queryStringParameters', {}) or {}
                u_id = params.get('userId')
                
                if not u_id:
                    return {"statusCode": 400, "body": json.dumps({"error": "userId required"})}
                
                # Query using the CLEAN userId-index
                response = apps_table.query(
                    IndexName='userId-index',
                    KeyConditionExpression=Key('userId').eq(u_id)
                )
                return {
                    "statusCode": 200, 
                    "headers": {"Content-Type": "application/json"},
                    "body": json.dumps(response.get('Items', []))
                }

        # --- ROUTE: USER REGISTRATION (/register) ---
        else:
            # GET /register?phone=... : Find a user by phone
            if method == 'GET':
                params = event.get('queryStringParameters', {}) or {}
                phone = params.get('phone')
                
                response = user_table.query(
                    IndexName='phone-index',
                    KeyConditionExpression=Key('phone').eq(phone)
                )
                
                if response.get('Items'):
                    return {"statusCode": 200, "body": json.dumps(response['Items'][0])}
                return {"statusCode": 404, "body": json.dumps({"message": "User not found"})}

            # POST /register: Create a new user profile
            elif method == 'POST':
                body = json.loads(event.get('body', '{}'))
                u_id = f"USER#{str(uuid.uuid4())[:8]}"
                
                user_item = {
                    'userId': u_id,
                    'phone': str(body['phone']),
                    'name': body['name'],
                    'language': body.get('language', 'en')
                }
                user_table.put_item(Item=user_item)
                return {
                    "statusCode": 201, 
                    "body": json.dumps({"message": "User registered!", "userId": u_id})
                }

    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            "statusCode": 500, 
            "body": json.dumps({"error": str(e)})
        }