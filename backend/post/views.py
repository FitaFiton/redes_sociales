from django.http import HttpResponse
from django.shortcuts import render
#import twitter
from secret import CONSUMER_KEY, CONSUMER_SECRET_KEY, ACCESS_TOKEN, ACCESS_TOKEN_SECRET
import json

# Create your views here.
'''def use_twitter(request):
    data = json.loads(request.body)
    api = twitter.Api(
        consumer_key=CONSUMER_KEY,
        consumer_secret=CONSUMER_SECRET_KEY,
        access_token_key=ACCESS_TOKEN,
        access_token_secret=ACCESS_TOKEN_SECRET
    )

    action = data.get('action', None)
    payload = data.get('payload', [])
    if action == 'search':
        query = payload.get('query', None)
        if query:
            results = api.GetSearch(term=query, return_json=True)
            return HttpResponse(status=200, content=json.dumps(results))
    elif action == 'post':
        pass
    else:
        return HttpResponse(status=400, content=json.dumps({'action : Prametro obligatorio'}))


    print(api.VerifyCredentials())

    tweets = api.GetUserTimeline(screen_name='ibai')
    for t in tweets:
        print(t.text)

    friends = api.GetFriends()

    print(friends)

    print(data)
    api.PostUpdate(data['text'])
    return HttpResponse("OK")'''