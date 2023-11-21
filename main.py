import requests, js2py, json

LOG_LEVEL = 1
USERAGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0'
CHAT_HISTORY = []

def log(msg):
    if LOG_LEVEL > 0:
        print(f'[DEBUG] {msg}')

def get_key():
    gen = js2py.eval_js(open('keygen.js', 'r').read())
    return gen(USERAGENT)

def prompt():
    prompt = input('>>> ')
    key = get_key()

    log(f'using key: {key}')
    log(f'using useragent: {USERAGENT}')
    log(f'prompt: {prompt}')

    CHAT_HISTORY.append({"role": "user", "content": prompt})
    log(f'chat history: {CHAT_HISTORY}')

    conv_body = json.dumps(CHAT_HISTORY)

    r = requests.post('https://api.deepai.org/hacking_is_a_serious_crime', 
        headers={
            'User-Agent': USERAGENT,
            'Api-Key': get_key()
        },
        files = {
            ('chat_style', (None, 'chat')),
            ('chatHistory', (None, conv_body))
        }
    )

    CHAT_HISTORY.append({"role": "assistant", "content": r.text})
    
    log(f'response code: {r.status_code}')
    if r.status_code == 200:
        log('success')
        log(f'assistant response: {r.text}')
        print(f'<<< {r.text}')

while True:
    prompt()
