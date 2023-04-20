import requests

query_params_for_detailed_search = '?truncateResponse=false'
url = 'https://haveibeenpwned.com/api/v3/breachedaccount/'
headers = {
    'hibp-api-key': '578054d5464941519b4a65ccb664c3e6',
}
get_email = 'developer.09.sam@gmail.com'
response = requests.get(headers=headers, url=url+get_email+query_params_for_detailed_search)
a = response.content
print(a)