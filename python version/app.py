import bitly_api 
  
API_USER = "username" #enter your own username 
API_KEY = "API_Key"  #enter your own APIkey
bitly = bitly_api.Connection(API_USER, API_KEY) 
  
response = bitly.shorten('http://google.com/') 
  
# Now let us print the Bitly URL 
print(response)