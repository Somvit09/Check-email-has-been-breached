from django.http import JsonResponse
from django.shortcuts import render, redirect
from .constants import VALIDATOR_URL, REFERER_URL
from database.views import kickoff_database_tasks
import requests
import json, os
from dotenv import load_dotenv

# import cfscrape

query_params_for_detailed_search = '?truncateResponse=false'

load_dotenv()


def home(request):
    return render(request, 'index.html')


def get_response(email):
    """
    Verifies email with the designated 3rd party server.

    :param email: str
    :return: request object
    """
    session = requests.session()
    headers = {
        'user-agent': 'Mozilla/5.0',
        'accept-language': 'en-GB',
        'referrer': REFERER_URL,
        'hibp-api-key': os.getenv('HIBP_API_KEY'),
        'Content-Type': 'application/json',
    }
    # scraper = cfscrape.create_scraper(sess=session)
    response = requests.get(url=VALIDATOR_URL + email + query_params_for_detailed_search, headers=headers)
    return response


# actual url look like = https://haveibeenpwned.com/api/v3/breachedaccount/vpampatt@yahoo.com?truncateResponse=false
# API DOCUMENTATION = https://haveibeenpwned.com/API/v3#AllBreaches

def check_if_email_hacked(request, email):
    """
    Parse the request and send proper response back.

    :param request: request object
    :param email: str
    :return: response object
    """
    response = get_response(email)
    if response.status_code == 404:
        return JsonResponse({
            'status': 'safe',
            'breaches': 0
        }, status=404)
    elif response.status_code == 200:
        kickoff_database_tasks(email, response)
        data = response.json()[0]
        for key, values in data.items():
            print(key)
        return JsonResponse(response.json(), safe=False)
    else:
        return JsonResponse({
            'status': 'failed',
            'message': 'API request was not proper'
        }, status=response.status_code)
